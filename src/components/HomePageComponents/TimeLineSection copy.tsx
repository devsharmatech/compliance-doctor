// app/components/TimelineSection.tsx
"use client";

import { useEffect, useState } from "react";

import './timeline.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
type TimelineItem = {
  id: number;
  title: string;
  description: string;
  btntext: string,
};

export default function TimelineSection() {
  const [timelineData, setTimelineData] = useState<TimelineItem[]>([]);

  useEffect(() => {
    // Simulating API call
    const fetchTimelineData = async () => {
      const data: TimelineItem[] = [
        {
          id: 1,
          title: "Startup Services",

          description: "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.",
          btntext: "View More",
        },
        {
          id: 2,
          title: "Registrations",
          description: "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.",
          btntext: "View More",
        },
        {
          id: 3,
          title: "TradeMark Services",
          description: "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.",
          btntext: "View More",
        },
        {
          id: 4,
          title: "Good and services Tax (GST)",
          description: "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.",
          btntext: "View More",
        },

         {
          id: 5,
          title: "Good and services Tax (GST)",
          description: "Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.",
          btntext: "View More",
        },
      ];
      console.log("Fetched Data:", data);
      setTimelineData(data);
    };

    fetchTimelineData();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // shows 1 at a time
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768, // for tablets and below
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="w-full px-4">

      {/* Heading */}
      {/* <div className="text-center mb-20">
        <h2 className="text-[32px] md:text-[40px] font-semibold leading-tight text-[#425D87] mb-4">
          Join us a simple
        </h2>
        <p className="text-[#1F2937] text-[16px] leading-relaxed max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        </p>
      </div> */}

      {/* Timeline items */}
      {/* <div className="">
        
      </div> */}
      <Swiper 
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
          
        }}
        className="w-full max-w-full">
        {timelineData.map((item) => (
          <SwiperSlide key={item.id} className="!h-auto rounded-xl  bg-white p-8 border border-gray-200">
          <section  className=" flex flex-col items-center text-center">
            {/* Icon */}
            <div className="w-20 h-20 bg-[#00457C] rounded-2xl flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-[#ffffff]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-[#333333] text-[20px] font-semibold mb-3">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-[#333333] text-[14px] leading-relaxed max-w-[280px]">
              {item.description}
            </p>
            <button className="mt-4 bg-[#00457C] text-white px-4 py-2 rounded hover:bg-[#00355f] transition">
              {item.btntext}
            </button>

          </section>
          </SwiperSlide>
        ))}
      </Swiper> 

    </section>
  );
}
