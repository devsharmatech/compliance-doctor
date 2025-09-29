'use client';

import React from 'react'

import { useState } from 'react';
// import Form from './Form';
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
import TalkIPForm from './TalkIPForm';
import ExpertiseTabs from './Expertise';
import FaqSection from '../ServicePageComponent/FaqSection';
import StepProcess from './component/StepProcess';
import UpdateBox from './component/UpdateBox';
// import Pricing from './Pricing';
import Image from 'next/image';
import { IoArrowForwardOutline } from "react-icons/io5";

const expertiseData = [
    {
        "title": "Business Consultation",
        "content": [
            "Business Advisory and Financial Planning",
            "Startup Services",
            "Virtual CFO Services"
        ]
    },
    {
        "title": "Accounting and Taxation",
        "content": [
            "Accounting and Bookkeeping",
            "Goods and Services Tax (GST) Services",
            "Payroll Management",
            "International Taxation and Compliance"
        ]
    },
    {
        "title": "Income Tax Returns",
        "content": [
            "Income Tax Services"
        ]
    },
    {
        "title": "CA Certifications/Reports",
        "content": [
            "Audit and Assurance Services",
            "Company Compliance and Regulatory Filings"
        ]
    }
]

const faqData = [
    {
        question: "What types of services do your Chartered Accountants offer?",
        answer: "<p>Our CAs provide services like company registration, tax filing, GST registration, audit assistance, and financial advisory.</p>",
    },
    {
        question: "How do I consult a CA through your platform?",
        answer: "<p>You can book a consultation by selecting the service you need, choosing a preferred date and time, and confirming your appointment.</p>",
    },
    {
        question: "Can I get help with GST registration and returns?",
        answer: "<p>Yes, our CAs assist with GST registration, filing monthly/quarterly returns, and resolving GST-related notices.</p>",
    },
    {
        question: "Do you offer help with income tax filing?",
        answer: "<p>Yes, our experts can help individuals, freelancers, and businesses file accurate and timely income tax returns.</p>",
    },
    {
        question: "Is the consultation online or do I need to visit your office?",
        answer: "<p>All consultations are conducted online via call or video meeting, so you can get expert help from anywhere.</p>",
    },
    {
        question: "Can I get assistance with company or LLP registration?",
        answer: "<p>Yes, we offer end-to-end support for registering private limited companies, LLPs, and other business structures.</p>",
    },
    {
        question: "Are the CAs registered and qualified?",
        answer: "<p>All our Chartered Accountants are certified, experienced, and registered with the ICAI.</p>",
    },
    {
        question: "Will I get documents or reports after the session?",
        answer: "<p>Yes, depending on the service, you will receive necessary documents such as registration certificates, return filings, or tax reports.</p>",
    },
    {
        question: "Can I consult a CA regularly for my business?",
        answer: "<p>Yes, you can opt for regular accounting and compliance support through monthly or quarterly consultation plans.</p>",
    },
    {
        question: "Is my financial data safe and confidential?",
        answer: "<p>Absolutely. We maintain strict confidentiality and secure handling of all your financial and personal data.</p>",
    }
];


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
                    "Regular book keeping services",
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
            <div className='mt-10'>
                <div className='flex flex-col md:flex-row gap-7 md:gap-5 px-10 md:px-12 mt-20 mb-28'>
                    <div className='flex justify-center items-center md:w-1/2'>
                        <div className='md:w-[528px] md:h-[273px]'>
                            <h1 className='text-[36px] font-semibold text-[#326EE6] text-center'>CA Services</h1>
                            <div className='mt-5'>
                                <p className='text-[#161C2D]'>Compliance Doctor offers a wide range of Chartered Accountant (CA) services through an online-first model, providing individuals, startups, and businesses with access to expert financial and compliance solutions. Below is the structured overview of services, categorized for clarity.</p>
                            </div>
                            <div className='mt-5'>
                                <button className="bg-white hover:bg-[#326EE6] hover:text-white transition text-black text-[16px] font-semibold px-6 py-3 inset-shadow-sm inset-shadow-[#326EE6]  shadow-lg flex items-center registerbtn">
                                    Register Now!
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center md:w-1/2'>
                        <Image src="/images/consult.png" alt='Consultation' width={572} height={384} className='consultimg' />
                    </div>
                </div>

                <div className='bg-[#FAFAFA] p-5 md:py-20 md:px-12'>
                    <div className='flex flex-col items-center text-center text-[#326EE6] font-semibold text-[22px]'>
                        10% of all Indian businesses register with us
                        <h1 className='text-[#0A2252] text-[36px] mt-4'>50,00+ Business registered</h1>
                    </div>
                    <div className='flex flex-col md:flex-row justify-center items-center gap-5 md:gap-1 mt-10'>
                        <div className='flex justify-center items-center md:w-1/2'>
                            <div className='shadow-lg w-auto md:w-[592px] md:h-[632px] bg-white border border-gray-200 p-6 consultform'>
                                <h2 className="text-[18px] text-[#326EE6] font-semibold">Steps to Get an Online Legal Consultation</h2>
                                <div className='flex justify-center items-center'>
                                    <StepProcess />
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center items-center md:w-1/2'>
                            <TalkIPForm />
                        </div>
                    </div>
                </div>

                <div className='bg-[#EFF4FA] py-20'>
                    <div className='flex flex-col items-center pb-10 text-center text-[#326EE6] font-semibold text-[22px]'>
                        Services
                        <h1 className='text-[#0A2252] text-[36px] mt-4'>Our Legal Expertise</h1>
                    </div>
                    <div className="px-5 md:px-24">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={1}
                            slidesPerView={4}
                            slidesPerGroup={1}
                            navigation
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                640: { slidesPerView: 3 },
                                1024: { slidesPerView: 3 },
                                1280: { slidesPerView: 4 },
                            }}
                            loop={true}
                        >
                            {caservices.map((service, index) => (
                                <SwiperSlide key={index} className='flex justify-center'>
                                    <div className='flex flex-col justify-center m-10 border border-gray-200 rounded-xl p-3 shadow w-full md:w-[291px] h-[301px] cursor-pointer'>
                                        <div className='flex flex-col my-auto'>
                                            <div className='bg-[#326EE6] p-2 w-fit rounded-full'>
                                                <div className='text-white text-[20px]'>{service.icon}</div>
                                            </div>
                                            <p className='text-sm mt-3 px-2'>{service.title}</p>
                                        </div>
                                        <div className='flex flex-row justify-between px-2'>
                                            <button onClick={() => { setActiveIndex(index); setshowpopup(true); setShowMobileMenu(index); }}>View More</button>
                                            <IoArrowForwardOutline className='text-[20px]' />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}

                            {/* {showpopup && (
                                <>

                                    <div className='fixed inset-0 bg-black/30 backdrop-blur-md z-50 hidden md:flex items-center justify-center'>
                                        <div className="bg-white rounded-2xl w-10/12 border-2 pb-5 border-gray-300 shadow-md">
                                            <div className='flex flex-row justify-between p-5'>
                                                <h1 className='text-3xl'>Select your Category</h1>
                                                <div>
                                                    <button onClick={() => setshowpopup(false)}><IoClose className="text-black text-2xl hover:text-red-500" /></button>
                                                </div>
                                            </div>
                                            <div className='flex flex-row'>
                                                <div className='flex items-center border-r pr-3 min-w-fit border-gray-300'>
                                                    <ul className="pt-2 space-y-5">
                                                        {caservices.map((service, index) => (
                                                            <li key={index}>
                                                                <button onClick={() => { setActiveIndex(index); setActiveSubIndex(0); setshowsub(showsub === index ? null : index); }} className={`flex flex-row items-center px-5 py-3 w-full text-left cursor-pointer`}>
                                                                    <div className='mr-4 text-2xl'>{service.icon}</div>
                                                                    {service.title}
                                                                    <div className='ml-auto'>
                                                                        {showsub === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                                                    </div>
                                                                </button>

                                                                {showsub === index && (
                                                                    <ul className='text-sm space-y-3'>
                                                                        {service.subservices.map((issue, index) => (
                                                                            <li key={index} className='pl-20'>
                                                                                <button onClick={() => setActiveSubIndex(index)} className='cursor-pointer'>{issue.name}</button>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                )}

                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className='p-5 w-full'>
                                                    <ul>
                                                        {caservices[activeIndex].subservices[activeSubIndex].services.map((service, idx) => (
                                                            <li key={idx} className='border-b border-gray-300 px-5 py-5'>{service}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex justify-center items-center p-5 md:hidden'>
                                        <div className='bg-white rounded-2xl border border-gray-300 min-h-[90%] max-h-[90%] overflow-y-auto'>
                                            <div className='flex justify-between items-center border-b flex-row px-5 py-5'>
                                                <h1 className='text-xl'>Select your Category</h1>
                                                <button onClick={() => setshowpopup(false)}><IoClose className="text-black text-3xl hover:text-red-500" /></button>
                                            </div>
                                            <div className='border-b-2 rounded-b-3xl border-black px-5'>
                                                <ul className='pt-2 space-y-2'>
                                                    {caservices.map((service, idx) => (
                                                        <li key={idx}>
                                                            <button onClick={() => { setActiveIndex(idx); setActiveSubIndex(0); setshowsub(showsub === idx ? null : idx); }} className={`flex flex-row items-center py-3 w-full text-left cursor-pointer`}>
                                                                <div className='mr-4 text-2xl'>{service.icon}</div>
                                                                {service.title}
                                                                <div className='ml-auto'>
                                                                    {showsub === idx ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                                                </div>
                                                            </button>

                                                            {showsub === idx && (
                                                                <ul className='text-sm space-y-3 px-12'>
                                                                    {service.subservices.map((issue, index) => (
                                                                        <li key={index}>
                                                                            <button onClick={() => setActiveSubIndex(index)} className='cursor-pointer text-left'>{issue.name}</button>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}

                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className='my-4 px-5'>
                                                <ul className='text-base'>
                                                    {caservices[activeIndex].subservices[activeSubIndex].services.map((service, idx) => (
                                                        <li key={idx} className='border-b border-gray-300 py-2'>{service}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            )} */}

                        </Swiper>
                    </div>
                </div>

                <div className='bg-[#FAFAFA] px-12 py-20'>
                    <div className='flex flex-col items-center pb-10 text-center text-[#326EE6] font-semibold text-[22px]'>
                        What are theAdvantages ?
                        <h1 className='text-[#0A2252] text-[36px] mt-4'>Here's why you should choose us for your business sense:</h1>
                    </div>
                    <ExpertiseTabs tabs={expertiseData} />
                </div>

                <div className="bg-white">
                    <UpdateBox />
                </div>
                {/* <div>
                    <Pricing />
                </div> */}
                <div className='bg-[#EFF4FA]'>
                    <FaqSection faqs={faqData} />
                </div>
                
            </div >
        </>
    )
}
