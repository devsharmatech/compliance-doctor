'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toast } from 'react-hot-toast';
import { FaSignOutAlt } from 'react-icons/fa';

// Placeholder for Redux logout action (update with your actual action)
import { clearAuth as logout } from '@/store/slices/auth-slice'; // Adjust path to your auth slice

interface UserData {
  email: string;
  // Add other user fields as needed
}

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push('/login');
      toast.error('Please log in to view your profile.');
      return;
    }

    // Retrieve user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
      } catch (err) {
        console.error('Error parsing userData:', err);
        toast.error('Failed to load user data.');
      }
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userData');

    // Dispatch logout action to update Redux state
    // dispatch(logout()); // Replace with your actual logout action

    toast.success('Logged out successfully!');
    router.push('/login');
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#005095] to-[#000814]">
        <div className="bg-[#003f73] text-white px-10 py-12 rounded-3xl shadow-lg w-[400px] text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#005095] to-[#000814]">
      <div className="bg-[#003f73] text-white px-10 py-12 rounded-3xl shadow-lg w-[400px]">
        <h2 className="text-3xl font-bold text-center mb-8">Profile</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-1 font-semibold">Email</label>
            <p className="w-full bg-transparent border-b border-white py-2 text-white">
              {userData.email}
            </p>
          </div>
          {/* Add more user fields here as needed */}
          <button
            onClick={handleLogout}
            className="w-full bg-white text-[#003f73] py-2 rounded-md font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
          >
            <FaSignOutAlt size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}