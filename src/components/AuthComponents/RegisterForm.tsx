import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterMutation } from '@/store/api-services/auth-api';

// 1. Define Zod schema for form validation
const registerSchema = z.object({
  name: z.string().min(1, 'Full Name is required'),
  email: z.string().email('Invalid email address'),
  dob: z.string().min(1, 'Date of Birth is required'),
  contact: z.string().min(1, 'Contact is required'),
  gender: z.enum(['male', 'female', 'other'], 'Gender is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Confirm Password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'], 
});

type FormValues = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(registerSchema), // 2. Use Zod resolver here
  });
  const router = useRouter();
  const [registerUser, { isLoading, error }] = useRegisterMutation();

  const onSubmit = async (data: FormValues) => {
    const payload = {
      name: data.name,
      email: data.email,
      dob: data.dob,
      contact: data.contact,
      gender: data.gender,
      password: data.password,
      role: 'user',
    };

    try {
      const response = await registerUser(payload).unwrap();
      localStorage.setItem('token', response.token);
      router.push('/home');
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed. Please try again.');
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#005095] to-[#000814] pb-6">
        <div className="bg-[#003f73] text-white px-10 py-12 rounded-3xl shadow-lg ">
        <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-3xl font-bold text-center mb-8">Register</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
            <div>
              <label>Full Name</label>
              <input {...register('name')} className="w-full bg-transparent border-b border-white p-2 mt-1 outline-none" />
              {errors.name && <p className="text-red-300 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <label>Email</label>
              <input type="email" {...register('email')} className="w-full bg-transparent border-b border-white p-2 mt-1 outline-none" />
              {errors.email && <p className="text-red-300 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label>Contact</label>
              <input type="text" {...register('contact')} className="w-full bg-transparent border-b border-white p-2 mt-1 outline-none" />
              {errors.contact && <p className="text-red-300 text-sm">{errors.contact.message}</p>}
            </div>

            <div>
              <label>Date of Birth</label>
              <input type="date" {...register('dob')} className="w-full bg-transparent border-b border-white p-2 mt-1 outline-none text-black" />
              {errors.dob && <p className="text-red-300 text-sm">{errors.dob.message}</p>}
            </div>

            <div>
              <label>Gender</label>
              <select {...register('gender')} className="w-full bg-transparent border-b border-white p-2 mt-1 outline-none text-black">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="text-red-300 text-sm">{errors.gender.message}</p>}
            </div>

            <div>
              <label>Password</label>
              <input type="password" {...register('password')} className="w-full bg-transparent border-b border-white p-2 mt-1 outline-none" />
              {errors.password && <p className="text-red-300 text-sm">{errors.password.message}</p>}
            </div>

            <div>
              <label>Confirm Password</label>
              <input type="password" {...register('confirmPassword')} className="w-full bg-transparent border-b border-white p-2 mt-1 outline-none" />
              {errors.confirmPassword && <p className="text-red-300 text-sm">{errors.confirmPassword.message}</p>}
            </div>

          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-white text-blue-800 font-semibold px-6 py-2 rounded-md shadow hover:bg-blue-200 transition disabled:opacity-50"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>

          {error && (
            <p className="text-red-400 mt-4 text-center">
              {(error as any).data?.message || 'Something went wrong!'}
            </p>
          )}

          <p className="text-sm text-center mt-4">
            Already Registered?{' '}
            <span
              onClick={() => router.push('/login')}
              className="text-blue-300 hover:underline cursor-pointer"
            >
              Login Here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
