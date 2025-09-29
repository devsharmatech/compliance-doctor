'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Form from '@/components/ServicePageComponent/Form';

const formFields: Record<string, any[]> = {
  'Registrations': [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'mobile', label: 'Mobile', type: 'number' },
    { name: 'pincode', label: 'Pincode', type: 'number' },
  ],
  'Goods & Services Tax (GST)': [
    {
      name: 'hasBusinessName',
      label: 'Do you have a business name?',
      type: 'radio',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ]
    },
    {
      name: 'companyName',
      label: 'Company Name',
      type: 'text',
      condition: (data: any) => data.hasBusinessName === 'yes',
    },
  ],
  'UDYAM Registration': [
    {
      name: 'Income',
      label: 'Annual Turnover',
      type: 'select',
      options: [
        { label: 'Less than 10 lakhs', value: 'Less than 10 lakhs' },
        { label: '10 lakhs - 1 crore', value: '10 lakhs - 1 crore' },
        { label: '10 crore - 5 crores', value: '10 crore - 5 crores' },
        { label: 'Above 5 crores', value: 'Above 5 crores' },
      ]
    }
  ],
  'Trademark Services': [
    { name: 'brandName', label: 'Brand Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'mobile', label: 'Mobile', type: 'number' },
  ]
};

function FormRedirect() {
  const searchParams = useSearchParams();

  const searchParamsObj = {
    service: searchParams.get('service')?.trim() || '',
    plan: searchParams.get('plan')?.trim() || '',
    email: searchParams.get('email')?.trim() || '',
    mobile: searchParams.get('mobile')?.trim() || '',
    pincode: searchParams.get('pincode')?.trim() || '',
  };

  const fields = formFields[searchParamsObj.service] ?? [];

  const autofill = {
    ...(searchParamsObj.email && { email: searchParamsObj.email }),
    ...(searchParamsObj.mobile && { mobile: searchParamsObj.mobile }),
    ...(searchParamsObj.pincode && { pincode: searchParamsObj.pincode }),
  };

  return <Form details={{ service: searchParamsObj.service, plan: searchParamsObj.plan }} fields={fields} autofill={autofill} />;
}

export default function FormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormRedirect />
    </Suspense>
  );
}
