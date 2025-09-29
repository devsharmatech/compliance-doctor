'use client';

import React from 'react'
import { useState } from 'react';
import { MdOutlineEmail } from "react-icons/md";
import { ImMobile } from "react-icons/im";
import { RxCross1 } from "react-icons/rx";

interface Props {
    onClose: () => void;
}

const TrademarkRegistrations = ({ onClose }: Props) => {

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
                            Trademark Registration
                        </h1>
                        <button onClick={onClose}><RxCross1 className='text-2xl' /></button>
                    </div>
                    <h1 className='font-bold text-2xl'>
                        Protect Your Brand: Fast & Reliable Trademark Registration
                    </h1>
                    <h1 className='text-xl'>
                        Secure your unique identity with expert IP legal support.
                    </h1>
                    <div className='flex flex-row gap-5'>
                        <div className='flex flex-col gap-3 p-3 mt-5 w-3/5'>
                            <h1 className='text-lg'>Your Benefits with Compliance Doctor:</h1>
                            <ul className='flex flex-col md:block list-disc mt-5 ml-5 space-y-5'>
                                <li>
                                    Trusted by thousands of startups and enterprises, we ensure your trademark is filed within 6 hours.
                                </li>
                                <li>
                                    Our senior IP lawyer conducts thorough trademark searches before application.
                                </li>
                                <li>
                                    Stay informed with regular updates throughout the process.
                                </li>
                                <li>
                                    100% Money-back guarantee.
                                </li>
                                <li>
                                    Live update: Jun 7, 2025.
                                    <ul className='ml-5 mt-2'>
                                        <li>
                                            ○ IP experts currently deals with:
                                            <ul className='ml-5 mt-2'>
                                                <li>■ 227 Applications</li>
                                                <li>■ 7 Objection responses</li>
                                                <li>■ 31 symbols delivered</li>
                                            </ul>
                                        </li>
                                    </ul>
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
                                    <h1 className='text-lg'>What would you like to protect?</h1>
                                </div>

                                <div>
                                    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>

                                        {step === 1 && (
                                            <>
                                                <div className='flex flex-col gap-2'>
                                                    <label htmlFor="brandName" className="font-medium text-lg">Brand Name</label>
                                                    <input type="text" id="brandName" name="brandName" placeholder="Enter your business name" required className="border border-gray-300 rounded-xl px-5 py-2"
                                                    />
                                                    <span className="text-sm text-gray-500">Business name for your brand identity.</span>
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <label htmlFor="email" className='flex text-lg items-center gap-2'> <MdOutlineEmail /> Email</label>
                                                    <input type="email" placeholder="Enter your email" id='email' className='border border-gray-300 rounded-xl px-5 py-2' />
                                                </div>

                                                <div className='flex flex-col gap-2'>
                                                    <label htmlFor="mobile" className='flex text-lg items-center gap-2'> <ImMobile /> Mobile</label>
                                                    <input type="number" placeholder="Enter your mobile" id='mobile' className='border border-gray-300 rounded-xl px-5 py-2' />
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
                                            <button type='button' onClick={handleBack} disabled={step === 1} className='px-3 py-1 border border-black text-black '>
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

export default TrademarkRegistrations