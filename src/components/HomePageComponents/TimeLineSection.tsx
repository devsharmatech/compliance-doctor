"use client";

import { useGetServiceTypesQuery } from "@/store/api-services/service-api";
import { IService } from "@/types/services";
import { useRouter } from "next/navigation";
import './timeline.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { OverlayLoader } from "../ui";

export default function TimelineSection() {
  const { data, isLoading, isError, error } = useGetServiceTypesQuery({ limit: 100, page: 1 });
  const timelineData: IService[] = data?.filter((item: IService) => item.isActive && item.type !== "startup") || [];
  const router = useRouter();

  if (isLoading) return <OverlayLoader />;
  if (isError) {
    console.error("Blogs API error:", error);
    return <div className="text-red-500 text-center py-4">Failed to load services.</div>;
  }

  return (
    <section className="relative w-full px-4 md:px-12 -mt-32 z-10">
      <div className="relative">
        {/* Navigation Buttons - Left & Right */}
        <button className="timeline-prev-btn absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-20 bg-blue-700 hover:bg-blue-800 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <button className="timeline-next-btn absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-20 bg-blue-700 hover:bg-blue-800 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            prevEl: '.timeline-prev-btn',
            nextEl: '.timeline-next-btn'
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.3,
            },
            768: {
              slidesPerView: 2.2,
            },
            1024: {
              slidesPerView: 2.5,
            },
            1280: {
              slidesPerView: 3.5,
            },
            1440: {
              slidesPerView: 4,
            },
            1536: {
              slidesPerView: 4.5,
            },
          }}
          className="w-full timeline-swiper py-8"
        >
          {timelineData.map((service) => (
            <SwiperSlide key={service._id} className="group h-full py-8" style={{ boxShadow: 'none' }}>
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col transform hover:-translate-y-2 border border-blue-50 min-h-96">
                {/* Timeline Indicator */}
                <div className="relative">
                  <div className="absolute -left-2 top-8 w-4 h-4 bg-blue-700 rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="absolute -left-1 top-8 w-2 h-2 bg-white rounded-full z-20"></div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 sm:p-5 h-full">
                  {/* Icon with gradient background */}
                  <div className="icon-bg-gradient bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center w-14 h-14 mb-6 shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-300 line-clamp-2">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <div className="flex-1 mb-6">
                    <p className="text-gray-600 leading-relaxed line-clamp-4">
                      {service.description.split(" ").slice(0, 20).join(" ") + "..."}
                    </p>
                  </div>

                  {/* Button */}
                  <button 
                    className="group/btn bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg w-full flex items-center justify-center space-x-2 mt-auto"
                    onClick={() => router.push(`/services?service=${service.name}`)}
                  >
                    <span>View More</span>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 17 12" 
                      fill="none" 
                      className="transform group-hover/btn:translate-x-1 transition-transform duration-300"
                    >
                      <path 
                        fillRule="evenodd" 
                        clipRule="evenodd" 
                        d="M10.2004 0.347041C10.4626 0.0848404 10.8877 0.0848404 11.1499 0.347041L15.9469 5.14409C16.279 5.47621 16.279 6.01469 15.9469 6.34681L11.1499 11.1439C10.8877 11.4061 10.4626 11.4061 10.2004 11.1439C9.93815 10.8817 9.93815 10.4565 10.2004 10.1943L13.9778 6.41686H1.27541C0.904603 6.41686 0.604004 6.11626 0.604004 5.74545C0.604004 5.37464 0.904603 5.07404 1.27541 5.07404H13.9778L10.2004 1.29655C9.93815 1.03435 9.93815 0.609242 10.2004 0.347041Z" 
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}