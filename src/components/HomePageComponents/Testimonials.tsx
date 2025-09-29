"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft, FaStar } from "react-icons/fa";
import Image from "next/image";
import { useGetTestimonialsQuery } from "@/store/api-services/testimonial-api";
import { useState } from "react";

export default function TestimonialSlider() {
  const {
    data: testimonials = [],
    isLoading,
    isError,
  } = useGetTestimonialsQuery({});
  const [expandedCards, setExpandedCards] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleReadMore = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getTruncatedText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-20 bg-red-50 rounded-lg mx-4">
        <div className="text-red-500 text-lg font-semibold">
          Failed to load testimonials.
        </div>
        <p className="text-gray-600 mt-2">Please try refreshing the page</p>
      </div>
    );

  return (
    <section className="relative px-4 sm:px-6 lg:px-20 py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-blue-100 w-full overflow-visible">
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-300 rounded-full opacity-10"></div>

      <div className="relative z-10 max-w-8xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <FaQuoteLeft className="mr-2 text-blue-600" />
            Testimonials
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Trusted by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-800">
              Thousands
            </span>{" "}
            of Happy Customers
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover why businesses choose us for their compliance and growth
            solutions
          </p>
        </div>

        {/* Swiper Container */}
        <div className="relative pb-4">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3.5 },
              1536: { slidesPerView: 4.5 },
            }}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
              renderBullet: (index, className) => {
                return `<span class="${className} bg-green-300 hover:bg-blue-700 transition-all duration-300"></span>`;
              },
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            className="!overflow-visible"
          >
            {testimonials?.map((t: any, i: number) => (
              <SwiperSlide
                key={i}
                className="!h-auto py-4"
                style={{ boxShadow: "none" }}
              >
                <div className="group relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100/50 h-full flex flex-col min-h-[320px]">
                  {/* Quote Icon */}
                  <div className="absolute -top-4 left-6 w-10 h-10 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full flex items-center justify-center shadow-lg z-20">
                    <FaQuoteLeft className="text-white text-sm" />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center mb-4 pt-2">
                    {[...Array(5)].map((_, starIndex) => (
                      <FaStar
                        key={starIndex}
                        className={`text-md ${
                          starIndex < (t.rating || 5)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-gray-600 font-semibold text-sm">
                      5.0
                    </span>
                  </div>

                  {/* Testimonial Text */}
                  <div className="flex-grow mb-4">
                    <p
                      className="text-gray-700 leading-relaxed text-sm lg:text-base"
                      style={{ marginBottom: "0" }}
                    >
                      {expandedCards[i]
                        ? `"${
                            t.message ||
                            "Excellent service! The team provided outstanding support and delivered beyond our expectations."
                          }"`
                        : `"${getTruncatedText(
                            t.message ||
                              "Excellent service! The team provided outstanding support and delivered beyond our expectations."
                          )}"`}
                    </p>

                    {/* Read More/Less Button */}
                    {(t.message?.length > 120 || !t.message) && (
                      <button
                        onClick={() => toggleReadMore(i)}
                        className="text-blue-700 hover:text-blue-800 font-medium text-sm mt-2 transition-colors duration-200"
                      >
                        {expandedCards[i] ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center justify-between pt-0 border-t border-blue-100/50 mt-auto">
                    <div className="flex items-center gap-3">
                      {/* Client Avatar */}
                      <div className="relative">
                        {t.image ? (
                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-200 shadow-sm">
                            <img
                              src={t.image}
                              alt={t.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-white font-bold text-md">
                              {t.name?.charAt(0) || "C"}
                            </span>
                          </div>
                        )}
                        {/* Online Indicator */}
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 border-2 border-white rounded-full"></div>
                      </div>

                      <div>
                        <p
                          className="font-bold text-gray-900 text-sm lg:text-base "
                          style={{ marginBottom: "0" }}
                        >
                          {t.name || "Client Name"}
                        </p>
                        <p
                          className="text-green-600 text-xs font-medium "
                          style={{ lineHeight: "1.5" }}
                        >
                          Bought home in London
                        </p>
                      </div>
                    </div>

                    {/* Verified Badge */}
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Verified
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-green-200/0 group-hover:border-green-300/30 transition-all duration-300 pointer-events-none"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination */}
          <div className="custom-pagination flex justify-center gap-2 mt-8" />

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              className="swiper-button-prev group w-10 h-10 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 bg-white hover:bg-blue-600 hover:border-blue-600"
              aria-label="Previous testimonial"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              className="swiper-button-next group w-10 h-10 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 bg-white  hover:bg-blue-600 hover:border-blue-600"
              aria-label="Next testimonial"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
