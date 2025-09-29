'use client';

import Image from 'next/image';
import { OverlayLoader } from '../ui';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Blog, BlogSection } from "@/types/Blog";
import { useGetBlogsQuery } from '@/store/api-services/blog-api';
import { useRouter } from "next/navigation";
import taxImage from '@public/images/tax.webp'


export default function Banners() {

  const { data, isLoading, isError, error } = useGetBlogsQuery();
  const blogsdata: Blog[] = data?.filter((item: Blog) => item.isActive) || [];
  const router = useRouter();

  if (isLoading) return <OverlayLoader />;
  if (isError) {
    console.error("Blogs API error:", error);
    return <div className="text-red-500 text-center py-4">Failed to load blogs.</div>;
  }

  return (

    <section className='px-6 md:px-16 py-12 w-full'>

      <div className="mx-auto text-center our-features">
        <p className=" mb-4">Blogs</p>
        <h2> Discover ours latest blog today</h2>
      </div>

      <div className='flex justify-center mt-10'>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          // pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1.2,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            },

          }}
          className="w-full max-w-full h-[400px]">

          {blogsdata.map((blogs) => (
            <SwiperSlide key={blogs.url} className="h-auto rounded-xl bg-white max-sm:p-10 sm:p-8">
              <div className='flex flex-col justify-center items-center my-auto'>
                <div className='flex justify-center h-24 w-40 md:h-32'>
                  <Image
                    src={blogs.image || taxImage}
                    width={200}
                    height={200}
                    alt="blog"
                    className='rounded-lg'
                  />
                </div>

                <div className='mt-4 text-center sm:text-left'>
                  <h1 className='font-bold text-xl md:text-3xl'>{blogs.title}</h1>
                </div>
                <div className='flex justify-center text-center mt-5'>
                  <p className='text-sm sm:text-base text-[#333] line-clamp-3'>{blogs.description}</p>
                </div>
              
              </div>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>

    </section>

  );
}
