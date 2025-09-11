/**
 * API utilities for authentication and token management
 */

const AUTH_TOKEN_KEY = 'ocean_watch_auth_token';

/**
 * Store authentication token in localStorage
 */
export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error setting auth token:', error);
    }
  }
};

/**
 * Retrieve authentication token from localStorage
 */
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }
  return null;
};

/**
 * Remove authentication token from localStorage
 */
export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error removing auth token:', error);
    }
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

/**
 * Base API request function with authentication
 */
export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'An error occurred while processing your request',
    }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};