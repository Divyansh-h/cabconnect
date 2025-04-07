import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const LiveTracking = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places']
      });

      try {
        const google = await loader.load();
        if (mapRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            center: { lat: 28.4744, lng: 77.5040 }, // Default to Greater Noida
            zoom: 15,
            styles: [
              {
                featureType: 'all',
                elementType: 'geometry',
                stylers: [{ color: '#e6fcf5' }]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#4fd1c5' }]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#38b2ac' }]
              }
            ]
          });

          // Get user's current location
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };
                map.setCenter(pos);
                new google.maps.Marker({
                  position: pos,
                  map,
                  icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 7,
                    fillColor: '#4fd1c5',
                    fillOpacity: 1,
                    strokeWeight: 2,
                    strokeColor: '#fff'
                  }
                });
              },
              () => {
                console.error('Error: The Geolocation service failed.');
              }
            );
          }
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
};

export default LiveTracking;