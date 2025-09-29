// components/GetRegistrationForm.tsx

'use client';

import React, { useState } from 'react';

const GetRegistrationForm = () => {

    const [formData, setFormData] = useState({
        businessName: '',
        panCard: '',
        address: '',
        addressProof: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type !== 'application/pdf') {
            alert('Please upload a PDF file only.');
            return;
        }
        setFormData(prev => ({ ...prev, addressProof: file || null }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Registration form submitted!');
    };

    return (
        <div className="mx-20 p-8 my-10 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Get Your Registration Done</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
                <input type="text" name="businessName" placeholder="Business Name" value={formData.businessName} onChange={handleChange} className="border p-3 rounded" required />
                <input type="number" name="panCard" placeholder="Business PAN Card" value={formData.panCard} onChange={handleChange} className="border p-3 rounded" required />
                <textarea name="address" placeholder="Business Address" value={formData.address} onChange={handleChange} className="border p-3 rounded h-28 resize-none" required />
                <input type="file" name="addressProof" accept="application/pdf" onChange={handleFile} className="border p-3 rounded bg-white" required />
                <button type="submit" className="bg-[#FBA61F] text-white p-3 rounded hover:shadow-lg">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default GetRegistrationForm;