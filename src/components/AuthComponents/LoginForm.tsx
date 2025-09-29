'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'; // for Next.js 13+ (app directory)
import { useLoginMutation } from '@/store/api-services/auth-api';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { setAuth } from '@/store/slices/auth-slice';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const [login, { isLoading, data }] = useLoginMutation();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const res = await login({
                email: data.email,
                password: data.password,
            }).unwrap();

            toast.success('Login successful!');
            dispatch(setAuth(res))
            localStorage.setItem('token', res.token);
            localStorage.setItem('userData', JSON.stringify(res.user));

            router.push('/');
        } catch (err: any) {
            toast.error(err?.data?.message || 'Login failed!');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#005095] to-[#000814]">
            <div className="bg-[#003f73] text-white px-10 py-12 rounded-3xl shadow-lg w-[400px]">
                <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="w-full bg-transparent border-b border-white focus:outline-none text-white placeholder-gray-300"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Password</label>
                        <input
                            type="password"
                            {...register('password')}
                            className="w-full bg-transparent border-b border-white focus:outline-none text-white placeholder-gray-300"
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" {...register('remember')} className="accent-white" />
                            Remember me
                        </label>
                        <a href="#" className="text-blue-300 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-white text-[#003f73] py-2 rounded-md font-semibold hover:bg-gray-100 transition"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="text-sm text-center mt-6">
                    Don’t have an account?{' '}
                    <Link href="/register" className="text-blue-300 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
