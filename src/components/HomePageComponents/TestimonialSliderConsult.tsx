'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaArrowLeft, FaArrowRight, FaStar, FaQuoteLeft } from 'react-icons/fa';
import { useGetTestimonialsQuery } from '@/store/api-services/testimonial-api';

export default function TestimonialSliderConsult() {  
  const { data: testimonials = [], isLoading, isError } = useGetTestimonialsQuery({});

  if (isLoading) return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
    </div>
  );
  
  if (isError) return (
    <div className="text-center py-20 bg-red-50 rounded-lg mx-4">
      <div className="text-red-500 text-lg font-semibold">Failed to load testimonials</div>
      <p className="text-red-400 mt-2">Please try again later</p>
    </div>
  );

  return (
    <section className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 pb-3">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Thousands of {" "}
            <span className="text-blue-700 mt-2">Happy Customers</span>
          </h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev',
            }}
            loop={true}
            className="pb-12"
          >
            {testimonials?.map((t: any, i: number) => (
              <SwiperSlide key={i}>
                <div className="bg-white rounded-2xl shadow-xl border border-blue-200 p-8 md:p-10 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="bg-blue-700 p-4 rounded-full">
                      <FaQuoteLeft className="text-white text-xl" />
                    </div>
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed text-center italic mb-8 px-4">
                    "{t.message}"
                  </p>
                  
                  {/* User Info */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      {t.image ? (
                        <img
                          src={t.image}
                          alt={t.name}
                          className="rounded-full object-cover w-14 h-14 border-2 border-blue-700 shadow-md"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                          {t.name?.charAt(0) || 'U'}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{t.name}</p>
                        <p className="text-blue-600 font-medium">Bought home in London</p>
                      </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, starIndex) => (
                          <FaStar 
                            key={starIndex} 
                            className="text-yellow-400 text-lg" 
                            fill="currentColor"
                          />
                        ))}
                      </div>
                      <span className="font-bold text-blue-700 text-lg">5.0</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button className="custom-prev group bg-white text-blue-700 p-4 rounded-full shadow-lg border border-blue-200 hover:bg-blue-700 hover:text-white transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300">
              <FaArrowLeft size={20} />
            </button>
            <button className="custom-next group bg-white text-blue-700 p-4 rounded-full shadow-lg border border-blue-200 hover:bg-blue-700 hover:text-white transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300">
              <FaArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {testimonials?.map((_, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-full bg-blue-300 transition-all duration-300 hover:bg-blue-700 cursor-pointer"
            />
          ))}
        </div>
      </div>
    </section>
  );
}