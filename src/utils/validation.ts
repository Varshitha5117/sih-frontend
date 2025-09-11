/**
 * Form validation utilities
 */

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Password validation - at least 8 chars, 1 uppercase, 1 lowercase, 1 number
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;

interface ValidationResult {
  valid: boolean;
  message?: string;
}

/**
 * Validate an email address
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { valid: false, message: 'Email is required' };
  }
  
  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, message: 'Please enter a valid email address' };
  }
  
  return { valid: true };
};

/**
 * Validate a password
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { valid: false, message: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (!PASSWORD_REGEX.test(password)) {
    return { 
      valid: false, 
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' 
    };
  }
  
  return { valid: true };
};

/**
 * Validate a required field
 */
export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value || value.trim() === '') {
    return { valid: false, message: `${fieldName} is required` };
  }
  
  return { valid: true };
};

/**
 * Validate password confirmation
 */
export const validatePasswordConfirmation = (password: string, confirmation: string): ValidationResult => {
  if (password !== confirmation) {
    return { valid: false, message: 'Passwords do not match' };
  }
  
  return { valid: true };
};

/**
 * Validate a form with multiple fields
 */
export const validateForm = (values: Record<string, any>, validations: Record<string, Function>): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  Object.keys(validations).forEach(field => {
    const value = values[field];
    const validation = validations[field];
    const result = validation(value);
    
    if (!result.valid) {
      errors[field] = result.message || 'Invalid value';
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};