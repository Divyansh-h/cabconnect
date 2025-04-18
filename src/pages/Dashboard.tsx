import { useEffect, useRef, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader } from '@googlemaps/js-api-loader';
import axios from 'axios';
import VehiclePanel from '../components/VehiclePanel';

interface Location {
  lat: number;
  lng: number;
}

export default function Dashboard() {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const { tripType, dateTime, startDateTime, endDateTime } = location.state || {};

  const mapRef = useRef<HTMLDivElement>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [distanceInKm, setDistanceInKm] = useState<number | null>(null);

  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const [showVehiclePanel, setShowVehiclePanel] = useState(false);
  const [fare, setFare] = useState({
    sedan: 0,
    suv: 0,
    hatchback: 0,
  });

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places']
      });

      const google = await loader.load();

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(loc);

          const mapInstance = new google.maps.Map(mapRef.current!, {
            center: loc,
            zoom: 15,
            styles: [
              {
                elementType: 'geometry',
                stylers: [{ color: '#e9ecef' }]
              },
              {
                elementType: 'labels.text.fill',
                stylers: [{ color: '#495057' }]
              },
              {
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#f8f9fa' }]
              },
              {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{ color: '#dee2e6' }]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#ced4da' }]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#74c0fc' }]
              }
            ]
          });

          setMap(mapInstance);

          const renderer = new google.maps.DirectionsRenderer({ map: mapInstance, suppressMarkers: true });
          setDirectionsRenderer(renderer);

          new google.maps.Marker({
            position: loc,
            map: mapInstance,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: '#4fd1c5',
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: '#fff'
            }
          });

          autocompleteService.current = new google.maps.places.AutocompleteService();
          placesService.current = new google.maps.places.PlacesService(mapInstance);

          const geocoder = new google.maps.Geocoder();
          const response = await geocoder.geocode({ location: loc });
          if (response.results[0]) {
            setSource(response.results[0].formatted_address);
          }
        });
      }
    };

    initializeMap();
  }, []);

  const handleInputChange = (value: string, isSource: boolean) => {
    if (autocompleteService.current) {
      autocompleteService.current.getPlacePredictions({ input: value }, (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          setSuggestions(predictions);
        } else {
          setSuggestions([]);
        }
      });
    }

    if (isSource) {
      setSource(value);
    } else {
      setDestination(value);
    }
  };

  const handleSuggestionClick = async (suggestion: google.maps.places.AutocompletePrediction, isSource: boolean) => {
    const placeResult = await new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
      placesService.current!.getDetails({ placeId: suggestion.place_id }, (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && result) resolve(result);
        else reject(status);
      });
    });

    if (placeResult.geometry?.location) {
      if (isSource) {
        setSource(suggestion.description);
        setCurrentLocation({
          lat: placeResult.geometry.location.lat(),
          lng: placeResult.geometry.location.lng()
        });
      } else {
        setDestination(suggestion.description);

        if (currentLocation && map && directionsRenderer) {
          const directionsService = new google.maps.DirectionsService();
          const response = await directionsService.route({
            origin: currentLocation,
            destination: placeResult.geometry.location,
            travelMode: google.maps.TravelMode.DRIVING
          });

          directionsRenderer.setDirections(response);

          const distance = response.routes[0].legs[0].distance?.value ?? 0;
          setDistanceInKm(distance / 1000);
        }
      }
    }

    setSuggestions([]);
  };

  const handleConfirmRide = async () => {
    if (!currentLocation || !destination || !distanceInKm) {
      alert("Please select a valid source and destination.");
      return;
    }

    try {
      const rideData = {
        userId: user?.id,
        startLocation: source,
        endLocation: destination,
        distanceInKm,
      };

      const response = await axios.post("http://localhost:5000/api/locations", rideData);

      const locationId = response.data._id;
      const locationResponse = await axios.get(`http://localhost:5000/api/locations/${locationId}`);
      const kms = locationResponse.data.distanceInKm;

      setFare({
        sedan: kms * 15,
        suv: kms * 19,
        hatchback: kms * 12,
      });

      setShowVehiclePanel(true);
    } catch (error) {
      console.error("Error confirming ride:", error);
      alert("Failed to confirm ride. Please try again.");
    }
  };

  const handleVehicleSelect = (vehicleType: keyof typeof fare) => {
    const tripDetails = {
      tripType: tripType, // Use the selected trip type
      source: source, // Use the actual source
      destination: destination, // Use the actual destination
      dateTime: tripType === 'one-way' ? dateTime?.toLocaleString() :
                tripType === 'round-trip' ? startDateTime?.toLocaleString() :
                dateTime?.toLocaleString(), // Use the correct date/time
      fare: fare[vehicleType], // Use the calculated fare
      vehicleType,
    };

    // Navigate to Trip Summary Page
    navigate('/trip-summary', { state: { tripDetails, selectedVehicle: vehicleType } });
  };

  return (
    <div className="h-screen w-full flex flex-col relative bg-gradient-to-br from-teal-100 via-teal-200 to-teal-300">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600 transition-all z-50"
      >
        ← Back
      </button>

      {/* Trip Details */}
      <div className="absolute top-16 right-4 z-10 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Trip Details</h3>
        <p>Trip Type: <strong>{tripType || 'N/A'}</strong></p>
        {tripType === 'one-way' && (
          <p>Date & Time: <strong>{dateTime ? new Date(dateTime).toLocaleString() : 'N/A'}</strong></p>
        )}
        {tripType === 'round-trip' && (
          <>
            <p>Start: <strong>{startDateTime ? new Date(startDateTime).toLocaleString() : 'N/A'}</strong></p>
            <p>Return: <strong>{endDateTime ? new Date(endDateTime).toLocaleString() : 'N/A'}</strong></p>
          </>
        )}
        {tripType === 'ride-sharing' && (
          <p>Date & Time: <strong>{dateTime ? new Date(dateTime).toLocaleString() : 'N/A'}</strong></p>
        )}
      </div>

      {/* Map */}
      <div ref={mapRef} className="flex-1 rounded-lg shadow-lg border border-gray-300" />

      {/* Source and Destination Inputs */}
      <div className="absolute bottom-20 left-4 right-4 z-10 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <input
          type="text"
          value={source}
          onChange={(e) => handleInputChange(e.target.value, true)}
          placeholder="Enter source"
          className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => handleInputChange(e.target.value, false)}
          placeholder="Enter destination"
          className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.place_id}
            onClick={() => handleSuggestionClick(suggestion, destination === '')}
            className="cursor-pointer p-2 hover:bg-teal-100 rounded-lg"
          >
            {suggestion.description}
          </div>
        ))}
      </div>

      {/* Confirm Ride Button */}
      <div className="fixed bottom-0 w-full bg-white p-4 shadow-lg border-t border-gray-200">
        <button
          onClick={handleConfirmRide}
          className="w-full py-3 bg-gradient-to-r from-teal-500 to-green-400 text-white font-semibold rounded-lg shadow-md hover:from-teal-600 hover:to-green-500 transition-all duration-300"
        >
          Confirm Ride
        </button>
      </div>

      {/* Vehicle Panel */}
      {showVehiclePanel && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <VehiclePanel
            fare={fare}
            setVehiclePanel={setShowVehiclePanel}
            selectVehicle={handleVehicleSelect}
          />
        </div>
      )}
    </div>
  );
}