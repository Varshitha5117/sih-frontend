'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from '../../hooks/useForm';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { signupUser } from '../../services/authService';
import { validateEmail, validatePassword, validateRequired, validatePasswordConfirmation } from '../../utils/validation';

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const router = useRouter();
  const { error, handleError, clearError } = useErrorHandler();
  const [isLoading, setIsLoading] = useState(false);
  
  const { values, errors, handleChange, handleSubmit } = useForm<SignupFormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validations: {
      name: (value: string) => validateRequired(value, 'Name'),
      email: validateEmail,
      password: validatePassword,
      confirmPassword: (value: string) => validatePasswordConfirmation(values.password, value)
    },
    onSubmit: async (formValues) => {
      try {
        setIsLoading(true);
        clearError();
        
        // Extract the data needed for signup (excluding confirmPassword)
        const { confirmPassword, ...signupData } = formValues;
        
        await signupUser(signupData);
        router.push('/dashboard');
      } catch (err) {
        handleError(err);
      } finally {
        setIsLoading(false);
      }
    }
  });
  
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
          <h1 className="text-5xl font-bold text-white mb-2">Join Ocean Watch</h1>
          <p className="text-blue-200">Create your account to get started</p>
        </div>
        
        <div className="bg-[#0a2342]/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-[#0e4166]/50">
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-blue-200 mb-1">Full name</label>
              <input 
                id="name" 
                name="name" 
                type="text" 
                autoComplete="name" 
                required 
                value={values.name}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-[#0e4166]'} rounded-lg placeholder-gray-400 text-white bg-[#0a2342]/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out`}
                placeholder="Enter your full name" 
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>
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
              autoComplete="new-password" 
              required 
              value={values.password}
              onChange={handleChange}
              className={`appearance-none relative block w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-[#0e4166]'} rounded-lg placeholder-gray-400 text-white bg-[#0a2342]/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out`}
              placeholder="Create a password" 
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password}</p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-200 mb-1">Confirm Password</label>
            <input 
              id="confirmPassword" 
              name="confirmPassword" 
              type="password" 
              autoComplete="new-password" 
              required 
              value={values.confirmPassword}
              onChange={handleChange}
              className={`appearance-none relative block w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-[#0e4166]'} rounded-lg placeholder-gray-400 text-white bg-[#0a2342]/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out`}
              placeholder="Confirm your password" 
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
            )}
          </div>
          </div>

          <div className="flex items-center py-2">
            <input 
              id="terms" 
              name="terms" 
              type="checkbox" 
              className="h-5 w-5 text-blue-500 focus:ring-blue-400 border-[#0e4166] rounded bg-[#0a2342]/70" 
              required 
            />
            <label htmlFor="terms" className="ml-3 block text-sm text-blue-200">I agree to the terms and conditions</label>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a2342] transition-colors duration-200 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
            
            {error && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-blue-200">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200">
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
      </div>
    </main>
  );
}