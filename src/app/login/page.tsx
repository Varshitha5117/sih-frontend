'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from '../../hooks/useForm';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { loginUser } from '../../services/authService';
import { validateEmail, validateRequired } from '../../utils/validation';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { error, handleError, clearError } = useErrorHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: ''
    },
    validations: {
      email: validateEmail,
      password: (value: string) => validateRequired(value, 'Password')
    },
    onSubmit: async (formValues) => {
      try {
        setIsLoading(true);
        clearError();
        await loginUser(formValues);
        router.push('/dashboard');
      } catch (err) {
        handleError(err);
      } finally {
        setIsLoading(false);
      }
    }
  });

  // Only render the form when the component is mounted on the client
  if (!isMounted) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image 
          src="/coastal-village-illustration.jpg" 
          alt="Coastal Village Illustration" 
          fill 
          style={{ objectFit: 'cover' }} 
          priority 
        />
      </div>
      
      {/* Content */}
      <div className="z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-blue-200">Sign in to continue to Ocean Watch</p>
        </div>
        
        <div className="bg-[#0a2342]/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-[#0e4166]/50">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-blue-200 mb-1">Email address</label>
                <input 
                id="email-address" 
                name="email" 
                type="email" 
                autoComplete="email" 
                required 
                value={values.email}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-[#0e4166]'} rounded-lg placeholder-gray-400 text-white bg-[#0a2342]/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out`}
                placeholder="Enter your email" 
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-blue-200 mb-1">Password</label>
                <input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete="current-password" 
                required 
                value={values.password}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-[#0e4166]'} rounded-lg placeholder-gray-400 text-white bg-[#0a2342]/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out`}
                placeholder="Enter your password" 
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input 
                  id="remember-me" 
                  name="remember-me" 
                  type="checkbox" 
                  className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-[#0e4166] rounded bg-[#0a2342]/70" 
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-200">Remember me</label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-300 hover:text-blue-200 transition duration-200 ease-in-out">Forgot password?</a>
              </div>
            </div>

            <div>
              <button 
              type="submit" 
              disabled={isLoading || isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading || isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
            
            {error && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-blue-200">
                Don't have an account?{' '}
                <Link href="/signup" className="font-medium text-blue-300 hover:text-blue-200 transition duration-200 ease-in-out">
                  Sign up now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}