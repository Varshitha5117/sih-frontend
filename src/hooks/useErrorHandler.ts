'use client';

import { useState } from 'react';

type ErrorType = Error | string | unknown;

interface UseErrorHandlerReturn {
  error: string | null;
  handleError: (err: ErrorType) => void;
  clearError: () => void;
}

export function useErrorHandler(): UseErrorHandlerReturn {
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: ErrorType) => {
    console.error('Error occurred:', err);
    
    if (err instanceof Error) {
      setError(err.message);
    } else if (typeof err === 'string') {
      setError(err);
    } else {
      setError('An unknown error occurred');
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    error,
    handleError,
    clearError
  };
}