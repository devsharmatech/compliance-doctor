"use client";
import React from "react";
import { FaRegClipboard, FaCalendarAlt, FaCreditCard } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";

export default function StepProcess() {
  const steps = [
    {
      step: 1,
      icon: <FaRegClipboard className="text-[24px] text-white" />,
      title: "Fill out the form",
    },
    {
      step: 2,
      icon: <FaCalendarAlt className="text-[24px] text-white" />,
      title: "Schedule an Appointment",
    },
    {
      step: 3,
      icon: <FaCreditCard className="text-[24px] text-white" />,
      title: "Make Payment",
    },
    {
      step: 4,
      icon: <FaCreditCard className="text-[24px] text-white" />,
      title: "Expert Will Call You",
    },
  ];

  return (
    <section className="py-12 px-4 text-center">
      <div className="relative flex flex-col items-center justify-center gap-3">
        {/* Dotted line */}
        {/* <div className="hidden md:block absolute top-10 left-0 right-0 border-t border-dotted border-gray-300 z-0"></div> */}



        {steps.map((step, index) => (
          <div key={index} className="flex flex-row items-center gap-5">

            <div className="flex items-center justify-center w-[32px] h-[32px] bg-[#F0F0F0] rounded-full"><FaRegCircleCheck /></div>

            <div className="flex flex-row items-center gap-5 px-5 md:w-[491px] md:h-[92px] bg-[#BABABA14] ">
              <div className={`size-12 rounded-full flex items-center justify-center bg-[#326EE6]`}>
                {step.icon}
              </div>

              <div className="flex flex-col items-start">
                <span className="text-[16px]">Step {step.step}</span>
                <span className="text-[18px] text-[#326EE6] font-medium md:w-[250px]">
                  {step.title}
                </span>
              </div>
            </div>


            {/* Vertical line for mobile */}
            {/* {index !== steps.length - 1 && (
              <div className="block w-0.5 h-10 bg-gray-300" />
            )} */}
          </div>
        ))}
      </div>
    </section>
  );
}
