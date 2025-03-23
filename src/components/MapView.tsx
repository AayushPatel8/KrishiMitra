import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Location {
  latitude: number;
  longitude: number;
}

export function MapView() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          setError('Unable to retrieve your location');
          console.error(error);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-6">
          <a href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Order
          </a>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Delivery Location</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {location && (
            <div className="mb-4 text-gray-700">
              <p><strong>Latitude:</strong> {location.latitude}</p>
              <p><strong>Longitude:</strong> {location.longitude}</p>
            </div>
          )}
          
          <div className="w-full h-[450px] rounded-lg overflow-hidden">
            {location ? (
              <iframe
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude - 0.01}%2C${location.latitude - 0.01}%2C${location.longitude + 0.01}%2C${location.latitude + 0.01}&layer=mapnik&marker=${location.latitude}%2C${location.longitude}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500">Loading map...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}