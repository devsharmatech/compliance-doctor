'use client';
import ""
import { useState, useMemo } from 'react';
import { useGetServicesQuery } from '@/store/api-services/service-api';
import { OverlayLoader } from '../ui'; // Optional loader component

type ServiceItem = {
  _id: string;
  name: string;
  description: string;
  category?: string;
  icon?: string;
  ctaLabel?: string;
};

export default function Services() {
  const { data, isLoading, isError, error } = useGetServicesQuery({ limit: 100, page: 1 });

  const groupedData: Record<string, ServiceItem[]> = useMemo(() => {
    const groups: Record<string, ServiceItem[]> = {};
    if (data) {
      data
        .filter((item: any) => item.isActive)
        .forEach((item: ServiceItem) => {
          const category = item.category || 'Others';
          if (!groups[category]) groups[category] = [];
          groups[category].push(item);
        });
    }
    return groups;
  }, [data]);

  const limitedGroupedData = useMemo(() => {
    const groups: Record<string, ServiceItem[]> = {};
    const categoriesAdded = new Set<string>();
  
    if (data) {
      data
        .filter((item: any) => item.isActive)
        .forEach((item: ServiceItem) => {
          const category = item.category || 'Others';
          if (categoriesAdded.size < 4 || groups[category]) {
            if (!groups[category]) {
              groups[category] = [];
              categoriesAdded.add(category);
            }
            groups[category].push(item);
          }
        });
    }
  
    return groups;
  }, [data]);
  
  const tabs = Object.keys(limitedGroupedData);
  const [activeTab, setActiveTab] = useState(tabs[0] || '');

  if (isLoading) return <OverlayLoader />;
  if (isError) {
    console.error("Services API error:", error);
    return <div className="text-red-500 text-center py-4">Failed to load services.</div>;
  }

  return (
    <section className="w-full bg-[#F9FAFB] py-24 px-4 md:px-12">

      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-[#425D87] text-[40px] font-semibold leading-tight mb-4">
          Our Services
        </h2>
        <p className="text-[#333] text-[16px] leading-relaxed max-w-2xl mx-auto">
          Explore our tailored service offerings by category.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center flex-wrap gap-x-8 gap-y-4 mb-8 border-b border-[#CBD5E1]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-4 text-[16px] font-semibold ${
              activeTab === tab ? 'text-[#111827]' : 'text-[#6B7280]'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#111827] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {limitedGroupedData[activeTab]?.map((item) => (
          <div
            key={item._id}
            className="bg-[#E7EBEF] p-6 rounded-2xl text-center"
          >
            <h3 className="text-[#0F172A] text-[18px] font-bold mb-4">
              {item.name}
            </h3>
            <p className="text-[#333] text-[14px] leading-relaxed mb-4">
              {item.description}
            </p>
            {item.ctaLabel && (
              <button className="mt-auto bg-[#425D87] text-white py-2 px-4 rounded-lg text-sm">
                {item.ctaLabel}
              </button>
            )}
          </div>
        ))}
      </div>

    </section>
  );
}
