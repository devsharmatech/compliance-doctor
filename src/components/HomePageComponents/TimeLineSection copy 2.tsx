// app/components/TimelineSection.tsx
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
    <section className="relative w-full px-4 md:px-12">

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        // pagination={{false}}
        // pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1.3,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        className="w-full max-w-full">
        {timelineData.map((service) => (
          <SwiperSlide key={service._id} className="h-auto bg-white p-6 sm:p-8 ">
            <section className="flex flex-col my-auto min-h-60">
              {/* Icon */}
              <div className="rounded-1xl icon-bg flex items-center justify-center mb-6 sm:mb-6">
                <svg
                  className="w-8 h-8 text-[#ffffff]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
                </svg>
              </div>

              {/* Title */}
              <h3 className=" text-[20px] font-semibold mb-3">
                {service.name}
              </h3>

              {/* Description */}
              <p className="text-[14px] leading-relaxed">
                {service.description.split(" ").slice(0, 15).join(" ") + "..."}
              </p>
             

            </section>
            <div className="service-footer">
             <button className=" py-2 w-full button-footer rounded transition"
                onClick={() => {
                  router.push(`/services?service=${service.name}`);
                }}>
                 
                View More
                
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2004 0.347041C10.4626 0.0848404 10.8877 0.0848404 11.1499 0.347041L15.9469 5.14409C16.279 5.47621 16.279 6.01469 15.9469 6.34681L11.1499 11.1439C10.8877 11.4061 10.4626 11.4061 10.2004 11.1439C9.93815 10.8817 9.93815 10.4565 10.2004 10.1943L13.9778 6.41686H1.27541C0.904603 6.41686 0.604004 6.11626 0.604004 5.74545C0.604004 5.37464 0.904603 5.07404 1.27541 5.07404H13.9778L10.2004 1.29655C9.93815 1.03435 9.93815 0.609242 10.2004 0.347041Z" fill="#08080C"/>
                </svg>

             
              </button>
             
              </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}
