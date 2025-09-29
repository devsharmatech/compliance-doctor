'use client';

import React from 'react'
import { useState } from 'react';
import { RxCross1 } from "react-icons/rx";

interface Props {
    onClose: () => void;
}

const GSTRegistrations = ({ onClose }: Props) => {

    const [step, setStep] = useState(1);
    const [hasBusinessName, setHasBusinessName] = useState<"yes" | "no" | "">("");
    const [companyName, setCompanyName] = useState("");

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
                            GST Registration
                        </h1>
                        <button onClick={onClose}><RxCross1 className='text-2xl' /></button>
                    </div>
                    <h1 className='font-bold text-2xl'>
                        Seamless GST Registration Online: Documents, Requirements, Procedure & Expert Support
                    </h1>
                    <h1 className='text-xl'>
                        Ensure smooth GST compliance from day one.
                    </h1>
                    <div className='flex flex-row gap-7'>
                        <div className='flex flex-col gap-3 p-3 mt-5 w-3/5'>
                            <h1 className='text-lg'>Your Benefits with Compliance Doctor:</h1>
                            <ul className='flex flex-col md:block list-disc mt-5 ml-5 space-y-5'>
                                <li>
                                    GST Application Filing in Just 2 Business Days.
                                </li>
                                <li>
                                    Simplified process for new GST registration, application status tracking, and resolving clarifications with the GST authorities.
                                </li>
                                <li>
                                    Tailored GST services for businesses, eCommerce sellers, startups, and government offices.
                                </li>
                                <li>
                                    Comprehensive GST services, including CA-assisted online document submission, GST return filing, and GSTIN procurement.
                                </li>
                                <li>
                                    Expert assistance for GST e-invoicing, ledger management, and invoice maintenance to ensure compliance.
                                </li>
                                <li>
                                    10% of all Indian businesses use Compliance Doctor.
                                </li>
                                <li>
                                    Filing within 48hrs
                                </li>
                                <li>
                                    Zero penalty guarantee
                                </li>
                                <li>
                                    1 minute query response time
                                </li>
                            </ul>
                        </div>
                        <div className='w-auto md:w-5/12 pt-5'>
                            <div className='border border-black p-5 rounded-xl space-y-5'>
                                <div className='flex justify-between'>
                                    <h1>{step - 1}/{totalSteps} Complete</h1>
                                    <h1>Takes less than 1 min</h1>
                                </div>

                                <div>
                                    <h1 className='text-lg'>Do you have a business name? (For GST registration)</h1>
                                </div>

                                <div>
                                    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>

                                        {step === 1 && (
                                            <>
                                                <div className='flex flex-col gap-3'>
                                                    <label className="flex items-center gap-2">
                                                        <input type="radio" name="businessNameOption" value="yes" checked={hasBusinessName === "yes"} onChange={() => setHasBusinessName("yes")} />
                                                        Yes, I have a business name
                                                    </label>

                                                    {hasBusinessName === "yes" && (
                                                        <input type="text" name="companyName" placeholder="Enter your company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="border border-gray-300 rounded-xl px-5 py-2" required />
                                                    )}

                                                    <label className="flex items-center gap-2">
                                                        <input type="radio" name="businessNameOption" value="no" checked={hasBusinessName === "no"} onChange={() => setHasBusinessName("no")} />
                                                        I don`t have a business name yet. I will update it later.
                                                    </label>

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

export default GSTRegistrations