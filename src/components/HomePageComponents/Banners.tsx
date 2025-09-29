'use client';

import Image from 'next/image';
import { OverlayLoader } from '../ui';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Blog, BlogSection } from "@/types/Blog";
import { useGetBlogsQuery } from '@/store/api-services/blog-api';
import { useRouter } from "next/navigation";
import taxImage from '@public/images/tax.webp';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';

export default function Banners() {
  const { data, isLoading, isError, error } = useGetBlogsQuery();
  const blogsdata: Blog[] = data?.filter((item: Blog) => item.isActive) || [];
  const router = useRouter();

  // Function to remove HTML tags from description
  const stripHtmlTags = (html: string) => {
    if (typeof html !== 'string') return html;
    return html.replace(/<[^>]*>/g, '');
  };

  if (isLoading) return <OverlayLoader />;
  if (isError) {
    console.error("Blogs API error:", error);
    return <div className="text-red-500 text-center py-4">Failed to load blogs.</div>;
  }

  return (
    <section className='px-4 md:px-8 lg:px-16 py-12 lg:py-20 w-full bg-gradient-to-br from-blue-50 to-blue-100'>
      {/* Header Section */}
      <div className="mx-auto text-center mb-12 lg:mb-16">
        <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
          Latest Updates
        </span>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Discover Our <span className="text-blue-700">Latest Blogs</span> Today
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Stay informed with our expert insights and latest news in the industry
        </p>
      </div>

      {/* Swiper Container */}
      <div className='relative'>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active !bg-blue-500',
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="w-full h-auto"
        >
          {blogsdata.map((blog,i) => (
            <SwiperSlide key={blog.url+i} className="h-auto pb-12" style={{ boxShadow: 'none' }}>
              <div 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col cursor-pointer transform hover:-translate-y-2"
                onClick={() => router.push(blog.url || '#')}
              >
                {/* Image Container */}
                <div className='relative h-48 md:h-56 overflow-hidden'>
                  <Image
                    src={blog.image || taxImage}
                    alt={blog.title}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div className='flex-1 p-6 md:p-8 flex flex-col'>
                  {/* Date */}
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    { new Date().toLocaleDateString()}
                  </div>
                  
                  {/* Title */}
                  <h3 className='font-bold text-xl md:text-2xl text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors'>
                    {blog.title}
                  </h3>
                  
                  {/* Description - with HTML tags removed */}
                  <p className='text-gray-600 text-base leading-relaxed mb-4 line-clamp-3 flex-1'>
                    {stripHtmlTags(blog.description)}
                  </p>
                  
                  {/* Read More Button */}
                  <div className="flex items-center text-blue-600 font-semibold mt-auto pt-4 group-hover:text-blue-700 transition-colors">
                    Read More
                    <ArrowRight className="w-4 text-blue-700 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons with Icons */}
        <button className="custom-prev absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center group">
          <ChevronLeft className="w-6 h-6 text-blue-700 group-hover:scale-110 transition-transform" />
        </button>
        
        <button className="custom-next absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center group">
          <ChevronRight className="w-6 h-6 text-blue-700 group-hover:scale-110 transition-transform" />
        </button>
        
        {/* Custom Pagination */}
        <div className="swiper-pagination !bottom-0 mt-8"></div>
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <button className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          View All Blogs
          <ArrowRight className="w-5 h-5 ml-2 text-blue-700" />
        </button>
      </div>
    </section>
  );
}