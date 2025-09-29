'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'radio' | 'select';
  options?: { label: string; value: string }[]; 
  condition?: (formData: any) => boolean; 
}

interface Props {
  details: {
    service: string;
    plan: string;
  };
  fields: Field[];
  autofill?: Record<string, any>;
}

const Form = ({ details, fields, autofill }: Props) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>(autofill || {});
  const router = useRouter();

  const totalSteps = 2;

  const handleNext = () => {
    if (step < totalSteps) setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const handleChange = (name: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting: ", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-500">Step {step}/{totalSteps}</span>
          <span className="text-xs text-gray-400">Takes less than 1 min</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {step === 1 && (
            <>
              <h1 className="text-2xl font-semibold text-center text-blue-600 mb-4">Please provide the following information</h1>
              {fields.map(field => {
                if (field.condition && !field.condition(formData)) return null;

                return (
                  <div className="flex flex-col gap-1" key={field.name}>
                    <label className="text-sm font-medium text-gray-700">{field.label}</label>

                    {(field.type === 'text' || field.type === 'email' || field.type === 'number') && (
                      <input
                        type={field.type}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    )}

                    {field.type === 'radio' && field.options?.length && (
                      <div className="flex flex-wrap gap-3">
                        {field.options.map(option => (
                          <label key={option.value} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={field.name}
                              value={option.value}
                              checked={formData[field.name] === option.value}
                              onChange={() => handleChange(field.name, option.value)}
                              className="accent-blue-500"
                            />
                            <span className="text-sm text-gray-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {field.type === 'select' && field.options?.length && (
                      <select
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="">-- Select --</option>
                        {field.options.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    )}
                  </div>
                );
              })}
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-2xl font-semibold text-blue-600 text-center mb-4">Confirm Submission</h1>
              <div className="space-y-1 text-gray-700">
                <div><strong>Service Type:</strong> {details.service}</div>
                <div><strong>Selected Plan:</strong> {details.plan}</div>
                {Object.entries(formData).map(([key, value]) => (
                  <div key={key}><strong>{key}:</strong> {String(value)}</div>
                ))}
              </div>
            </>
          )}

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className={`px-4 py-2 rounded-lg border ${
                step === 1 ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 'border-blue-500 text-blue-500 hover:bg-blue-50'
              } transition`}
            >
              Back
            </button>

            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                onClick={() => router.push('/payment')}
                className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition"
              >
                Make Payment
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
