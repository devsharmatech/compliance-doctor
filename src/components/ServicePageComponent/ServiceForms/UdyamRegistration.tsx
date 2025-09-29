'use client';

import React from 'react'
import { useState } from 'react';
import { RxCross1 } from "react-icons/rx";

interface Props {
    onClose: () => void;
}

const UdyamRegistration = ({ onClose }: Props) => {

    const [step, setStep] = useState(1);

    const totalSteps = 2;

    const handleNext = () => {
        if (step < totalSteps) setStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(prev => prev - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="fixed inset-0 p-7 bg-black/50 backdrop-blur-md flex justify-center items-center z-50">
                <div className="bg-white px-7 py-5 rounded-xl border-2 border-gray-300 shadow-md w-full max-w-[1200px] max-h-full overflow-y-auto scrollbar-hide space-y-4">
                    <div className='flex flex-row justify-between items-center mb-5'>
                        <h1 className="text-3xl text-[#00457C] font-semibold">
                            Udyam (MSME) Registration
                        </h1>
                        <button onClick={onClose}><RxCross1 className='text-2xl' /></button>
                    </div>
                    <h1 className='font-bold text-2xl'>
                        Empower Your Business: Easy Online Udyam Registration
                    </h1>
                    <h1 className='text-xl'>
                        Unlock benefits and support for your Micro, Small, and Medium Enterprise.
                    </h1>
                    <div className='flex flex-row'>
                        <div className='flex flex-col gap-3 p-3 mt-5 w-3/5'>
                            <h1 className='text-lg'>Your Benefits with Compliance Doctor:</h1>
                            <ul className='flex flex-col md:block list-disc mt-5 ml-5 space-y-5'>
                                <li>
                                    Easy Online Udyam registration done by Experts.
                                    <ul className='ml-5 mt-2'>
                                        <li>○ Get your Udyog Aadhaar Delivered on time.</li>
                                    </ul>
                                </li>
                                <li>
                                    100% Online process, Quick processing and filing assured.
                                </li>
                                <li>
                                    1.5 Lakh + Successful MSME Registrations
                                    <ul className='ml-5 mt-2'>
                                        <li>○ MSME registration in under 3 days</li>
                                        <li>○ Expand your business without having to wait</li>
                                    </ul>
                                </li>
                                <li>
                                    Complete assistance during documentation till registration
                                    <ul className='ml-5 mt-2'>
                                        <li>○ Start you business from the comfort of your home</li>
                                    </ul>
                                </li>
                                <li>
                                    24x7 expert support
                                </li>
                            </ul>
                        </div>
                        <div className='w-auto md:w-2/5'>
                            <div className='border border-black p-5 rounded-xl space-y-5'>
                                <div className='flex justify-between'>
                                    <h1>{step - 1}/{totalSteps} Complete</h1>
                                    <h1>Takes less than 1 min</h1>
                                </div>

                                <div>
                                    <h1 className='text-lg'>What`s the annual turnover of your company?</h1>
                                </div>

                                <div>
                                    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>

                                        {step === 1 && (
                                            <>

                                                <div className='flex flex-col gap-2'>
                                                    <label htmlFor="income">Select Income</label>
                                                    <select name="income" id="income" className='border border-gray-300 rounded-xl px-5 py-2' required>
                                                        <option value="">-- Select an option --</option>
                                                        <option value="lt10">Less than 10 lakhs</option>
                                                        <option value="10to1">10 lakhs - 1 crore</option>
                                                        <option value="1to5">10 crore - 5 crores</option>
                                                        <option value="gt5">Above 5 crores</option>
                                                    </select>
                                                </div>
                                            </>
                                        )}

                                        {step === 2 && (
                                            <>
                                                <div className='w-full flex justify-center my-10'>
                                                    <h1 className='text-2xl'>Confirm Submission</h1>
                                                </div>
                                            </>
                                        )}

                                        <div className='flex justify-between mt-3'>
                                            <button type='button' onClick={handleBack} disabled={step === 1} className='px-3 py-1 border border-black text-black'>
                                                Back
                                            </button>

                                            {step < totalSteps ? (
                                                <button type='button' onClick={handleNext} className='px-2 py-1 border border-black text-black '>Next</button>
                                            ) : (
                                                <button type='submit' className='px-3 py-1 bg-[#FBA61F] text-white '>Submit</button>
                                            )}
                                        </div>

                                    </form>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UdyamRegistration