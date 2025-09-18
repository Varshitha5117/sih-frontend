'use client';

import Image from 'next/image';
import { useState } from 'react';

interface HazardCardProps {
  id: string;
  disasterType: string;
  description: string;
  location: string;
  timestamp: string;
  intensity: 'Low' | 'Medium' | 'High';
  image: string;
}

const HazardCard: React.FC<HazardCardProps> = ({
  id,
  disasterType,
  description,
  location,
  timestamp,
  intensity,
  image
}) => {
  const [expanded, setExpanded] = useState(false);
  
  // Format the timestamp to a more readable format
  const formattedDate = new Date(timestamp).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  
  // Determine the color based on intensity
  const intensityColor = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800'
  }[intensity];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image 
          src={image} 
          alt={disasterType} 
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-0 right-0 m-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${intensityColor}`}>
            {intensity}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{disasterType}</h3>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>
        
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-medium">Location:</span> {location}
        </p>
        
        <div className="mt-2">
          <p className={`text-sm text-gray-700 ${expanded ? '' : 'line-clamp-2'}`}>
            {description}
          </p>
          {description.length > 100 && (
            <button 
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-blue-600 hover:text-blue-800 mt-1 focus:outline-none"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
        
        <div className="mt-4 flex justify-end">
          <button className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HazardCard;