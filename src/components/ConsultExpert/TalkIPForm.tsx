'use client';

import React from 'react'
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./form.css";

const TalkIPForm = () => {

    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const totalSteps = 4;

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
            <div className='flex items-center md:h-[632px]'>
                <div className='w-full max-w-md bg-white border border-gray-200 py-6 px-6 consultform'>
                    <div className='flex justify-between items-center w-full pb-2 border-b border-gray-200'>
                        <h1 className='text-[12px]'>{step - 1}/{totalSteps} Complete</h1>
                        <h1 className='text-[12px] text-[#161C2D]'>Takes less than 1 min</h1>
                    </div>

                    <div className='w-full'>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>

                            {step === 1 && (
                                <>

                                    <div>
                                        <h1 className='text-[18px] text-[#326EE6] font-semibold mb-2 text-center'>Enter the basic information to get started</h1>
                                    </div>

                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="email" className='gap-2'> Email</label>
                                        <input type="email" placeholder="Enter your email" id='email' className='border border-gray-300 px-5 py-2 ' />
                                    </div>

                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="mobile" className='gap-2'>  Mobile</label>
                                        <input type="number" placeholder="Enter your mobile" id='mobile' className='border border-gray-300 px-5 py-2 ' />
                                    </div>

                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="pincode" className='gap-2'>  Location</label>
                                        <input type="number" placeholder="Enter your City Pincode" id='pincode' className='border border-gray-300 px-5 py-2 ' />
                                    </div>

                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="language" className='gap-2'>Select your language</label>
                                        <select name="language" id="language" className='border border-gray-300 px-5 py-2 '>
                                            <option value="english">English</option>
                                            <option value="hindi">Hindi</option>
                                            <option value="spanish">Spanish</option>
                                            <option value="chinese">Chinese</option>
                                        </select>
                                    </div>

                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="problem" className='gap-2'>Select your problem</label>
                                        <select name="problem" id="problem" className='border border-gray-300 px-5 py-2 '>
                                            <option value="problem1">Problem 1</option>
                                            <option value="problem2">problem 2</option>
                                            <option value="problem3">problem 3</option>
                                            <option value="problem4">problem 4</option>
                                        </select>
                                    </div>

                                    <div className='mt-2'>
                                        <label htmlFor="whatsapp" className='flex items-center gap-2'>
                                            <input type="checkbox" id="whatsappUpdates" value="yes" className='w-5 h-5' />
                                            Get WhatsApp updates
                                        </label>
                                    </div>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <div>

                                        <div>
                                            <h1 className='text-[14px] text-[#161C2D] mb-3'>Select a slot</h1>
                                        </div>

                                        <div className="flex flex-row items-center gap-7">
                                            <label className="text-[12px] text-[#727880] font-medium">Select Date</label>
                                            <div className="flex items-center border border-gray-300 px-5 py-2 ">
                                                <DatePicker
                                                    selected={selectedDate}
                                                    onChange={(date: Date) => setSelectedDate(date)}
                                                    dateFormat="EEE, dd MMM yyyy"
                                                    minDate={new Date()}
                                                    popperPlacement="bottom"
                                                    placeholderText="Select a date"
                                                    renderCustomHeader={({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
                                                        <div className="flex justify-between items-center px-3 py-2 border-b">
                                                            <button
                                                                onClick={decreaseMonth}
                                                                disabled={prevMonthButtonDisabled}
                                                                className="p-1 rounded-full border hover:bg-gray-100 disabled:opacity-50"
                                                            >
                                                                <FaChevronLeft size={12} />
                                                            </button>
                                                            <span className="font-medium text-base">
                                                                {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
                                                            </span>
                                                            <button
                                                                onClick={increaseMonth}
                                                                disabled={nextMonthButtonDisabled}
                                                                className="p-1 rounded-full border hover:bg-gray-100 disabled:opacity-50"
                                                            >
                                                                <FaChevronRight size={12} />
                                                            </button>
                                                        </div>
                                                    )}
                                                />
                                                <div className='flex items-center'>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const today = new Date();
                                                            today.setHours(0, 0, 0, 0);

                                                            const newDate = new Date(selectedDate);
                                                            newDate.setDate(newDate.getDate() - 1);
                                                            newDate.setHours(0, 0, 0, 0);

                                                            if (newDate >= today) {
                                                                setSelectedDate(newDate);
                                                            }
                                                        }}
                                                        className="text-gray-400 hover:text-black"
                                                        disabled={selectedDate <= new Date(new Date().setHours(0, 0, 0, 0))}
                                                    >
                                                        <FaChevronLeft />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedDate(prev => {
                                                            const newDate = new Date(prev);
                                                            newDate.setDate(prev.getDate() + 1);
                                                            return newDate;
                                                        })}
                                                        className="text-gray-400 hover:text-black"
                                                    >
                                                        <FaChevronRight />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='px-3 pt-10 pb-5'>
                                            <div className='grid grid-cols-2 gap-4'>

                                                <div className='flex flex-col gap-1'>
                                                    <label htmlFor="morning" className='text-[12px] text-[#727880]'>Morning</label>
                                                    <select id="morning" className='border border-gray-300 px-5 py-2 '>
                                                        <option value="" disabled hidden>Select Time</option>
                                                        <option value="08:00 AM">08:00 AM</option>
                                                        <option value="08:30 AM">08:30 AM</option>
                                                        <option value="09:00 AM">09:00 AM</option>
                                                        <option value="09:30 AM">09:30 AM</option>
                                                    </select>
                                                </div>

                                                <div className='flex flex-col gap-1'>
                                                    <label htmlFor="afternoon" className='text-[12px] text-[#727880]'>Afternoon</label>
                                                    <select id="afternoon" className='border border-gray-300 px-5 py-2 '>
                                                        <option value="" disabled hidden>Select Time</option>
                                                        <option value="12:00 PM">12:00 PM</option>
                                                        <option value="12:30 PM">12:30 PM</option>
                                                        <option value="01:00 PM">01:00 PM</option>
                                                        <option value="01:30 PM">01:30 PM</option>
                                                    </select>
                                                </div>

                                                <div className='flex flex-col gap-1'>
                                                    <label htmlFor="evening" className='text-[12px] text-[#727880]'>Evening</label>
                                                    <select id="evening" className='border border-gray-300 px-5 py-2 '>
                                                        <option value="" disabled hidden>Select Time</option>
                                                        <option value="04:00 PM">04:00 PM</option>
                                                        <option value="04:30 PM">04:30 PM</option>
                                                        <option value="05:00 PM">05:00 PM</option>
                                                        <option value="05:30 PM">05:30 PM</option>
                                                    </select>
                                                </div>

                                                <div className='flex flex-col gap-1'>
                                                    <label htmlFor="night" className='text-[12px] text-[#727880]'>Night</label>
                                                    <select id="night" className='border border-gray-300 px-5 py-2 '>
                                                        <option value="" disabled hidden>Select Time</option>
                                                        <option value="07:00 PM">07:00 PM</option>
                                                        <option value="07:30 PM">07:30 PM</option>
                                                        <option value="08:00 PM">08:00 PM</option>
                                                        <option value="08:30 PM">08:30 PM</option>
                                                    </select>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {step === 3 && (
                                <>
                                    <div className="space-y-3">
                                        <h1 className='text-[14px] text-[#161C2D] mb-3'>Make Payment</h1>
                                        <p className='text-[12px] text-[#727880]'>Proceed to select your plan.</p>
                                        <button className='bg-gradient-to-r from-[#013167] to-[#032B50] text-[16px] text-white slugformbtn px-3 py-1'>Select Plan</button>
                                    </div>
                                </>
                            )}

                            {step === 4 && (
                                <>
                                    <div className="space-y-3">
                                        <h1 className='text-[14px] text-[#161C2D] mb-3'>You`re all set!</h1>
                                        <p className='text-[12px] text-[#727880]'>A lawyer will contact you at the scheduled time.</p>
                                    </div>
                                </>
                            )}

                            <div className='flex justify-between gap-[5px] mt-3'>
                                <button type='button' onClick={handleBack} disabled={step === 1} className='px-5 py-1 border border-black text-black slugformbtn disabled:opacity-50 disabled:cursor-not-allowed'>
                                    Back
                                </button>

                                {step < totalSteps ? (
                                    <button type='button' onClick={handleNext} className='px-5 py-1 bg-gradient-to-r from-[#013167] to-[#032B50] text-[16px] text-white slugformbtn'>Next</button>
                                ) : (
                                    <button type='submit' className='px-5 py-1 bg-gradient-to-r from-[#013167] to-[#032B50] shadow-md text-white slugformbtn'>Submit</button>
                                )}
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TalkIPForm