'use client';

import Image from 'next/image';
import { FaTags, FaHeadset, FaLightbulb, FaShieldAlt, FaRocket, FaChartLine, FaUsers, FaClock, FaSyncAlt, FaMobileAlt } from 'react-icons/fa';
import TaxImage from "@public/images/tax.webp";
import { useGetFeaturesQuery } from '@/store/api-services/feature-api';
import { OverlayLoader } from '../ui';
import { JSX } from 'react';

const ICONS_MAP: Record<string, JSX.Element> = {
  headset: <FaHeadset className="text-white text-xl" />,
  tag: <FaTags className="text-white text-xl" />,
  lightbulb: <FaLightbulb className="text-white text-xl" />,
  shield: <FaShieldAlt className="text-white text-xl" />,
  rocket: <FaRocket className="text-white text-xl" />,
  chart: <FaChartLine className="text-white text-xl" />,
  users: <FaUsers className="text-white text-xl" />,
  clock: <FaClock className="text-white text-xl" />,
  sync: <FaSyncAlt className="text-white text-xl" />,
  mobile: <FaMobileAlt className="text-white text-xl" />,
};

export default function FeatureWithImageSection() {
  const { data, isLoading, isError, error } = useGetFeaturesQuery({ limit: 10, page: 1 });

  if (isLoading) return <OverlayLoader />;
  if (isError) {
    console.error("Feature API error:", error);
    return <div className="text-red-500 text-center py-4">Failed to load features.</div>;
  }

  const features = data || [];

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-8xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <FaTags className="mr-2" />
            {data?.sectionTitle || "Our Features"}
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {data?.sectionSubtitle || "Explore What Makes Us "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-800">
              Different
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our unique approach to solving your business challenges with innovative solutions
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Features List */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {features.map((item: any, index: number) => (
                <div 
                  key={index} 
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-4 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100/50 hover:border-blue-300/50"
                >
                  {/* Hover Effect Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-400/4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex items-start flex-col space-x-4">
                    {/* Icon Container */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          {ICONS_MAP[item.iconName?.toLowerCase()] || <FaTags className="text-white text-xl" />}
                        </div>
                        {/* Pulse Animation */}
                        <div className="absolute inset-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-30 animate-ping"></div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 mt-2">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-300 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-300 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-white/60 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">99%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700">
              {/* Image Container with Gradient Overlay */}
              <div className="relative aspect-square lg:aspect-[4/2]">
                <Image 
                  src={TaxImage} 
                  alt="Tax-feature" 
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-blue-900/10"></div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-800">Trusted Partner</span>
                </div>
              </div>

              {/* Bottom Content Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Expert Solutions</h4>
                <p className="text-gray-600 text-sm mb-3">Professional tax consulting and compliance services</p>
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
            <div className="absolute -z-10 -bottom-6 -left-6 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 lg:mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 lg:p-12 text-white shadow-2xl">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-blue-800 text-lg mb-6 max-w-2xl mx-auto" style={{color:"#fff"}}>
              Join thousands of satisfied clients who trust us with their business solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}