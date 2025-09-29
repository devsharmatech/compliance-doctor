// components/ServicesList.tsx

'use client';

import { useGetServiceTypesQuery } from '@/store/api-services/service-api';
import { IService } from '@/types/services';
import { useRouter } from 'next/navigation';
import { MdDateRange } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';

export default function ServicesList() {
  const { data } = useGetServiceTypesQuery({ limit: 100, page: 1 });
  const servicesData: IService[] =
    data?.filter((item: IService) => item.isActive && item.type !== "startup") || [];
  const router = useRouter();

  return (
    <section className="py-20 px-4 bg-white text-center w-full">
      {/* Heading */}
      <h3 className="text-4xl md:text-5xl font-bold pb-10">
        <span className="text-black">Explore</span>{" "}
        <span className="text-blue-700">Our Services</span>
      </h3>

      <div className="mx-auto relative max-w-7xl">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className="pb-16"
        >
          {servicesData.map((service, i) => (
            <SwiperSlide key={service._id || i} className='py-8' style={{boxShadow:"none"}}>
              <div
                className="group bg-white h-[320px] md:h-[360px]  rounded-2xl border border-gray-200 shadow-md p-6 flex flex-col items-center justify-center hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className="bg-black group-hover:bg-white rounded-2xl p-4 w-20 h-20 flex items-center justify-center mb-6 transition-all duration-300">
                  <MdDateRange className="text-4xl text-white group-hover:text-blue-700 transition-all duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-white mb-4 transition-all duration-300">
                  {service.name}
                </h3>

                {/* Description */}
                <span className="text-sm text-gray-600 group-hover:text-white mb-6 transition-all duration-300 line-clamp-2 md:line-clamp-3">
                  {service.description}
                </span>

                {/* Button */}
                <button
                  className="mt-auto px-4 py-2 rounded-lg font-medium bg-blue-700 cursor-pointer text-white border border-blue-700 hover:bg-white hover:text-blue-800 shadow transition-all duration-300"
                  onClick={() => router.push(`/services?service=${service.name}`)}
                >
                  View More
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 px-0 md:px-0">
          <div className="custom-pagination flex gap-2" />

          <div className="flex gap-4">
            <button className="swiper-button-prev text-black p-3 rounded-full border border-gray-300 hover:bg-blue-700 hover:text-white transition">
              <FaArrowLeft size={16} />
            </button>
            <button className="swiper-button-next text-black p-3 rounded-full border border-gray-300 hover:bg-blue-700 hover:text-white transition">
              <FaArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
