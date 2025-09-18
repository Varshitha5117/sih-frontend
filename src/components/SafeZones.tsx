'use client';

import { useState, useEffect } from 'react';

interface SafeZone {
  id: string;
  name: string;
  location: string;
  capacity: number;
  facilities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

const SafeZones = () => {
  const [safeZones, setSafeZones] = useState<SafeZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSafeZones = async () => {
      try {
        const response = await fetch('/safeZones.json');
        if (!response.ok) {
          throw new Error('Failed to fetch safe zones data');
        }
        const data = await response.json();
        setSafeZones(data);
      } catch (err) {
        setError('Failed to load safe zones. Please try again later.');
        console.error('Error fetching safe zones:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSafeZones();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>Loading safe zones...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Safe Zones
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Designated safe locations during coastal emergencies
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {safeZones.map((zone) => (
              <div key={zone.id} className="bg-blue-50 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-blue-800">{zone.name}</h3>
                  <div className="mt-3 flex items-center text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {zone.location}
                  </div>
                  
                  <div className="mt-3 flex items-center text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Capacity: {zone.capacity} people
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700">Available Facilities:</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {zone.facilities.map((facility, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-blue-100 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <a href={`https://maps.google.com/?q=${zone.coordinates.lat},${zone.coordinates.lng}`} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 hover:text-blue-900">
                      View on Map
                      <span className="sr-only"> {zone.name}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafeZones;