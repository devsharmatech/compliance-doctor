'use client';

import React from 'react';
import './about.css';
import { useGetAboutUsQuery } from '@/store/api-services/about-us-api';
import AboutUsImage from "@public/images/aboutus.png";
import AboutVector from "@public/images/servicehero.jpg";

const AboutPage = () => {
  const { data: about, isLoading, isError } = useGetAboutUsQuery({});

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700"></div>
    </div>
  );

  if (isError || !about) return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="text-center">
        <div className="text-blue-700 text-6xl mb-4">⚠️</div>
        <p className="text-xl text-gray-700">Failed to load About Us content.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-800 text-white py-8 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Expert Solutions for <span className="text-blue-200">Modern Business</span> Challenges
              </h1>
              <span className="text-xl md:text-2xl text-blue-100">
                Simplify Compliance. Focus on Growth.
              </span>
            </div>
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-blue-600 rounded-full flex items-center justify-center transform rotate-6">
                  <div className="w-56 h-56 md:w-72 md:h-72 bg-blue-500 rounded-full flex items-center justify-center transform -rotate-12">
                    <img
                      src={about?.bannerImage || AboutUsImage.src}
                      alt="About Us"
                      className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full transform rotate-6 shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-blue-100 rounded-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-300"></div>
                <img
                  src="/images/tax.webp"
                  alt="About our company"
                  className="relative rounded-xl shadow-lg w-full h-auto transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold text-blue-700 mb-6">
                  {about?.title}
                </h2>
                <div
                  className="text-lg md:text-xl text-gray-700 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: about?.description }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
              Why Our Clients{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-800">
                Trust Us?
              </span>
            </h3>
          </div>
          {about?.contentSections?.map((section: any, index: number) => (
            <div
              key={section._id}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20 last:mb-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
            >
              {/* Content */}
              <div className="w-full lg:w-1/2">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-700 rounded-lg mb-6">
                    <span className="text-lg font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-2xl md:text-2xl font-bold text-blue-700 mb-6">
                    {section.title}
                  </h3>
                  <div
                    className="text-gray-700 leading-relaxed space-y-4 text-lg"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>
              </div>

              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative group">
                  <div className={`absolute -inset-4 bg-blue-100 rounded-2xl transform ${index % 2 === 0 ? 'rotate-3' : '-rotate-3'
                    } group-hover:rotate-0 transition-transform duration-300`}></div>
                  <img
                    src={section.image || AboutVector.src}
                    alt={section.title}
                    className="relative rounded-xl shadow-lg w-full h-auto transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AboutPage;