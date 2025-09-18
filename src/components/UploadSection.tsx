'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getAuthToken } from '../utils/api';

const UploadSection = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const checkAuth = () => {
      const token = getAuthToken();
      setIsAuthenticated(!!token);
    };
    
    checkAuth();
  }, []);

  const handleReportClick = () => {
    if (isAuthenticated) {
      router.push('/upload');
    } else {
      router.push('/login');
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-800 to-blue-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Report a Coastal Hazard
        </h2>
        <p className="mt-4 text-lg text-blue-100">
          Help protect our coastal communities by reporting hazards you observe. 
          Your timely reports can save lives and protect the environment.
        </p>
        <div className="mt-8">
          <button
            onClick={handleReportClick}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            {isAuthenticated ? 'Report a Hazard' : 'Login to Report'}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <p className="mt-4 text-sm text-blue-200">
          {isAuthenticated 
            ? 'Click to submit a new hazard report' 
            : 'You need to be logged in to report hazards'}
        </p>
      </div>
    </section>
  );
};

export default UploadSection;