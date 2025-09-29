// components/FreeConsultationForm.tsx

'use client';

import React, { useState } from 'react';

const FreeConsultationForm = () => {
    const [formData, setFormData] = useState({
        businessName: '',
        businessType: '',
        userName: '',
        userEmail: '',
        userPhone: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Free consultation request submitted!');
    };

    return (
        <div className="mx-20 p-8 my-10 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Request a Free Consultation</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" name="businessName" placeholder="Business Name" value={formData.businessName} onChange={handleChange} className="border p-3 rounded" required />
                <input type="text" name="businessType" placeholder="Business Type" value={formData.businessType} onChange={handleChange} className="border p-3 rounded" required />
                <input type="text" name="userName" placeholder="Your Name" value={formData.userName} onChange={handleChange} className="border p-3 rounded" required />
                <input type="email" name="userEmail" placeholder="Your Email" value={formData.userEmail} onChange={handleChange} className="border p-3 rounded" required />
                <input type="tel" name="userPhone" placeholder="Your Phone Number" value={formData.userPhone} onChange={handleChange} className="border p-3 rounded" required />
                <button type="submit" className="bg-[#FBA61F] text-white p-3 rounded hover:shadow-lg">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FreeConsultationForm;
