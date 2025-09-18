'use client';

import { useState, useEffect } from 'react';
import HazardCard from '../components/HazardCard';
import UploadSection from '../components/UploadSection';
import Helplines from '../components/Helplines';
import SafeZones from '../components/SafeZones';
import Footer from '../components/Footer';

interface Hazard {
  id: string;
  disasterType: string;
  description: string;
  location: string;
  timestamp: string;
  intensity: 'Low' | 'Medium' | 'High';
  image: string;
}

export default function Home() {
  const [hazards, setHazards] = useState<Hazard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHazards = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch hazard data');
        }
        const data = await response.json();
        setHazards(data);
      } catch (err) {
        setError('Failed to load hazard data. Please try again later.');
        console.error('Error fetching hazards:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHazards();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-16 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Coastal Hazard Monitoring
            </h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto">
              Real-time updates on coastal hazards and emergency information to keep communities safe.
            </p>
          </div>
        </div>
      </section>
      
      {/* Hazard Feed Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            Recent Hazard Alerts
          </h2>
          
          {loading ? (
            <div className="text-center py-12">
              <p>Loading hazard data...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {hazards.map((hazard) => (
                <HazardCard 
                  key={hazard.id}
                  id={hazard.id}
                  disasterType={hazard.disasterType}
                  description={hazard.description}
                  location={hazard.location}
                  timestamp={hazard.timestamp}
                  intensity={hazard.intensity}
                  image={hazard.image}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Upload Section */}
      <UploadSection />
      
      {/* Helplines Section */}
      <Helplines />
      
      {/* Safe Zones Section */}
      <SafeZones />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
