import { useEffect, useRef, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, Navigation } from 'lucide-react';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'; // ✅ Import added

interface Location {
  lat: number;
  lng: number;
}

export default function Dashboard() {
  const { user } = useUser();
  const mapRef = useRef<HTMLDivElement>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [distanceInKm, setDistanceInKm] = useState<number | null>(null);
  const [animatedMarker, setAnimatedMarker] = useState<google.maps.Marker | null>(null);
  const [showVehiclePanel, setVehiclePanel] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [showConfirmRidePanel, setConfirmRidePanel] = useState(false); // ✅ Added

  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places']
      });

      const google = await loader.load();

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(loc);

          const mapInstance = new google.maps.Map(mapRef.current!, {
            center: loc,
            zoom: 15,
            styles: [
              { featureType: 'all', elementType: 'geometry', stylers: [{ color: '#e6fcf5' }] },
              { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#4fd1c5' }] }
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
        });
      }
    };

    initializeMap();
  }, []);

  const handleDestinationChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDestination(value);

    if (value && autocompleteService.current) {
      const predictions = await autocompleteService.current.getPlacePredictions({
        input: value,
        componentRestrictions: { country: 'IN' }
      });
      setSuggestions(predictions.predictions);
    } else {
      setSuggestions([]);
    }
  };

  const animateMarker = (path: google.maps.LatLng[]) => {
    if (!map) return;
    let i = 0;
    const marker = new google.maps.Marker({
      position: path[0],
      map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 6,
        fillColor: '#000',
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#fff'
      }
    });
    setAnimatedMarker(marker);

    const interval = setInterval(() => {
      if (i < path.length) {
        marker.setPosition(path[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  };

  const handleSuggestionClick = async (suggestion: google.maps.places.AutocompletePrediction) => {
    setDestination(suggestion.description);
    setSuggestions([]);

    if (placesService.current && currentLocation) {
      const placeResult = await new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
        placesService.current!.getDetails({ placeId: suggestion.place_id }, (result, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && result) resolve(result);
          else reject(status);
        });
      });

      if (placeResult.geometry?.location && map && directionsRenderer) {
        const directionsService = new google.maps.DirectionsService();
        const response = await directionsService.route({
          origin: currentLocation,
          destination: placeResult.geometry.location,
          travelMode: google.maps.TravelMode.DRIVING
        });

        directionsRenderer.setDirections(response);

        const distance = response.routes[0].legs[0].distance?.value ?? 0;
        const km = distance / 1000;
        setDistanceInKm(km);

        const path = response.routes[0].overview_path;
        animateMarker(path);
      }
    }
  };

  const handleConfirmDestination = () => {
    if (distanceInKm) {
      setVehiclePanel(true);
    }
  };

  const selectVehicle = (type: string) => {
    setSelectedVehicle(type);
    setVehiclePanel(false);
    setConfirmRidePanel(true); // ✅ Show ConfirmRidePopUp after selecting vehicle
  };

  const fare = {
    sedan: (distanceInKm ?? 0) * 15,
    suv: (distanceInKm ?? 0) * 19,
    hatchback: (distanceInKm ?? 0) * 12
  };

  return (
    <div className="h-screen w-full bg-cover bg-center flex flex-col relative"
         style={{ backgroundImage: `url(https://ucarecdn.com/b27b6a12-c4b1-4b50-b415-f1f4fd012c45/Screenshot20250405212449.png)` }}>

      <div className="absolute top-6 left-6 z-10">
        <img className="w-14 h-14 object-contain rounded-full shadow-lg"
             src="https://ucarecdn.com/b24d846f-32fa-4621-b123-24188952b1bf/logoremovebgpreview.png"
             alt="Trawell Logo" />
      </div>

      <div ref={mapRef} className="flex-1" />

      <div className="fixed bottom-0 w-full backdrop-blur-lg bg-white/60 rounded-t-3xl shadow-xl p-6 space-y-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 tracking-wide">
            Where to? <span className="text-black">🚗</span>
          </h2>
          <p className="text-sm text-gray-600">Your journey starts here.</p>
        </div>

        <div className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-md">
          <MapPin className="text-blue-900" />
          <input
            type="text"
            placeholder="Enter destination"
            value={destination}
            onChange={handleDestinationChange}
            className="flex-1 outline-none text-gray-800"
          />
        </div>

        {suggestions.length > 0 && (
          <ul className="bg-white rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <li key={suggestion.place_id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="p-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-2">
                <Navigation className="w-4 h-4 text-blue-900" />
                <span className="text-gray-800">{suggestion.description}</span>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={handleConfirmDestination}
          className="w-full py-3 rounded-lg bg-white text-blue-900 font-medium transition hover:bg-gray-800 hover:text-white shadow-md"
        >
          Confirm Destination
        </button>

        {distanceInKm !== null && (
          <div className="text-center text-sm text-gray-800">
            Distance: <span className="font-bold">{distanceInKm.toFixed(2)} km</span>
          </div>
        )}
      </div>

      {showVehiclePanel && (
        <div className="fixed bottom-0 w-full z-50">
          <VehiclePanel
            fare={fare}
            setVehiclePanel={setVehiclePanel}
            setConfirmRidePanel={setConfirmRidePanel} // ✅ Can be used inside VehiclePanel if needed
            selectVehicle={selectVehicle}
          />
        </div>
      )}

      {showConfirmRidePanel && selectedVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
          <ConfirmRidePopUp
            selectedVehicle={selectedVehicle}
            fare={fare[selectedVehicle as keyof typeof fare]}
            onConfirm={() => {
              setConfirmRidePanel(false);
              // 🚀 TODO: Handle confirmed ride logic
              console.log('Ride confirmed with', selectedVehicle, 'fare:', fare[selectedVehicle]);
            }}
            onCancel={() => setConfirmRidePanel(false)}
          />
        </div>
      )}
    </div>
  );
}
