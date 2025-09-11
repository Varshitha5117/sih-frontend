'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Define interfaces for type safety
interface UserData {
  name: string;
  email: string;
  posts: number;
  // Add more fields as needed for future implementation
  profileImage?: string;
  badge?: {
    text: string;
    type: 'verified' | 'admin' | 'member';
  };
}

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    posts: 42,
    badge: {
      text: 'verified',
      type: 'verified'
    }
  });
  
  // Loading state for API calls
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated and fetch user data
  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      try {
        // This would check for authentication token
        // const token = localStorage.getItem('authToken');
        // if (!token) {
        //   router.push('/login');
        //   return;
        // }
        
        // For demo purposes, we'll use the hardcoded data
        // In a real app, you would fetch user data from an API
        // const response = await fetch('/api/user/profile', {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        // 
        // if (response.ok) {
        //   const data = await response.json();
        //   setUserData(data);
        // }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error appropriately
      }
    };
    
    checkAuthAndFetchData();
  }, [router]);

  const handleLogout = async () => {
    try {
      // In a real app, you would call a logout API endpoint
      // const token = localStorage.getItem('authToken');
      // await fetch('/api/auth/logout', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      
      // Clear authentication token
      // localStorage.removeItem('authToken');
      
      // Redirect to login page
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle error appropriately
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Ocean Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image 
          src="/ocean-background.svg" 
          alt="Ocean Background" 
          fill 
          style={{ objectFit: 'cover' }} 
          priority 
        />
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="z-10 bg-red-500/80 text-white p-4 rounded-lg mb-6 backdrop-blur-sm shadow-lg">
          {error}
        </div>
      )}
      
      {/* Content */}
      <div className="z-10 flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-4xl">
        {isLoading ? (
          <div className="flex items-center justify-center p-12 bg-black/50 backdrop-blur-sm rounded-lg shadow-xl">
            <div className="text-white text-xl">Loading profile data...</div>
          </div>
        ) : (
          <>
            {/* Left Section: Profile Photo and Badge */}
            <div className="relative mb-8 md:mb-0">
              <div className="w-64 h-64 rounded-full bg-black flex items-center justify-center text-white text-xl shadow-lg border-4 border-white/20">
                profile photo
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-300 px-4 py-2 rounded shadow-md">
                {userData.badge?.text || 'badge'}
              </div>
            </div>

            {/* Right Section: User Details Card */}
            <div className="bg-black/80 backdrop-blur-sm rounded-3xl border-2 border-blue-500 p-8 w-full max-w-md flex flex-col gap-6 shadow-xl">
              {/* Name */}
              <div className="bg-gray-300 p-4 rounded-lg flex items-center justify-center shadow-inner">
                <span className="text-black text-lg font-medium">{userData.name}</span>
              </div>
              
              {/* Email */}
              <div className="bg-gray-300 p-4 rounded-lg flex items-center justify-center shadow-inner">
                <span className="text-black text-lg font-medium">{userData.email}</span>
              </div>
              
              {/* Post Count */}
              <div className="bg-gray-300 p-4 rounded-lg flex items-center justify-center shadow-inner">
                <span className="text-black text-lg font-medium">no of posts: {userData.posts}</span>
              </div>
              
              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                disabled={isLoading}
                className="bg-gray-300 p-4 rounded-lg text-black text-lg font-medium hover:bg-gray-400 transition-colors shadow-md hover:shadow-lg active:shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Logging out...' : 'log out'}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}