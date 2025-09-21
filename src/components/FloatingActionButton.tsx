'use client';

import { useState } from 'react';

const FloatingActionButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div onClick={() => alert("Coming soon – frontend only")}>
      <div 
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && (
          <span className="absolute right-16 bg-blue-700 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap animate-fade-in">
            Report Hazard
          </span>
        )}
        <div className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FloatingActionButton;