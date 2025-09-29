'use client';

import { useEffect, useMemo } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IService } from '@/types/services';

interface Props {
  service: IService;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function ServiceUserFormModal({ service, onClose, onSubmit }: Props) {
  // Generate Zod schema based on form fields
  const schema = useMemo(() => {
    const shape: Record<string, any> = {};

    service.formFields?.forEach((field) => {
      let base: any = z.string({ required_error: `${field.label} is required` });

      if (field.type === 'email') base = z.string().email(`${field.label} must be a valid email`);

      if (field.type === 'select' && field.options && field.options.length > 0) {
        base = z.enum([...field.options] as [string, ...string[]]);
      }

      shape[field.name] = field.required ? base.min(1) : base.optional();
    });

    return z.object(shape);
  }, [service]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submit = (data: any) => {
    onSubmit(data);
    reset(); // Reset form after submission
    onClose(); // Optionally close modal after submission
  };

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">
          Subscribe to {service.name}
        </h2>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          {service.formFields?.map((field) => (
            <div key={field.name}>
              <label className="block mb-1 font-medium">{field.label}</label>

              {field.type === 'textarea' ? (
                <textarea
                  {...register(field.name)}
                  className="w-full border px-3 py-2 rounded-md"
                />
              ) : field.type === 'select' && field.options ? (
                <select
                  {...register(field.name)}
                  className="w-full border px-3 py-2 rounded-md"
                  defaultValue=""
                >
                  <option value="" disabled>
                    -- Select {field.label} --
                  </option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  {...register(field.name)}
                  className="w-full border px-3 py-2 rounded-md"
                />
              )}

              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name]?.message as string}
                </p>
              )}
            </div>
          ))}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
