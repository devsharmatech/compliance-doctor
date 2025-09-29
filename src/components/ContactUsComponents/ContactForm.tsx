'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSubmitFormMutation } from '@/store/api-services/form-submission-api';
import { useState, useEffect } from 'react';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  number: z.string().min(7, 'Phone number must be at least 7 digits'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

interface ContactFormProps {
  compact?: boolean;
}

export default function ContactForm({ compact = false }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const [submitForm] = useSubmitFormMutation();
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data: ContactForm) => {
    try {
      await submitForm({
        type: 'contact',
        data,
      }).unwrap();
      reset();
      setShowSuccess(true);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${compact ? 'space-y-3' : 'space-y-6'}`}>
      {/* Name Field */}
      <div className="relative">
        <div className="flex items-center space-x-3">
          <div className="text-blue-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            {...register('name')}
            placeholder="Your full name"
            className="flex-1 py-3 border-0 border-b-2 border-gray-200 focus:outline-none 
             focus:ring-0  text-gray-800 placeholder-gray-400 bg-transparent transition-colors duration-300 w-full"
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errors.name.message}</span>
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="relative">
        <div className="flex items-center space-x-3">
          <div className="text-blue-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <input
            {...register('email')}
            type="email"
            placeholder="your.email@example.com"
            className="flex-1 py-3 border-0 border-b-2 border-gray-200 focus:outline-none 
             focus:ring-0  text-gray-800 placeholder-gray-400 bg-transparent transition-colors duration-300 w-full"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errors.email.message}</span>
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div className="relative">
        <div className="flex items-center space-x-3">
          <div className="text-blue-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <input
            {...register('number')}
            type="tel"
            placeholder="Your phone number"
            className="flex-1 py-3 border-0 border-b-2 border-gray-200 focus:outline-none 
             focus:ring-0  text-gray-800 placeholder-gray-400 bg-transparent transition-colors duration-300 w-full"
          />
        </div>
        {errors.number && (
          <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errors.number.message}</span>
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="relative">
        <div className="flex items-start space-x-3">
          <div className="text-blue-700 mt-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
            </svg>
          </div>
          <textarea
            {...register('message')}
            placeholder="Tell us about your project or inquiry..."
            rows={compact ? 3 : 4}
            className="flex-1 py-3 border-0 border-b-2 border-gray-200 focus:outline-none 
             focus:ring-0  text-gray-800 placeholder-gray-400 bg-transparent transition-colors duration-300 resize-none w-full"
          />
        </div>
        {errors.message && (
          <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errors.message.message}</span>
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-md"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Sending Message...</span>
          </span>
        ) : (
          'Send Message'
        )}
      </button>

      {/* Success Message */}
      {showSuccess && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2 text-green-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Thank you! Your message has been sent.</span>
          </div>
        </div>
      )}
    </form>
  );
}