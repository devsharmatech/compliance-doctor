import React, { useState } from "react";
import ContactForm from '../ContactUsComponents/ContactForm';
import { ImQuotesRight } from "react-icons/im";
import { FaMobileScreen } from "react-icons/fa6";
import { BiCheckDouble } from "react-icons/bi";
import { AiFillSound } from "react-icons/ai";
import { FaPaintRoller } from "react-icons/fa";
import { LuBox } from "react-icons/lu";
import { BsBookmarkCheck } from "react-icons/bs";
import { SlBadge } from "react-icons/sl";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdStickyNote2 } from "react-icons/md";
import FaqSection from "./FaqSection";

const tabs = [
  "Overview",
  "Characteristics",
  "Benefits",
  "Documents Required",
  "Registration Process",
  "Compliance",
  "Why Choose Us",
];

const sections = [
  "Exclusive Rights",
  "Legal Security",
  "Brand Visibility",
  "Business Valuation",
  "National Coverage",
  "Consumer Confidence",
];

interface ContentSection {
  title: string;
  content: string;
}

interface AdvantageSection {
  title: string;
  image?: string;
  content: string;
}

interface TabsProps {
  service: {
    contentSections: ContentSection[];
  };
  advantageSections?: AdvantageSection[];
  faqs?: {
    question: string;
    answer: string;
  }[];
}

const Tabs: React.FC<TabsProps> = ({ service, advantageSections ,faqs}) => {
  const { contentSections } = service;
  debugger
  console.log("Content Sections:", advantageSections);

  const [activeTab, setActiveTab] = useState(contentSections[0]?.title || "");
  const [activeIndex, setActiveIndex] = useState(1);
  const [activeStep, setActiveStep] = useState(0);

  const toggleStep = (index: number) => {
    setActiveStep(index === activeStep ? -1 : index);
  };

  return (
    <>
      <section>
        <div className="w-full border-b shadow-sm bg-white">
          <nav className="flex justify-around space-x-2 py-4">
            {contentSections.map((section) => (
              <button
                key={section.title}
                onClick={() => setActiveTab(section.title)}
                className={`relative font-medium text-sm sm:text-base transition-colors duration-200 cursor-pointer px-4 py-1 ${activeTab === section.title
                  ? "text-orange-500"
                  : "text-gray-700 hover:text-[#f28c00]"
                  }`}
              >
                {section.title}
                {activeTab === section.title && (
                  <span className="absolute left-0 -bottom-1 w-full h-1 bg-orange-500 rounded-full"></span>
                )}
              </button>
            ))}
          </nav>
        </div>
        {/* Active Tab Content */}


      </section>
      <section>
        <div className="p-6 bg-white">
          {contentSections.map((section) =>
            section.title === activeTab ? (
              <div
                key={section.title}
                className="prose max-w-full"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            ) : null
          )}
        </div>
        <div className='flex flex-row'>

          <div className='min-h-screen'>
            {/* <div className='flex flex-col gap-6 p-6 pt-10 pb-5' id='overview'>
              <h1 className='text-2xl text-[#00457C]'>What is Trademark Registration?</h1>
              <p className='text-[#333]'>
                Unlock the secret to unbeatable brand protection and watch your business soar with trademark registration! Your secret weapon against competitors and copycats, protecting the brand’s unique identity with legal firepower. With a registered trademark, you gain exclusive rights to use your brand name, logo, or tagline, along with legal backing to take action against imitators or infringers. Whether you're a startup or an established business, trademark registration builds credibility, strengthens brand value, and protects your online and offline presence. With Doctor compliance’s expert guidance and simple pricing, safeguarding your brand has never been easier.
              </p>
              <h1 className='text-xl text-black'>Types of Trademark Registration in India : Which is Right For You?</h1>
              <p className='text-[#333]'>
                The trademark registration process in India accommodates various types of marks, each serving different aspects of brand identity. Understanding these options helps you choose the right protection strategy for your business's unique needs. Here are the main types of trademark registration available:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                <div className="flex flex-col items-center w-52 h-48 border border-gray-200 justify-center bg-white rounded-xl shadow-xs">
                  <div className="w-20 h-20 m-4 rounded-full bg-[#00457C] flex items-center justify-center">
                    <ImQuotesRight className='text-2xl text-white' />
                  </div>
                  <h2 className="text-lg font-semibold text-[#00457C]">Word Marks</h2>
                </div>

                <div className="flex flex-col items-center w-52 h-48 border border-gray-200 justify-center bg-white rounded-xl shadow-xs">
                  <div className="w-20 h-20 m-4 rounded-full bg-[#00457C] flex items-center justify-center">
                    <FaMobileScreen className='text-2xl text-white' />
                  </div>
                  <h2 className="text-lg font-semibold text-[#00457C] text-center">Device Marks</h2>
                </div>

                <div className="flex flex-col items-center w-52 h-48 border border-gray-200 justify-center bg-white rounded-xl shadow-xs">
                  <div className="w-20 h-20 m-4 rounded-full bg-[#00457C] flex items-center justify-center">
                    <BiCheckDouble className='text-2xl text-white' />
                  </div>
                  <h2 className="text-lg font-semibold text-[#00457C]">Combined Marks</h2>
                </div>

                <div className="flex flex-col items-center w-52 h-48 border border-gray-200 justify-center bg-white rounded-xl shadow-xs">
                  <div className="w-20 h-20 m-4 rounded-full bg-[#00457C] flex items-center justify-center">
                    <AiFillSound className='text-2xl text-white' />
                  </div>
                  <h2 className="text-lg font-semibold text-[#00457C]">Sound Marks</h2>
                </div>

                <div className="flex flex-col items-center w-52 h-48 border border-gray-200 justify-center bg-white rounded-xl shadow-xs">
                  <div className="w-20 h-20 m-4 rounded-full bg-[#00457C] flex items-center justify-center">
                    <FaPaintRoller className='text-2xl text-white' />
                  </div>
                  <h2 className="text-lg font-semibold text-[#00457C]">Color Marks</h2>
                </div>

                <div className="flex flex-col items-center w-52 h-48 border border-gray-200 justify-center bg-white rounded-xl shadow-xs">
                  <div className="w-20 h-20 m-4 rounded-full bg-[#00457C] flex items-center justify-center">
                    <LuBox className='text-2xl text-white' />
                  </div>
                  <h2 className="text-lg font-semibold text-[#00457C]">Shape Marks</h2>
                </div>

                <div className="flex flex-col items-center w-52 h-48 border border-gray-200 justify-center bg-white rounded-xl shadow-xs">
                  <div className="w-20 h-20 m-4 rounded-full bg-[#00457C] flex items-center justify-center">
                    <BsBookmarkCheck className='text-2xl text-white' />
                  </div>
                  <h2 className="text-lg font-semibold text-[#00457C]">Collective Marks</h2>
                </div>

                <div className="flex flex-col items-center w-52 h-48 border border-gray-200 justify-center bg-white rounded-xl shadow-xs">
                  <div className="w-20 h-20 m-4 rounded-full bg-[#00457C] flex items-center justify-center">
                    <SlBadge className='text-4xl text-white' />
                  </div>
                  <h2 className="text-lg font-semibold text-[#00457C] text-center">Certification Marks</h2>
                </div>
              </div>
              <p className='text-[#333]'>
                Still confused? Get in touch with an expert Trademark Registration Consultant and receive answers to all your queries instantly for free.
              </p>
            </div>

            <div className='flex flex-col gap-6 p-6 pt-10 pb-5' id='Characteristics'>
              <h1 className='text-2xl text-[#00457C]'>Characteristics of Trademark Registration</h1>
              <p className='text-[#333]'>
                Here are five defining characteristics of a trademark registration process that every business owner should know:
              </p>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5 p-5'>
                <div className="flex flex-col w-sm h-max border border-gray-300 bg-white rounded-xl shadow-xs p-5">
                  <div className='flex flex-row'>
                    <MdStickyNote2 className='text-3xl text-[#00457C] mr-2' />
                    <h1 className='text-lg mb-3'>Distinctiveness</h1>
                  </div>
                  <p className='flex justify-self-center text-md text-[#333]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore accusantium a, itaque non pariatur repudiandae mollitia animi qui nam, distinctio dolore corporis consectetur doloremque voluptatem. Aperiam nihil nesciunt quo officia.</p>
                </div>
                <div className="flex flex-col w-sm h-max border border-gray-300 bg-white rounded-xl shadow-xs p-5">
                  <div className='flex flex-row'>
                    <MdStickyNote2 className='text-3xl text-[#00457C] mr-2' />
                    <h1 className='text-lg mb-3'>Distinctiveness</h1>
                  </div>
                  <p className='flex justify-self-center text-md text-[#333]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore accusantium a, itaque non pariatur repudiandae mollitia animi qui nam, distinctio dolore corporis consectetur doloremque voluptatem. Aperiam nihil nesciunt quo officia.</p>
                </div>
                <div className="flex flex-col w-sm h-max border border-gray-300 bg-white rounded-xl shadow-xs p-5">
                  <div className='flex flex-row'>
                    <MdStickyNote2 className='text-3xl text-[#00457C] mr-2' />
                    <h1 className='text-lg mb-3'>Distinctiveness</h1>
                  </div>
                  <p className='flex justify-self-center text-md text-[#333]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore accusantium a, itaque non pariatur repudiandae mollitia animi qui nam, distinctio dolore corporis consectetur doloremque voluptatem. Aperiam nihil nesciunt quo officia.</p>
                </div>
                <div className="flex flex-col w-sm h-max border border-gray-300 bg-white rounded-xl shadow-xs p-5">
                  <div className='flex flex-row'>
                    <MdStickyNote2 className='text-3xl text-[#00457C] mr-2' />
                    <h1 className='text-lg mb-3'>Distinctiveness</h1>
                  </div>
                  <p className='flex justify-self-center text-md text-[#333]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore accusantium a, itaque non pariatur repudiandae mollitia animi qui nam, distinctio dolore corporis consectetur doloremque voluptatem. Aperiam nihil nesciunt quo officia.</p>
                </div>
                <div className="flex flex-col w-sm h-max border border-gray-300 bg-white rounded-xl shadow-xs p-5">
                  <div className='flex flex-row'>
                    <MdStickyNote2 className='text-3xl text-[#00457C] mr-2' />
                    <h1 className='text-lg mb-3'>Distinctiveness</h1>
                  </div>
                  <p className='flex justify-self-center text-md text-[#333]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore accusantium a, itaque non pariatur repudiandae mollitia animi qui nam, distinctio dolore corporis consectetur doloremque voluptatem. Aperiam nihil nesciunt quo officia.</p>
                </div>
              </div>
              <p className='text-[#333]'>
                Understanding these characteristics is crucial for successful trademark registration and protection in India.
              </p>
            </div> */}

            <div className="flex flex-col gap-6 p-6 pt-10 pb-5" id="Benefits">
              <h1 className="text-2xl text-[#00457C]">What are the Advantages ?</h1>
              <p className="text-[#333]">Here's why you should choose us for your business sense:</p>

              <div className="flex flex-col border-2 border-gray-200 md:flex-row rounded-md shadow-xs overflow-hidden">
                {/* Sidebar */}
                <div className="bg-[#f2f2f2] p-6 w-max">
                  <ul className="space-y-4">
                    {advantageSections.map((section, index) => (
                      <li
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`flex justify-start px-3 py-1 cursor-pointer font-medium ${index === activeIndex
                          ? "text-white bg-[#f28c00]"
                          : "text-black hover:text-[#00457C]"
                          }`}
                      >
                        {index + 1}. {section.title}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <h2 className="text-2xl font-bold text-black mb-6">
                    {advantageSections[activeIndex]?.title}
                  </h2>
                  <div
                    className="text-[#333] space-y-4 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: advantageSections[activeIndex]?.content || "" }}
                  />
                </div>
              </div>
            </div>

            {/* <div className='flex flex-col gap-6 p-6 pt-10 pb-5' id='Registration Process'>
              <h1 className='text-2xl text-[#00457C]'>How to Register for Trademark—Step-by-Step Guide</h1>
              <p className='text-[#333]'>
                With your application and supporting documents ready, here's the step-by-step pathway to successful trademark registration in India:
              </p>
              <div className="relative flex flex-col gap-4">
                <div className="absolute top-5 left-6 bottom-0 w-px bg-gray-200 z-0" />

                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`relative bg-white rounded-md shadow-sm z-10 transition-all duration-300 ${activeStep === index ? "ring-1 ring-[#00457C]" : ""
                      }`}
                  >
                    <div className="absolute -left-2 top-4 z-20">
                      <div
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${index <= activeStep
                          ? "bg-[#00457C]"
                          : "bg-gray-300 text-gray-600"
                          }`}
                      >
                        {index + 1}
                      </div>
                    </div>

                    <button
                      onClick={() => toggleStep(index)}
                      className="w-full flex justify-between items-center px-12 py-4 text-left"
                    >
                      <h3
                        className={`font-semibold text-base ${index <= activeStep ? "text-slate-800" : "text-gray-500"
                          }`}
                      >
                        {step.title}
                      </h3>
                      <span className="text-lg font-bold text-gray-400">
                        {activeStep === index ? "^" : "v"}
                      </span>
                    </button>

                    {activeStep === index && step.description && (
                      <div className="bg-gray-50 px-12 py-4 text-[#333] text-sm leading-relaxed border-t border-gray-200">
                        {step.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div> */}
           <FaqSection faqs={faqs} />

            {/* <div className='flex flex-col gap-6 p-6 pt-10 pb-5' id='Compliance'>
              <h1 className='text-2xl text-[#00457C]'>Keeping Your Trademark Registration Legally Sound</h1>
              <p className='text-[#333]'>
                A trademark can be revoked due to non-use, fraud, confusion with existing trademarks, or public interest concerns, as follows:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {revocationReasons.map((reason, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-gray-200 shadow-xs p-6 text-center flex flex-col items-center gap-4"
                  >
                    <h3 className="text-lg font-semibold text-slate-800">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-[#333] leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-6 p-6 pt-10 pb-5' id='Why Choose Us'>
              <h1 className='text-2xl text-[#00457C]'>Why Choose Doctor compliance For Trademark Registration in India?</h1>
              <p className='text-[#333]'>
                Thinking about registering your trademark and wondering why Doctor compliance could be your ideal partner? Here's why thousands of businesses trust us with their trademark registration process in India:
              </p>
              <div className="max-w-4xl mt-5">
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3 text-[#333]">
                      <FaRegCircleCheck className="text-[#f28c00] mt-1 w-5 h-5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className='text-[#333]'>
                Don't wait until it's too late. Register your trademark with Doctor compliance today and safeguard your brand's future.
              </p>
              <button className='bg-[#f28c00] text-white p-2 shadow-2xl rounded-2xl w-fit px-3 cursor-pointer hover:bg-amber-500'>Contact Us</button>
            </div> */}
          </div>

          <div className='p-10 w-auto'>
            <div className='flex justify-center items-center sticky my-10 top-40 border-2 border-black w-96 h-96 rounded-4xl p-5'>
              <div className='md:w-80'>
                <ContactForm />
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Tabs;
