'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getAuthToken, removeAuthToken } from '../../utils/api';
import { logoutUser } from '../../services/authService';
import { useErrorHandler } from '../../hooks/useErrorHandler';

const Navbar = () => {
  const router = useRouter();
  const { error, handleError, clearError } = useErrorHandler();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = () => {
      const token = getAuthToken();
      setIsAuthenticated(!!token);
    };
    
    checkAuth();
    // We could add an event listener for storage changes to detect login/logout in other tabs
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      clearError();
      await logoutUser();
      setIsAuthenticated(false);
      router.push('/login');
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#182128] border-b border-gray-700 shadow-sm py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.svg" 
                alt="Ocean Watch Logo" 
                width={120} 
                height={30} 
                className="h-8 w-auto" 
              />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 px-8">
            <form onSubmit={handleSearch} className="w-full max-w-lg">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-[#1e2a33] text-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && (
              <>
                <Link href="/upload" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Upload
                </Link>
                <Link href="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/profile" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Profile
                </Link>
              </>
            )}
            <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Log In
            </Link>
          </div>

          {/* User Links - Show login/signup when not authenticated, show logout when authenticated */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? 'Logging out...' : 'Log Out'}
              </button>
            ) : (
              <>
                <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Log In
                </Link>
                <Link href="/signup" className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium transition duration-200">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={mobileMenuOpen ? 'true' : 'false'}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-[#182128]`}>
        {/* Navigation Links */}
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {isAuthenticated && (
            <>
              <Link href="/upload" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Upload
              </Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Dashboard
              </Link>
              <Link href="/profile" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Profile
              </Link>
            </>
          )}
          <Link href="/login" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Log In
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="px-2 space-y-1">
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? 'Logging out...' : 'Log Out'}
              </button>
            ) : (
              <>
                <Link href="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Error message display */}
      {error && (
        <div className="bg-red-500 text-white p-2 text-center">
          {error}
        </div>
      )}
    </nav>
  );
};

export default Navbar;