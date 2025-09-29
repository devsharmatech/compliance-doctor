'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSubmitFormMutation } from '@/store/api-services/form-submission-api';

const contactSchema = z.object({
  email: z.string().email('Invalid email'),
  number: z.string().min(7, 'Mobile number is required'),
  pincode: z.string().min(4, 'Pincode is required'),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Form({ consultType = 'General' }: { consultType?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const [submitForm] = useSubmitFormMutation();

  const onSubmit = async (data: ContactForm) => {
    const message = `Consult to ${consultType} request received`;

    await submitForm({
      type: 'contact',
      data: {
        ...data,
        message,
      },
    }).unwrap();

    reset(); // resets all form fields
  };

  return (
   <div className='flex justify-center my-10'>
                <div className='flex flex-col gap-5 border border-gray-300 shadow-md rounded-xl p-5 md:p-10'>
        <h1 className='flex justify-center text-3xl text-center md:text-left mb-5 md:mb-0'>
          Compliance Doctor
        </h1>
        <h3 className='text-lg text-center md:text-left'>
          Enter the basic informations to get started
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 md:px-7'>
          <div>
            <input
              {...register('email')}
              placeholder='Email'
              className='p-2 border w-full border-black rounded'
            />
            {errors.email && (
              <p className='text-red-500 text-xs'>{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              {...register('number')}
              placeholder='Mobile Number'
              className='p-2 border w-full border-black rounded'
            />
            {errors.number && (
              <p className='text-red-500 text-xs'>{errors.number.message}</p>
            )}
          </div>

          <div>
            <input
              {...register('pincode')}
              placeholder='City Pincode'
              className='p-2 border w-full border-black rounded'
            />
            {errors.pincode && (
              <p className='text-red-500 text-xs'>{errors.pincode.message}</p>
            )}
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className='p-2 bg-[#1D7E0A] w-fit text-white rounded-md self-center mt-5'
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>

          {isSubmitSuccessful && (
            <p className='text-green-600 text-sm mt-2 text-center'>
              Thank you! Your request has been received.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
