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
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div className="custom-container">
      <div className="flex flex-col gap-6 py-10" id="FaqSection">
        <div className="text-center mb-12 lg:mb-16">
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-800">
              Questions?
            </span>
          </h3>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Here are some commonly asked questions to help you better understand.
          </p>
        </div>

        <div className="relative flex flex-col justify-center items-center gap-4 bg-white p-5 advantage">
          {faqs?.map((faq, index) => (
            <div
              key={index}
              className={`relative w-full cursor-pointer rounded-md shadow-sm transition-all duration-300 ${
                activeIndex === index ? "bg-blue-800" : "bg-gray-50 hover:bg-gray-200"
              }`}
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex justify-between items-center px-12 py-4 text-left"
              >
                <h3
                  className={`font-semibold ${
                    index === activeIndex
                      ? "text-white text-[22px]"
                      : "text-gray-500 text-[16px]"
                  }`}
                >
                  {faq.question}
                </h3>
                <span className="text-lg font-bold text-gray-800">
                  {activeIndex === index ? (
                    <AiOutlineMinus className="text-white"/>
                  ) : (
                    <IoAddOutline />
                  )}
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
