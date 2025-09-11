/**
 * Custom hook for form handling with validation
 */

import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { validateForm } from '../utils/validation';

type ValidationFunction<T> = (value: T) => { valid: boolean; message?: string };

interface UseFormProps<T extends Record<string, any>> {
  initialValues: T;
  validations?: { [K in keyof T]?: ValidationFunction<T[K]> };
  onSubmit: (values: T) => void | Promise<void>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validations = {},
  onSubmit,
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<{ [K in keyof T]?: string }>({});
  const [touched, setTouched] = useState<{ [K in keyof T]?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle input change
   */
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      
      // Clear error when field is edited
      if (errors[name as keyof T]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
      
      // Mark field as touched
      if (!touched[name as keyof T]) {
        setTouched((prev) => ({ ...prev, [name]: true }));
      }
      
      // Validate field if validation exists
      if (validations[name as keyof T]) {
        const validationFn = validations[name as keyof T];
        if (validationFn) {
          const result = validationFn(value as any);
          if (!result.valid) {
            setErrors((prev) => ({ ...prev, [name]: result.message }));
          }
        }
      }
    },
    [errors, touched, validations]
  );

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      );
      setTouched(allTouched as { [K in keyof T]?: boolean });
      
      // Validate all fields
      const validationResult = validateForm(values, validations);
      
      if (!validationResult.isValid) {
        setErrors(validationResult.errors);
        return;
      }
      
      try {
        setIsSubmitting(true);
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validations, onSubmit]
  );

  /**
   * Reset form to initial values
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  /**
   * Set a specific field value programmatically
   */
  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
  };
}