import { useEffect, useRef, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useLocation } from 'react-router-dom';
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
  const [showVehiclePanel, setShowVehiclePanel] = useState(false); // State to toggle VehiclePanel
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

          // Reverse geocode to get the address for the current location
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
        distanceInKm, // Only include fields relevant to the locations collection
      };
  
      console.log("Ride data being sent:", rideData); // Debug: Log the ride data being sent
  
      // Save the ride to the backend
      const response = await axios.post("http://localhost:5000/api/locations", rideData);
      console.log("Ride saved successfully:", response.data);
  
      // Fetch the distance from the saved location
      const locationId = response.data._id; // Assuming the backend returns the saved location's ID
      const locationResponse = await axios.get(`http://localhost:5000/api/locations/${locationId}`);
      const kms = locationResponse.data.distanceInKm;
  
      console.log("Fetched distance (kms):", kms);
  
      // Calculate fares based on the distance
      setFare({
        sedan: kms * 15, // ₹15/km for Sedan
        suv: kms * 19, // ₹19/km for SUV
        hatchback: kms * 12, // ₹12/km for Hatchback
      });
  
      // Show the VehiclePanel
      setShowVehiclePanel(true);
      console.log("VehiclePanel state updated to true"); // Debug: Confirm state update
    } catch (error) {
      console.error("Error confirming ride:", error);
      alert("Failed to confirm ride. Please try again.");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col relative">
      {/* Trip Details */}
      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Trip Details</h3>
        <p>Trip Type: <strong>{tripType || 'N/A'}</strong></p>
        {tripType === 'one-way' && <p>Date & Time: <strong>{dateTime ? new Date(dateTime).toLocaleString() : 'N/A'}</strong></p>}
        {tripType === 'round-trip' && (
          <>
            <p>Start: <strong>{startDateTime ? new Date(startDateTime).toLocaleString() : 'N/A'}</strong></p>
            <p>Return: <strong>{endDateTime ? new Date(endDateTime).toLocaleString() : 'N/A'}</strong></p>
          </>
        )}
        {tripType === 'ride-sharing' && <p>Date & Time: <strong>{dateTime ? new Date(dateTime).toLocaleString() : 'N/A'}</strong></p>}
      </div>

      {/* Map */}
      <div ref={mapRef} className="flex-1" />

      {/* Source and Destination Inputs */}
      <div className="absolute bottom-20 left-4 right-4 z-10 bg-white p-4 rounded-lg shadow-md">
        <input
          type="text"
          value={source}
          onChange={(e) => handleInputChange(e.target.value, true)}
          placeholder="Enter source"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => handleInputChange(e.target.value, false)}
          placeholder="Enter destination"
          className="w-full p-2 mb-2 border rounded"
        />
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.place_id}
            onClick={() => handleSuggestionClick(suggestion, destination === '')}
            className="cursor-pointer p-2 hover:bg-gray-100"
          >
            {suggestion.description}
          </div>
        ))}
      </div>

      {/* Confirm Ride Button */}
      <div className="fixed bottom-0 w-full bg-white p-4 shadow-md">
        <button
          onClick={handleConfirmRide}
          className="w-full py-3 bg-teal-600 text-white rounded-lg"
        >
          Confirm Ride
        </button>
      </div>
      {/* Vehicle Panel */}
      {showVehiclePanel && (
        <VehiclePanel
          fare={fare}
          userId={user?.id} // Pass the dynamic userId
          setVehiclePanel={setShowVehiclePanel}
          setConfirmRidePanel={() => {}}
          selectVehicle={(vehicleType) => console.log("Selected vehicle:", vehicleType)}
        />
      )}
    </div>
  );
}