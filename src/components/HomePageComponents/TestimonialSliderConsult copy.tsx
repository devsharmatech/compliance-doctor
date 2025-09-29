'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useGetTestimonialsQuery } from '@/store/api-services/testimonial-api';

export default function TestimonialSliderConsult() {  
  const { data: testimonials = [], isLoading, isError } = useGetTestimonialsQuery({});

  if (isLoading) return <div className="text-center py-10">Loading testimonials...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Failed to load testimonials.</div>;

  return (
    <section className=" text-center w-full">
      <div className='mx-auto text-center our-features'>
        <p>Testimonials</p>
        <h2>Trusted by Thousands of Happy Customers</h2>
      </div>

      <div className="relative overflow-hidden">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}   // ✅ always 1 slide
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className="pb-16"
        >
          {testimonials?.map((t: any, i: number) => (
            <SwiperSlide key={i}>
              <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-sm text-left h-full">
                <p className="text-sm text-gray-700 px-8">{t.message}</p>
                <div className="flex items-center justify-between px-8 mb-4">
                  <div className="flex items-center gap-3">
                    {t.image ? (
                      <img
                        src={t.image}
                        alt={t.name}
                        className="rounded-full object-cover w-10 h-10"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-300 rounded-full" />
                    )}
                    <div className='rating-location'>
                      <p className="font-semibold text-[#1e3a8a]">{t.name}</p>
                      <p className="text-sm text-[#60a5fa]">Bought home in London</p>
                    </div>
                  </div>
                  <span className="text-green-600 font-semibold flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M7.61958 1.17082C7.73932 0.802297 8.26068 0.802296 8.38042 1.17082L9.93082 5.94245C9.98437 6.10726 10.138 6.21885 10.3112 6.21885H15.3284C15.7159 6.21885 15.877 6.71469 15.5635 6.94245L11.5046 9.89149C11.3644 9.99334 11.3057 10.1739 11.3592 10.3387L12.9096 15.1103C13.0294 15.4789 12.6076 15.7853 12.2941 15.5575L8.23511 12.6085C8.09492 12.5067 7.90508 12.5067 7.76489 12.6085L3.70589 15.5575C3.39241 15.7853 2.97061 15.4789 3.09036 15.1103L4.64075 10.3387C4.6943 10.1739 4.63564 9.99334 4.49544 9.89149L0.436451 6.94245C0.122966 6.71469 0.284076 6.21885 0.671565 6.21885H5.68876C5.86205 6.21885 6.01563 6.10726 6.06918 5.94245L7.61958 1.17082Z" fill="#FFAD1B"/>
                    </svg>
                    <span>5.0</span>
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Arrows */}
        <div className="flex items-center">
          <button className="swiper-button-prev text-[#1f2937] p-2 rounded-full border border-gray-300 hover:bg-gray-200">
            <FaArrowLeft size={16} />
          </button>
          <button className="swiper-button-next text-[#1f2937] p-2 rounded-full border border-gray-300 hover:bg-gray-200">
            <FaArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
