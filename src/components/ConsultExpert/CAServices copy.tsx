'use client';

import React from 'react'

import { useState } from 'react';
import Form from './Form';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IoClose } from "react-icons/io5";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { MdOutlineAccountBalance } from "react-icons/md";
import { TbTax } from "react-icons/tb";
import { TbReportSearch } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const caservices = [
    {
        title: "Business Consultation",
        icon: <LuBriefcaseBusiness />,
        subservices: [
            {
                name: "Business Advisory and Financial Planning",
                overview: "Strategic financial guidance to support business growth and sustainability.",
                services: [
                    "Financial forecasting and budgeting",
                    "Business performance analysis",
                    "Investment and funding advisory",
                    "Risk management strategies"
                ],
                ideal: "Entrepreneurs and companies aiming to optimize financial performance"
            },
            {
                name: "Startup Services",
                overview: "Support for startups from structuring to financial planning and compliance.",
                services: [
                    "Business structuring and incorporation",
                    "Financial modeling and projections",
                    "Investor pitch deck preparation",
                    "Startup India registration assistance"
                ],
                ideal: "New entrepreneurs and startups seeking funding and strategic growth"
            },
            {
                name: "Virtual CFO Services",
                overview: "Strategic financial guidance to support business growth and sustainability.",
                services: [
                    "Financial strategy development",
                    "Cash flow management",
                    "Financial reporting and analysis",
                    "Liaison with investors and stakeholders"
                ],
                ideal: "Entrepreneurs and companies aiming to optimize financial performance"
            }
        ]
    },
    {
        title: "Accounting and Taxation",
        icon: <MdOutlineAccountBalance />,
        subservices: [
            {
                name: "Accounting and Bookkeeping",
                overview: "Accurate financial record-keeping for informed decision-making.",
                services: [
                    "Regular bookkeeping services",
                    "Preparation of financial statements",
                    "Accounts payable/receivable management",
                    "Bank reconciliations"
                ],
                ideal: "SMEs and startups seeking organized financials"
            },
            {
                name: "Goods and Services Tax (GST) Services",
                overview: "Goods and Services Tax (GST) Services",
                services: [
                    "GST registration",
                    "Monthly, quarterly, and annual return filing",
                    "GST compliance and advisory",
                    "GST audits and assessments"
                ],
                ideal: "Businesses needing comprehensive GST support"
            },
            {
                name: "Payroll Management",
                overview: "Efficient processing of salaries and statutory deductions.",
                services: [
                    "Salary computation and disbursement",
                    "PF and ESI filings",
                    "TDS deductions and filings",
                    "Payslip generation and payroll reports"
                ],
                ideal: "Organizations aiming for compliant payroll systems"
            },
            {
                name: "International Taxation and Compliance",
                overview: "Expertise in cross-border transactions and international standards.",
                services: [
                    "Transfer pricing documentation",
                    "Double taxation avoidance advisory",
                    "IFRS compliance",
                    "Foreign remittance assistance"
                ],
                ideal: "Companies with international operations"
            }
        ]
    },
    {
        title: "Income Tax Returns",
        icon: <TbTax />,
        subservices: [
            {
                name: "Income Tax Services",
                overview: "Ensure timely and accurate income tax compliance.",
                services: [
                    "ITR filing for individuals and businesses",
                    "Tax planning and advisory",
                    "Handling tax notices and assessments"
                ],
                ideal: "Taxpayers and businesses seeking expert tax filing"
            }
        ]
    },
    {
        title: "CA Certifications",
        icon: <TbReportSearch />,
        subservices: [
            {
                name: "Audit and Assurance Services",
                overview: "Independent audits to ensure financial integrity and legal compliance.",
                services: [
                    "Statutory audits",
                    "Internal audits",
                    "Tax audits",
                    "Compliance audits"
                ],
                ideal: "Companies requiring audit certifications and improved governance."
            },
            {
                name: "Company Compliance and Regulatory Filings",
                overview: "Meet regulatory obligations for corporate governance and legal operation.",
                services: [
                    "Annual return filing",
                    "Statutory register maintenance",
                    "Companies Act compliance",
                    "Board meetings and resolutions support"
                ],
                ideal: "Private limited companies and LLPs ensuring legal standing"
            }
        ]
    }
]

export default function CAServices() {

    const [showpopup, setshowpopup] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeSubIndex, setActiveSubIndex] = useState(0);
    const [showsub, setshowsub] = useState<number | null>(null);

    return (
        <>
            <div className='p-12 space-y-10'>
                <h1 className='text-4xl font-bold text-[#00457C] text-center md:text-left'>CA Services</h1>
                <div>
                    <h3 className='text-lg justify-center text-justify md:text-left'>
                        Compliance Doctor offers a wide range of Chartered Accountant (CA) services through an online-first model, providing individuals, startups, and businesses with access to expert financial and compliance solutions. Below is the structured overview of services, categorized for clarity.                    </h3>
                </div>
                <div className='flex flex-col md:flex-row gap-2.5'>
                    <div className='flex flex-col justify-center w-auto md:w-1/2'>
                        <div className='flex flex-col gap-3 md:p-10 mb-10 md:mb-2'>
                            <h1 className='text-2xl md:text-3xl text-[#00457C] text-center md:text-left'>50,00+ <span className='text-black'>Business registered</span></h1>
                            <h3 className='text-lg md:text-xl mt-3 text-center md:text-left'>10% of all Indian businesses register with us</h3>
                            <ul className='flex flex-col md:block list-disc mt-8 space-y-6'>
                                <li>
                                    <h1 className='text-md'>Company registration in under 7-14 days</h1>
                                    <h5 className='text-xs'>Expand your business without having to wait</h5>
                                </li>
                                <li>
                                    <h1 className='text-md'>24 x 7 expert support</h1>
                                    <h5 className='text-xs'>Minimize challenges and maximize productivity</h5>
                                </li>
                                <li>
                                    <h1 className='text-md'>100% online process</h1>
                                    <h5 className='text-xs'>Start business from the comfort of your home</h5>
                                </li>
                            </ul>
                        </div>
                        <div className='flex flex-col justify-center mt-3 md:block'>
                            <div>
                                <h1 className='text-3xl text-center md:text-left font-bold text-[#00457C]'>Our Legal Expertise</h1>
                            </div>
                            <div className="w-full">
                                <Swiper
                                    modules={[Navigation, Pagination, Autoplay]}
                                    spaceBetween={30}
                                    slidesPerView={3.25}
                                    slidesPerGroup={1}
                                    navigation
                                    breakpoints={{
                                        320: { slidesPerView: 1 },
                                        640: { slidesPerView: 2 },
                                        1024: { slidesPerView: 3 },
                                        1280: { slidesPerView: 4 },
                                    }}
                                    loop={true}
                                >
                                    {caservices.map((service, index) => (
                                        <SwiperSlide key={index}>
                                            <button onClick={() => { setActiveIndex(index); setActiveSubIndex(0); setshowpopup(true); }} className='justify-center items-center m-10 border border-gray-200 rounded-xl p-5 shadow w-[180px] h-[160px] cursor-pointer'>
                                                <div className='flex flex-col my-auto'>
                                                    <div className='flex justify-center text-5xl'>{service.icon}</div>
                                                    <h1 className='text-xl mt-3'>{service.title}</h1>
                                                </div>
                                            </button>
                                        </SwiperSlide>
                                    ))}

                                    {showpopup && (
                                        <div className='fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center px-2 sm:px-4'>
                                            <div className="bg-white rounded-2xl w-full max-w-[1100px] border-2 py-5 border-gray-300 shadow-md max-h-[90vh] overflow-y-auto">
                                                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6'>
                                                    <h1 className='text-2xl sm:text-3xl font-semibold text-[#00457C]'>Select your Category</h1>
                                                    <button onClick={() => setshowpopup(false)} className="mt-2 sm:mt-0 sm:ml-auto">
                                                        <IoClose className="text-black text-2xl hover:text-red-500" />
                                                    </button>
                                                </div>

                                                <div className='flex flex-col sm:flex-row'>
                                                    {/* Left Menu */}
                                                    <div className='border-t sm:border-t-0 sm:border-r border-gray-300 sm:min-w-[280px]'>
                                                        <ul className="text-base sm:text-lg text-black py-4 space-y-3 sm:space-y-5 px-4 sm:px-5">
                                                            {caservices.map((service, index) => (
                                                                <li key={index}>
                                                                    <button
                                                                        onClick={() => {
                                                                            setActiveIndex(index);
                                                                            setActiveSubIndex(0);
                                                                            setshowsub(showsub === index ? null : index);
                                                                        }}
                                                                        className={`flex flex-row items-center w-full text-left py-2 px-2 rounded-md ${activeIndex === index ? "bg-sky-100 font-semibold" : "hover:bg-sky-50"
                                                                            }`}
                                                                    >
                                                                        <div className='mr-3 text-xl'>{service.icon}</div>
                                                                        <span className="flex-1">{service.title}</span>
                                                                        {showsub === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                                                    </button>

                                                                    {showsub === index && (
                                                                        <ul className='pl-10 mt-2 space-y-2 text-sm'>
                                                                            {service.subservices.map((issue, subIdx) => (
                                                                                <li key={subIdx}>
                                                                                    <button
                                                                                        onClick={() => setActiveSubIndex(subIdx)}
                                                                                        className={`text-left block w-full px-2 py-1 rounded ${activeSubIndex === subIdx ? "bg-blue-100" : "hover:bg-gray-100"
                                                                                            }`}
                                                                                    >
                                                                                        {issue.name}
                                                                                    </button>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Right Content */}
                                                    <div className='p-4 sm:p-6 flex-1'>
                                                        <ul className='text-sm sm:text-xl text-black space-y-4'>
                                                            {caservices[activeIndex].subservices[activeSubIndex].services.map((service, idx) => (
                                                                <li key={idx} className='border-b border-gray-300 pb-3'>
                                                                    {service}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </Swiper>
                            </div>
                        </div>
                    </div>
                    <div className='w-auto md:w-1/2'>
                        <Form />
                    </div>
                </div>
            </div>
        </>
    )
}