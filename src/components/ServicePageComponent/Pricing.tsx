'use client';

import React from 'react'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheckCircle } from "react-icons/fa";
import toast from 'react-hot-toast';
import { FaRegHeart } from "react-icons/fa";
import { RxLightningBolt } from "react-icons/rx";
import { PiCrownSimple } from "react-icons/pi";

const plans = [
    {
        icon: <FaRegHeart />,
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
        icon: <RxLightningBolt />,
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
        icon: <PiCrownSimple />,
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

interface PricingProps {
    service: {
        name: string;
        description: string;
        bannerImage?: string;
    };
    details: {
        email: string;
        mobile: string;
        pincode: string;
    }
}

export default function Pricing({ service, details }: PricingProps) {

    const [state, setState] = useState('');
    const [mobileplan, setMobilePlan] = useState('');
    const [isYearly, setIsYearly] = useState(false);
    const stateselect = govtfee.find((s) => s.state === state);
    const router = useRouter();

    const handleGetStarted = (plan) => {
        if (!state) {
            toast.error('Please select a state to view the government fee.');
            return;
        }
        if (!details.email || !details.mobile || !details.pincode) {
            // alert('Please fill in all required details before proceeding.');
            const elemenet = document.getElementById('service-form');
            if (elemenet)
                elemenet.scrollIntoView({ behavior: "smooth" });
            else
                window.scrollTo({ top: 0, behavior: 'smooth' });
            toast.error('Please fill in all required details before proceeding.');
            return;
        }
        router.push(`/form?service=${encodeURIComponent(service.name)}&plan=${encodeURIComponent(plan.name)}&email=${details.email}&mobile=${details.mobile}&pincode=${details.pincode}`)
        // router.push(`/form?service=${encodeURIComponent(service.name)}&plan=${encodeURIComponent(mobileplan)}&state=${encodeURIComponent(state)}`);
    }
    return (
        <>
            <div className='flex flex-col items-center bg-[#FAFBFA] space-y-16 md:space-y-20 pt-10 pb-0'>

                <div className='flex flex-col items-center space-y-8 md:space-y-10'>
                    <div className='flex flex-col items-center text-center text-[#326EE6] font-semibold text-[22px]'>
                        Compliance Doctor&apos;s incorporation experts register over 1500 companies every month.
                        <h1 className='text-[#0A2252] text-[36px] mt-4'>Right Plan for Your Business</h1>
                    </div>

                    <div className='flex flex-col items-center w-[686px] h-[134px] bg-[#FFFFFF] border border-[#EDEDED] px-[24px] py-[20px] gap-5 advantage'>
                        <h1 className='text-[18px] text-[#326EE6] text-center'>Select your state to view the Government Fee</h1>
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

                <div className="relative flex flex-col items-center gap-2 mt-4">
                    <div className="flex items-center gap-4">
                        <span className='font-semibold'>Monthly</span>
                        <button
                            onClick={() => setIsYearly(!isYearly)}
                            className={`w-[48px] h-[24px] flex items-center rounded-full px-1 transition duration-300 ${isYearly ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                        >
                            <div
                                className={`bg-white w-[20px] h-[20px] rounded-full shadow-md transform transition duration-200 ${isYearly ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                            />
                        </button>
                        <span className='font-semibold'>Yearly</span>
                    </div>

                    <div className="mt-2">
                        <div className="bg-blue-600 text-white text-sm px-4 py-1 rounded-full">
                            Save 75%
                        </div>
                    </div>
                </div>

                <div className='hidden md:grid grid-cols-3 gap-10 pb-5 mx-20 mb-10'>
                    {plans.map((plan, index) => (
                        <div key={index} className={`flex flex-col w-[405px] h-[1060px] p-5 border border-[#EDEDED] shadow-md space-y-3 ${index % 2 === 0 ? 'bg-white border border-[#EDEDED]' : 'bg-[#326EE6] text-white middlebox'}`}>
                            <div className='flex items-center justify-between'>
                                <div className={`flex items-center justify-center text-black p-2 w-[40px] h-[40px] ${index % 2 === 0 ? 'bg-[#FAFBFA]' : 'bg-white'} rounded-full`}>{plan.icon}</div>
                                {index % 2 != 0 && (
                                    <div className='px-2 py-1 font-medium text-[16px] bg-white text-black registerbtn'>Best Offer</div>
                                )}
                            </div>
                            <h1 className={`text-3xl mb-4 ${index % 2 === 0 ? 'text-[#326EE6]' : 'text-white'}`}>{plan.name}</h1>
                            <span className={`${index % 2 === 0 ? 'text-black' : 'text-white'}`}>{plan.description}</span>
                            <div className='flex flex-row items-center gap-5'>
                                <div className='line-through text-xl text-[#858C93]'>₹{plan.old_price}</div>
                                <div className='px-2 py-1 bg-[#0258F8] text-white rounded-2xl text-xs'>{Math.round(((plan.old_price - plan.price) / plan.old_price) * 100)}% off</div>
                            </div>
                            <h1 className='text-4xl'>₹{plan.price}</h1>
                            {state && stateselect && (
                                <div className={`text-lg font-medium ${index % 2 === 0 ? 'text-black' : 'text-white'}`}>
                                    + ₹{stateselect.fee} to be paid later
                                </div>
                            )}

                            {plan.emi === 1 && (
                                <div>EMI option available</div>
                            )}

                            <div className='px-3 py-5 border-y border-gray-300'>
                                <h1 className='text-sm'>{plan.benefits.title}</h1>
                                <span className={`${index % 2 === 0 ? 'text-[#0C1819]' : 'text-white'}`}>{plan.benefits.brief}</span>
                            </div>

                            <div>
                                <h1 className='text-2xl my-5'>What you&apos;ll get</h1>
                                <ul className='space-y-1'>
                                    {plan.features.map((feature, id) => (
                                        <li key={id} className='flex items-start gap-2 text-lg leading-relaxed'>
                                            <FaCheckCircle size={20} className={`mt-1 min-w-[20px] flex-shrink-0 ${index % 2 === 0 ? 'text-black' : 'text-white'}`} />
                                            <div>{feature}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button onClick={() => handleGetStarted(plan)} className={`w-[200px] h-[51px] mt-5 text-black hover:cursor-pointer bg-white shadow-lg p-3 text-lg registerbtn ${index % 2 === 0 ? 'bg-greeen-custom' : ''}`}>Get Started</button>
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
                                    <button onClick={() => router.push(`/form?service=${encodeURIComponent(service.name)}&plan=${encodeURIComponent(plan.name)}`)} className='text-white bg-[#FBA61F] hover:cursor-pointer hover:text-black border border-gray-300 p-3 rounded-lg text-lg'>Get Started</button>
                                    <div>
                                        <h1 className='text-xl my-4'>What you&apos;ll get</h1>
                                        <ul className='space-y-1'>
                                            {plan.features.map((feature, id) => (
                                                <li key={id} className='flex items-start gap-2 text-base leading-relaxed'>
                                                    <FaCheckCircle size={18} className='text-green-600 mt-1 min-w-[20px] flex-shrink-0' />
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
