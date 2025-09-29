"use client";

import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { AiOutlineMinus } from "react-icons/ai";

interface FAQ {
  question: string;
  answer: string; // This will contain HTML string from JoditEditor
}

interface FaqSectionProps {
  faqs: FAQ[];
}

export default function FaqSection({ faqs }: FaqSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="flex flex-col gap-6 py-10" id="FaqSection">

      <div className='flex flex-col items-center text-center text-[#326EE6] font-semibold text-[22px] mb-10'>
        Frequently Asked Questions?
        <h1 className='text-[#0A2252] text-[22px] px-5 md:px-0 md:text-[36px] md:w-[1108px]'>Here are some commonly asked questions to help you better understand the trademark registration process.</h1>
      </div>

      <div className="flex justify-center">
        <div className="relative flex flex-col justify-center items-center gap-4 bg-white p-5 w-fit advantage">

          {faqs?.map((faq, index) => (
            <div
              key={index}
              className={`relative rounded-md md:w-[1088px] shadow-sm transition-all duration-300 ${activeIndex === index ? "bg-[#0A2252]" : "bg-[#FAFAFA]"
                }`}
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex justify-between items-center px-12 py-4 text-left"
              >
                <h3
                  className={`font-semibold ${index === activeIndex ? "text-white text-[22px]" : "text-gray-500 text-[16px]"
                    }`}
                >
                  {faq.question}
                </h3>
                <span className="text-lg font-bold text-gray-400">
                  {activeIndex === index ? <AiOutlineMinus /> : <IoAddOutline />}
                </span>
              </button>

              {activeIndex === index && faq.answer && (
                <div
                  className="px-12 py-4 text-white text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
