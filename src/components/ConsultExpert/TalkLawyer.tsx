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
import { GoLaw } from "react-icons/go";
import { FaHandcuffs } from "react-icons/fa6";
import { MdCorporateFare } from "react-icons/md";
import { FaComputer } from "react-icons/fa6";
import { TbBusinessplan } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { IoNewspaperOutline } from "react-icons/io5";
import { GiBrain } from "react-icons/gi";
import { MdWorkOutline } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import TalkIPForm from './TalkIPForm';
import ExpertiseTabs from './Expertise';
import FaqSection from '../ServicePageComponent/FaqSection';
import StepProcess from './component/StepProcess';
import UpdateBox from './component/UpdateBox';
import Image from 'next/image';
import { IoArrowForwardOutline } from "react-icons/io5";

// import Pricing from './Pricing';

const expertiseData = [
    {
        "title": "Civil Law",
        "content": [
            "Property and ownership disputes",
            "Breach of contract",
            "Recovery of money or damages",
            "Landlord-tenant issues",
            "Inheritance and succession conflicts"
        ]
    },
    {
        "title": "Criminal Law",
        "content": [
            "Filing or quashing of FIRs",
            "Bail applications (anticipatory or regular)",
            "Representation in criminal trials",
            "Cybercrime or online fraud",
            "White-collar crime (e.g., embezzlement, forgery)"
        ]
    },
    {
        "title": "Corporate Law",
        "content": [
            "Shareholder or partnership disputes",
            "Commercial agreement disputes",
            "Corporate restructuring",
            "Legal risk assessment and mitigation",
            "Due diligence and compliance audits"
        ]
    },
    {
        "title": "Company Law Matters",
        "content": [
            "Company incorporation or dissolution",
            "Drafting board resolutions and shareholder agreements",
            "ROC filings and statutory compliance",
            "Managing director-related legalities",
            "Share transfer and capital restructuring"
        ]
    },
    {
        "title": "Family Law",
        "content": [
            "Divorce and judicial separation",
            "Child custody and visitation rights",
            "Domestic violence cases",
            "Adoption and guardianship",
            "Maintenance and alimony"
        ]
    },
    {
        "title": "Divorce Law",
        "content": [
            "Mutual consent or contested divorce",
            "Division of joint assets",
            "Spousal support (alimony)",
            "Child custody and support arrangements",
            "Legal representation in family court"
        ]
    },
    {
        "title": "Intellectual Property (IP) Law",
        "content": [
            "Trademark, copyright, and patent registration",
            "IP infringement litigation",
            "Drafting IP licensing and transfer agreements",
            "IP valuation and audit"
        ]
    },
    {
        "title": "Labour & Employment Law",
        "content": [
            "Wrongful termination and severance disputes",
            "Wage disputes and bonus claims",
            "Workplace harassment complaints",
            "Drafting and reviewing employment agreements",
            "Labour compliance audits"
        ]
    },
    {
        "title": "Cyber Law",
        "content": [
            "Cyber fraud, identity theft, and phishing",
            "Online harassment and cyberbullying",
            "Data breach and misuse of digital content",
            "Filing complaints under the IT Act"
        ]
    },
    {
        "title": "Legal Notices",
        "content": [
            "Drafting demand notices",
            "Replying to received notices",
            "Pre-litigation negotiations",
            "Notices related to defamation, contract breaches, consumer disputes"
        ]
    }
]


const faqData = [
    {
        question: "What types of legal issues can I discuss with a lawyer?",
        answer: "You can consult on matters related to family disputes, property issues, business contracts, criminal concerns, and more.",
    },
    {
        question: "How do I book a legal consultation?",
        answer: "To book a consultation, fill out the form, select your preferred time slot, and confirm the booking.",
    },
    {
        question: "Is the consultation online or in person?",
        answer: "All consultations are conducted online through a secure video or phone call unless otherwise specified.",
    },
    {
        question: "How long does each consultation last?",
        answer: "Each session typically lasts between 20 to 30 minutes, depending on the complexity of your issue.",
    },
    {
        question: "Can I consult a lawyer in my preferred language?",
        answer: "Yes, you can select your preferred language while booking the consultation to ensure smooth communication.",
    },
    {
        question: "Will I receive a legal opinion after the session?",
        answer: "Yes, you may request a written summary or legal opinion after your consultation is complete.",
    },
    {
        question: "What happens if I miss my scheduled consultation?",
        answer: "If you miss your consultation, you can request a reschedule within 24 hours, subject to availability.",
    },
    {
        question: "Are my details and discussions kept confidential?",
        answer: "Yes, all consultations are fully confidential and your personal details are never shared.",
    },
    {
        question: "Can I cancel my consultation after booking?",
        answer: "You can cancel your consultation up to 2 hours before the scheduled time for a full refund.",
    },
    {
        question: "How do I follow up with the same lawyer?",
        answer: "If needed, you can request a follow-up consultation with the same lawyer via your booking dashboard.",
    }
];


const laws = [
    {
        name: "Civil Law",
        icon: <GoLaw />,
        overview: "Civil law governs disputes between individuals, organizations, or both, where compensation may be awarded to the victim.",
        issues: [
            "Property and ownership disputes",
            "Breach of contract",
            "Recovery of money or damages",
            "Landlord-tenant issues",
            "Inheritance and succession conflicts"
        ],
        need: "Individuals dealing with neighbor, land, or lease disputes; Small businesses recovering dues from clients."
    },
    {
        name: "Criminal Law",
        icon: <FaHandcuffs />,
        overview: "Criminal law involves prosecution by the government of a person for an act classified as a crime.",
        issues: [
            "Filing or quashing of FIRs",
            "Bail applications (anticipatory or regular)",
            "Representation in criminal trials",
            "Cybercrime or online fraud",
            "White-collar crime (e.g., embezzlement, forgery)"
        ],
        need: "Individuals facing criminal charges; Victims of crime seeking justice."
    },
    {
        name: "Corporate Law",
        icon: <MdCorporateFare />,
        overview: "Corporate law addresses legal issues affecting businesses and commercial entities.",
        issues: [
            "Shareholder or partnership disputes",
            "Commercial agreement disputes",
            "Corporate restructuring",
            "Legal risk assessment and mitigation",
            "Due diligence and compliance audits"
        ],
        need: "Business owners, corporate managers, and board members; Startups facing internal conflicts or investment concerns."
    },
    {
        name: "Company Law Matters",
        icon: <TbBusinessplan />,
        overview: "Company law ensures compliance with the Companies Act and other regulatory obligations required of Indian businesses.",
        issues: [
            "Company incorporation or dissolution",
            "Drafting board resolutions and shareholder agreements",
            "ROC filings and statutory compliance",
            "Managing director-related legalities",
            "Share transfer and capital restructuring"
        ],
        need: "Entrepreneurs starting or modifying a company; Company Secretaries or Directors ensuring compliance."
    },
    {
        name: "Family Law",
        icon: <IoHomeOutline />,
        overview: "Family law deals with domestic issues and familial relationships.",
        issues: [
            "Divorce and judicial separation",
            "Child custody and visitation rights",
            "Domestic violence cases",
            "Adoption and guardianship",
            "Maintenance and alimony"
        ],
        need: "Spouses going through separation; Parents seeking custody or support; Individuals seeking protection under family laws."
    },
    {
        name: "Divorce Law",
        icon: <IoNewspaperOutline />,
        overview: "Divorce law provides legal frameworks for dissolving a marriage and related financial or custodial matters.",
        issues: [
            "Mutual consent or contested divorce",
            "Division of joint assets",
            "Spousal support (alimony)",
            "Child custody and support arrangements",
            "Legal representation in family court"
        ],
        need: "Spouses ending their marriage; Individuals requiring legal clarity on separation."
    },
    {
        name: "Intellectual Property (IP) Law",
        icon: <GiBrain />,
        overview: "IP law protects the rights of creators over their inventions, designs, trademarks, and artistic works.",
        issues: [
            "Trademark, copyright, and patent registration",
            "IP infringement litigation",
            "Drafting IP licensing and transfer agreements",
            "IP valuation and audit"
        ],
        need: "Individuals dealing with neighbor, land, or lease disputes; Small businesses recovering dues from clients"
    },
    {
        name: "Labour & Employment Law",
        icon: <MdWorkOutline />,
        overview: "Labour law governs the rights and responsibilities of employers and employees in the workplace.",
        issues: [
            "Wrongful termination and severance disputes",
            "Wage disputes and bonus claims",
            "Workplace harassment complaints",
            "Drafting and reviewing employment agreements",
            "Labour compliance audits"
        ],
        need: "Employees facing unfair treatment; Employers needing HR legal structure or dispute resolution."
    },
    {
        name: "Cyber Law",
        icon: <FaComputer />,
        overview: "Cyber law addresses issues arising from the use of the internet, digital platforms, and electronic devices.",
        issues: [
            "Cyber fraud, identity theft, and phishing",
            "Online harassment and cyberbullying",
            "Data breach and misuse of digital content",
            "Filing complaints under the IT Act"
        ],
        need: "Victims of online abuse or fraud; Businesses handling sensitive data or user privacy."
    },
    {
        name: "Legal Notices",
        icon: <GrNotes />,
        overview: "A legal notice is a formal communication sent by a party to assert a legal claim or warn before legal action.",
        issues: [
            "Drafting demand noticest",
            "Replying to received notices",
            "Pre-litigation negotiations",
            "Notices related to defamation, contract breaches, consumer disputes"
        ],
        need: "Individuals or businesses initiating formal legal proceedings; Recipients of notices seeking legal response."
    }
]

export default function TalkLawyer() {

    const [showpopup, setshowpopup] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showMobileMenu, setShowMobileMenu] = useState<number | null>(null);

    return (
        <>
            <div className='mt-10'>
                <div className='flex flex-col md:flex-row gap-7 md:gap-5 px-10 md:px-12 mt-20 mb-28'>
                    <div className='flex justify-center items-center md:w-1/2'>
                        <div className='md:w-[528px] md:h-[273px]'>
                            <h1 className='text-[36px] font-semibold text-[#326EE6] text-center'>Talk to a Lawyer</h1>
                            <div className='mt-5'>
                                <p className='text-[#161C2D]'>
                                    Compliance Doctor connects individuals and businesses with expert legal professionals across India. Whether you are dealing with a personal matter, corporate issue, or legal compliance, our consultation service helps you speak directly with specialized lawyers — fast, securely, and conveniently.
                                </p>
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
                    <div className='flex flex-col md:flex-row justify-center items-center gap-1 mt-10'>
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
                    <div className="px-24">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={1}
                            slidesPerView={4}
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
                            {laws.map((law, index) => (
                                <SwiperSlide key={index} className='flex justify-center p-5 w-full md:w-[291px] h-[301px] cursor-pointer'>
                                    <div className='flex flex-col'>
                                        <div className='pb-3'>
                                            <div className='bg-[#326EE6] p-2 w-fit rounded-full'>
                                                <div className='text-white text-[20px]'>{law.icon}</div>
                                            </div>
                                            <p className='text-sm mt-3 px-2'>{law.name}</p>
                                        </div>
                                        <div className='px-2'>
                                            <p className='line-clamp-3'>{law.issues}</p>
                                        </div>
                                        <div className='flex flex-row justify-between px-2 pt-7'>
                                            <button onClick={() => { setActiveIndex(index); setshowpopup(true); setShowMobileMenu(index); }}>View More</button>
                                            <IoArrowForwardOutline className='text-[20px]'/>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}

                            {/* {showpopup && (

                                <>

                                    <div className='fixed inset-0 bg-black/30 backdrop-blur-md z-50 hidden md:flex items-center justify-center'>
                                        <div className="bg-white rounded-2xl w-10/12 h-[650px] border-2 border-gray-300 shadow-md ">
                                            <div className='flex flex-row justify-between p-5 mb-5'>
                                                <h1 className='text-3xl'>Select your Category</h1>
                                                <div>
                                                    <button onClick={() => setshowpopup(false)}><IoClose className="text-black text-2xl hover:text-red-500" /></button>
                                                </div>
                                            </div>
                                            <div className='flex flex-row'>
                                                <div className='border-r min-w-fit border-gray-300'>
                                                    <ul className="pt-2">
                                                        {laws.map((law, index) => (
                                                            <li key={index}>
                                                                <button onClick={() => setActiveIndex(index)} className={`flex flex-row items-center px-5 py-3 w-full text-left cursor-pointer ${activeIndex === index ? "bg-sky-100" : "bg-white"}`}>
                                                                    <div className='mr-4 text-sm'>{law.icon}</div>
                                                                    {law.name}
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className='p-5 w-full'>
                                                    <ul>
                                                        {laws[activeIndex].issues.map((issue, i) => (
                                                            <li key={i} className='border-b border-gray-300 px-5 py-5'>{issue}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-baseline-last justify-center md:hidden'>
                                        <div className='bg-white w-full min-h-[84%] max-h-[84%] rounded-t-3xl px-5 overflow-y-auto'>
                                            <div className='flex justify-between items-center flex-row py-5'>
                                                <h1 className='text-2xl'>Select your Category</h1>
                                                <button onClick={() => setshowpopup(false)}><IoClose className="text-black text-3xl hover:text-red-500" /></button>
                                            </div>
                                            <div>
                                                <ul className='text-black'>
                                                    {laws.map((law, id) => (
                                                        <li key={id}>
                                                            <button onClick={() => { setActiveIndex(id); setShowMobileMenu(showMobileMenu === id ? null : id); }} className='flex flex-row justify-between border-b border-gray-300 py-2 items-center w-full cursor-pointer'>
                                                                <div className='flex flex-row gap-5 items-center'>
                                                                    <div className='text-3xl'>{law.icon}</div>
                                                                    <div className='text-base'>{law.name}</div>
                                                                </div>
                                                                <div><IoIosArrowDown className={`flex justify-end transition-transform duration-300 ${showMobileMenu === id ? 'rotate-180' : ''}`} /></div>
                                                            </button>

                                                            {showMobileMenu === id && (
                                                                <ul className='text-black pl-15'>
                                                                    {law.issues.map((issue, i) => (
                                                                        <li key={i} className='p-2'>
                                                                            <div className='text-sm'>{issue}</div>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}

                                                        </li>
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

                <div className='bg-[#EFF4FA]'>
                    <FaqSection faqs={faqData} />
                </div>
                
                
                {/* <div>
                    <Pricing/>
                </div> */}

            </div>
        </>
    )
}
