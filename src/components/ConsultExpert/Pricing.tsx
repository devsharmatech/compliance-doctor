'use client';

import React from 'react'

import { useState } from 'react';
import { HiOutlineCheck } from "react-icons/hi";

const plans = [
    {
        id: 1,
        name: 'Starter',
        description: "Perfect for submitting your company application with expert assistance in 14 days.",
        old_price: 1499,
        price: 999,
        emi: 0,
        benefits: {
            title: "Unlock partner benefits",
            brief: "Post company incorporation worth Rs 4 lakhs"
        },
        features: [
            'Expert assisted process',
            'Your company name is filed in just 2 - 4 days',
            'DSC in just 4 - 7 days',
            'SPICe+ form filing in 14 days',
            'Incorporation Certificate in 28 - 35 days',
            'Company PAN+TAN',
            'DIN for directors'
        ]
    },
    {
        id: 2,
        name: 'Standard',
        description: "Faster application submission with expert assistance in just 7 days.",
        old_price: 2999,
        price: 1499,
        emi: 0,
        benefits: {
            title: "Get ₹1000 cashback",
            brief: "Unlock cashback benefits upon opening a current account with our partner banks."
        },
        features: [
            'Expert assisted process',
            'Your company name is filed in just 1 - 2 days',
            'DSC in just 3 - 4 days',
            'SPICe+ form filing in 7 days',
            'Incorporation Certificate in 14 - 21 days',
            'Company PAN+TAN',
            'DIN for directors',
            'Digital welcome kit that includes a checklist of all post-incorporation compliances'
        ]
    },
    {
        id: 3,
        name: 'Pro',
        description: "Includes fast application submission and trademark filing in 7 days.",
        old_price: 4999,
        price: 3499,
        emi: 1,
        benefits: {
            title: "Get ₹1000 cashback",
            brief: "Unlock cashback benefits upon opening a current account with our partner banks."
        },
        features: [
            'Expert assisted process',
            'Your company name is filed in just 2 - 4 days',
            'DSC in just 4 - 7 days',
            'SPICe+ form filing in 14 days',
            'Incorporation Certificate in 28 - 35 days',
            'Company PAN+TAN',
            'DIN for directors',
            'Digital welcome kit that includes a checklist of all post-incorporation compliances',
            'MSME registration Free',
            'Expedited Trademark application filing'
        ]
    }
]

const govtfee = [
    {
        state: 'Andaman & Nicobar Islands',
        fee: 6696
    },
    {
        state: 'Andhra Pradesh',
        fee: 7696
    },
    {
        state: 'Arunachal Pradesh',
        fee: 6886
    },
    {
        state: 'Assam',
        fee: 6701
    },
    {
        state: 'Bihar',
        fee: 7776
    },
    {
        state: 'Chandigarh',
        fee: 7679
    },
    {
        state: 'Chhattishgarh',
        fee: 7686
    },
    {
        state: 'Dadar Nagar',
        fee: 6217
    },
    {
        state: 'Daman and Diu',
        fee: 7346
    },
    {
        state: 'Delhi',
        fee: 6536
    },
    {
        state: 'Goa',
        fee: 7376
    },
    {
        state: 'Gujarat',
        fee: 6796
    },
    {
        state: 'Haryana',
        fee: 6311
    },
    {
        state: 'Jammu and Kashmir',
        fee: 6486
    },
    {
        state: 'Jharkhand',
        fee: 6349
    },
    {
        state: 'Karnataka',
        fee: 16196
    },
    {
        state: 'Kerala',
        fee: 9201
    },
    {
        state: 'Lakshadweep',
        fee: 7701
    },
    {
        state: 'Madhya Pradesh',
        fee: 13726
    },
    {
        state: 'Maharashtra',
        fee: 7476
    },
    {
        state: 'Manipur',
        fee: 6436
    },
    {
        state: 'Meghalaya',
        fee: 6586
    },
    {
        state: 'Mizoram',
        fee: 6436
    },
    {
        state: 'Nagaland',
        fee: 6436
    },
    {
        state: 'Odisha',
        fee: 6786
    },
    {
        state: 'Puducherry',
        fee: 6686
    },
    {
        state: 'Punjab',
        fee: 16201
    },
    {
        state: 'Rajasthan',
        fee: 11676
    },
    {
        state: 'Tamil Nadu',
        fee: 6696
    },
    {
        state: 'Telangana',
        fee: 7696
    },
    {
        state: 'Tripura',
        fee: 6436
    },
    {
        state: 'Uttar Pradesh',
        fee: 7186
    },
    {
        state: 'Uttarakhand',
        fee: 7186
    },
    {
        state: 'West Bengal',
        fee: 6556
    }
]

export default function Pricing() {

    const [state, setState] = useState('');
    const [mobileplan, setMobilePlan] = useState('');
    const stateselect = govtfee.find((s) => s.state === state);

    return (
        <>
            <div className='flex flex-col items-center space-y-16 md:space-y-20 pt-10 pb-0'>

                <div className='flex flex-col items-center space-y-8 md:space-y-10'>
                    <div className='flex flex-col items-center text-center'>
                        <h1 className='text-3xl md:text-4xl text-center w-fit mb-5 md:mb-3'><span className='font-bold text-[#00457C]'>Right Plan</span> for Your Business</h1>
                        Compliance Doctor's incorporation experts register over 1500 companies every month.
                    </div>

                    <div className='flex flex-col md:flex-row items-center gap-5'>
                        <h1 className='text-lg md:text-xl text-center'>Select your state to view the Government Fee</h1>
                        <select name="govt" id="govt" value={state} onChange={(e) => setState(e.target.value)} className="w-fit p-2 border border-gray-300 rounded-md">
                            <option value="" disabled hidden>-- Select State --</option>
                            {govtfee.map((item, index) => (
                                <option key={index} value={item.state}>
                                    {item.state}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='hidden md:grid grid-cols-3 gap-16 mx-20 mb-10'>
                    {plans.map((plan, index) => (
                        <div key={index} className={`flex flex-col p-5 border border-gray-300 shadow-md rounded-lg space-y-3 ${index % 2 === 0 ? '' : 'bg-blue-50'}`}>
                            <h1 className='text-3xl mb-4'>{plan.name}</h1>
                            <p>{plan.description}</p>
                            <div className='flex flex-row items-center gap-5'>
                                <div className='line-through text-xl'>₹{plan.old_price}</div>
                                <div className='px-1 py-0.5 bg-green-100 text-green-600 rounded-2xl text-xs'>{Math.round(((plan.old_price - plan.price) / plan.old_price) * 100)}% off</div>
                            </div>
                            <h1 className='text-4xl'>₹{plan.price}</h1>
                            {state && stateselect && (
                                <div className='text-[#333] text-lg font-medium'>
                                    + ₹{stateselect.fee} to be paid later
                                </div>
                            )}

                            {plan.emi === 1 && (
                                <div>EMI option available</div>
                            )}

                            <div className='px-3 py-5 border-y border-gray-300'>
                                <h1 className='text-sm'>{plan.benefits.title}</h1>
                                <p className='text-xs'>{plan.benefits.brief}</p>
                            </div>

                            <button type='submit' className={` text-black border border-gray-300 p-3 rounded-lg text-lg ${index % 2 === 0 ? '' : 'bg-[#FBA61F] text-white'} `}>Get Started</button>
                            <div>
                                <h1 className='text-2xl my-5'>What you'll get</h1>
                                <ul className='space-y-1'>
                                    {plan.features.map((feature, id) => (
                                        <li key={id} className='flex items-start gap-2 text-lg leading-relaxed'>
                                            <HiOutlineCheck size={20} className='text-green-600 mt-1 min-w-[20px] flex-shrink-0' />
                                            <div>{feature}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='md:hidden w-full flex flex-col items-center space-y-5'>
                    <h1 className='text-lg text-center'>Select your plan</h1>
                    <select name="mobplan" id="mobplan" value={mobileplan} onChange={(e) => setMobilePlan(e.target.value)} className="w-max md:w-fit p-2 border border-gray-300 rounded-md">
                        <option value="" disabled hidden>-- Select Plan --</option>
                        {plans.map((plan, index) => (
                            <option key={index} value={plan.name}>
                                {plan.name}
                            </option>
                        ))}
                    </select>

                    {mobileplan && (
                        <div className="w-full">
                            {plans.filter(plan => plan.name === mobileplan).map((plan) => (
                                    <div key={plan.id} className="flex flex-col p-5 border border-gray-300 shadow-md rounded-lg space-y-3">
                                        <h1 className='text-2xl mb-2'>{plan.name}</h1>
                                        <p>{plan.description}</p>
                                        <div className='flex flex-row items-center gap-3'>
                                            <div className='line-through text-lg'>₹{plan.old_price}</div>
                                            <div className='px-1 py-0.5 bg-green-100 text-green-600 rounded-2xl text-xs'>
                                                {Math.round(((plan.old_price - plan.price) / plan.old_price) * 100)}% off
                                            </div>
                                        </div>
                                        <h1 className='text-3xl'>₹{plan.price}</h1>
                                        {state && stateselect && (
                                            <div className='text-[#333] text-md font-medium'>
                                                + ₹{stateselect.fee} to be paid later
                                            </div>
                                        )}
                                        {plan.emi === 1 && (
                                            <div className='text-[#333] text-base font-medium'>EMI option available</div>
                                        )}
                                        <div className='px-3 py-5 border-y border-gray-300'>
                                            <h1 className='text-sm'>{plan.benefits.title}</h1>
                                            <p className='text-xs'>{plan.benefits.brief}</p>
                                        </div>
                                        <button type='submit' className='text-white bg-[#FBA61F] border border-gray-300 p-3 rounded-lg text-lg'>Get Started</button>
                                        <div>
                                            <h1 className='text-xl my-4'>What you'll get</h1>
                                            <ul className='space-y-1'>
                                                {plan.features.map((feature, id) => (
                                                    <li key={id} className='flex items-start gap-2 text-base leading-relaxed'>
                                                        <HiOutlineCheck size={18} className='text-green-600 mt-1 min-w-[20px] flex-shrink-0' />
                                                        <div>{feature}</div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )}

                </div>

            </div>
        </>
    )
}
