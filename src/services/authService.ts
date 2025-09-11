/**
 * Authentication service for user login, signup, and logout
 */

import { apiRequest, setAuthToken, removeAuthToken } from '../utils/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

/**
 * Login user with email and password
 */
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // In a real app, this would be an API call
  // For now, we'll simulate a successful login
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResponse = {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          name: 'Test User',
          email: credentials.email,
        },
      };
      
      // Store the token
      setAuthToken(mockResponse.token);
      
      resolve(mockResponse);
    }, 500);
  });
};

/**
 * Register a new user
 */
export const signupUser = async (userData: SignupData): Promise<AuthResponse> => {
  // In a real app, this would be an API call
  // For now, we'll simulate a successful registration
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResponse = {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          name: userData.name,
          email: userData.email,
        },
      };
      
      // Store the token
      setAuthToken(mockResponse.token);
      
      resolve(mockResponse);
    }, 500);
  });
};

/**
 * Logout the current user
 */
export const logoutUser = async (): Promise<void> => {
  // In a real app, this might involve an API call to invalidate the token
  // For now, we'll just remove the token from storage
  return new Promise((resolve) => {
    setTimeout(() => {
      removeAuthToken();
      resolve();
    }, 300);
  });
};

/**
 * Get the current user profile
 */
export const getCurrentUser = async (): Promise<any> => {
  // In a real app, this would fetch user data from an API
  // For now, we'll return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        name: 'Test User',
        email: 'user@example.com',
      });
    }, 300);
  });
};