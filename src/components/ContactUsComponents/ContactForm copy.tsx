
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSubmitFormMutation } from '@/store/api-services/form-submission-api';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  number: z.string().min(7, 'Number is required'),
  message: z.string().min(5, 'Message is required'),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactForm(){

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
    await submitForm({
      type: 'contact',
      data,
    }).unwrap();
    reset();
  };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center space-y-4">
            <div>
              <input
                {...register('name')}
                placeholder="Your name"
                className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-[#5D3A9B] text-[#5D3A9B] placeholder-gray-400"
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            <div>
              <input
                {...register('email')}
                placeholder="Your email"
                className="w-full border-b-2 border-gray-300 focus:outline-none text-[#B0AAC3] placeholder-gray-400"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div>
              <input
                {...register('number')}
                placeholder="Your Number"
                className="w-full border-b-2 border-gray-300 focus:outline-none text-[#B0AAC3] placeholder-gray-400"
              />
              {errors.number && <p className="text-red-500 text-xs">{errors.number.message}</p>}
            </div>

            <div>
              <textarea
                {...register('message')}
                placeholder="Your message"
                className="w-full border-b-2 border-gray-300 focus:outline-none text-[#B0AAC3] placeholder-gray-400 resize-none"
              />
              {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-1/2 self-center py-2 bg-[#1d7e0a] text-[#fff] font-semibold rounded-md"
            >
              {isSubmitting ? 'Sending...' : 'Contact Us'}
            </button>

            {isSubmitSuccessful && (
              <p className="text-green-600 text-sm mt-2">Thank you! Your message has been sent.</p>
            )}
          </form>
    )
}