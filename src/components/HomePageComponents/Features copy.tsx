'use client';

import Image from 'next/image';
import { FaTags, FaHeadset } from 'react-icons/fa';
import TaxImage from "@public/images/tax.webp";
import { useGetFeaturesQuery } from '@/store/api-services/feature-api';
import { OverlayLoader } from '../ui';
import { JSX } from 'react';

const ICONS_MAP: Record<string, JSX.Element> = {
  headset: <FaHeadset className="text-white text-lg" />,
  tag: <FaTags className="text-white text-lg" />,
};

export default function FeatureWithImageSection() {
  // 
  const { data, isLoading, isError, error } = useGetFeaturesQuery({ limit: 10, page: 1 });

  if (isLoading) return <OverlayLoader />;
  if (isError) {
    console.error("Feature API error:", error);
    return <div className="text-red-500 text-center py-4">Failed to load features.</div>;
  }

  const features = data|| [];

  return (
    <section className="bg-[#f8f9fb] px-6 md:px-16 py-12  w-full">
    <div className="our-features-parent">
      <div className="mx-auto text-center our-features">
        <p className=" text-[#00457C] mb-4">
          {data?.sectionTitle || "Our Features"}
        </p>
        <h2 className="max-w-2xl mx-auto leading-relaxed">
          {data?.sectionSubtitle || "Explore what makes us different."}
        </h2>
      </div>
     
       <div className="w-full flex flex-wrap gap-x-10 gap-y-6 mt-6 md:mt-0">
          {features.map((item: any, index: number) => (
            <div key={index} className="flex items-start gap-5 basis-full md:basis-[calc(50%-20px)]">
              <div className="icon-bg">
                {ICONS_MAP[item.iconName?.toLowerCase()] || <FaTags className="text-white text-lg" />}
              </div>
              <div>
                <h4 className=" mb-1">{item.title}</h4>
                <p className=" leading-snug">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      
      <div className="mt-12 flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mx-auto">
        {/* Left Image */}
        <div className="w-full">
          <div className="w-full bg-[#a8b3c4] rounded-xl overflow-hidden">
            <Image src={TaxImage} alt="Tax-feature" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right Features */}
       
      </div>
    </div>
    </section>
  );
}
