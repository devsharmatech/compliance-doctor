'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IService } from '@/types/services';
import ServiceModal from '@/components/modals/service-modal'; // adjust path as needed
import { useSubmitFormMutation } from '@/store/api-services/form-submission-api';
import "./startup-services.css";

const serviceTypes = [
  {

  }
];

interface StartupServicesProps {
  data?: IService[];
  isLoading?: boolean;
  isError?: boolean;
}

function cleanHtml(html: string = ''): string {
  return html
    .replace(/<!--StartFragment-->/g, '')
    .replace(/<!--EndFragment-->/g, '')
    .replace(/<\/?(html|body)[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
export default function StartupServices({ data, isLoading, isError }: StartupServicesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service') || '';

  const [showModal, setShowModal] = useState(false);
  const [submitForm] = useSubmitFormMutation();

  // Filter active services only
  const activeServices = useMemo(() => data?.filter(service => service.isActive) || [], [data]);

  // Group services by category
  const groupedByCategory: Record<string, IService[]> = useMemo(() => {
    const groups: Record<string, IService[]> = {};
    activeServices.forEach(service => {
      const cat = service.category?.name || 'Others';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(service);
    });
    return groups;
  }, [activeServices]);

  const categories = useMemo(() => Object.keys(groupedByCategory), [groupedByCategory]);

  // Set initial active category (first category or empty string)
  const [activeCategory, setActiveCategory] = useState<string>('');

  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory(categories.includes(serviceParam) ? serviceParam : categories[0]);
    }
  }, [categories, serviceParam]);

  // Active service - first service from active category
  const activeService = useMemo(() => {
    if (activeCategory && groupedByCategory[activeCategory]) {
      return groupedByCategory[activeCategory][0];
    }
    return undefined;
  }, [activeCategory, groupedByCategory]);

  // Form submit handler
  const handleSubmit = (formData: Partial<IService>) => {
    if (!activeService) return;
    submitForm({ data: formData, serviceId: activeService._id, type: 'service' });
    setShowModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-500 text-lg">
        Loading services...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-20 text-red-600 text-lg">
        Failed to load services. Please try again later.
      </div>
    );
  }

  if (activeServices.length === 0) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-600 text-lg">
        No active services available at the moment.
      </div>
    );
  }

  return (
    <section className="py-16 px-12 bg-white w-full relative">
      <h2 className="text-4xl font-bold text-center mb-12">
        {serviceParam ? `${serviceParam} Services` : 'Our Services'}
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Categories */}
        <nav className="flex flex-col items-start justify-start w-full md:w-1/4 border border-gray-200 overflow-hidden shadow-xs left-button-tab">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`block w-full text-left px-5 py-3 text-lg font-medium transition-colors
                ${
                  activeCategory === category
                    ? 'bg-[#022B55] text-white shadow-lg hover:bg-blue-800'
                    : 'bg-white hover:bg-gray-100 hover:shadow-md text-gray-700'
                }
              `}
              aria-current={activeCategory === category ? 'page' : undefined}
            >
              {category}
            </button>
          ))}
        </nav>

        {/* Right: Service Details */}
        <div className="w-full md:w-3/4 bg-white border border-gray-200 shadow-xs p-8 relative min-h-[320px]">
          {activeService ? (
            <>
              <h3 className="text-2xl text-[#022B55] font-bold mb-4">{activeService.name}</h3>
              {/* <p className="text-black text-lg mb-6 whitespace-pre-line">{activeService.description}</p>
               */}
                <div
        className="text-lg text-justify md:text-left text-gray-800 [&>*]:mt-0 [&>*]:mb-2"
        dangerouslySetInnerHTML={{ __html: cleanHtml(activeService.description || '') }}
      />

              {/* Buttons */}
              <div className="flex gap-4 absolute bottom-6 right-6">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-6 py-2 w-fit bg-[#022B55] text-white shadow-md shadow-gray-200 hover:bg-blue-900 hover:shadow-2xl transition"
                  aria-label="Subscribe to service"
                >
                  Subscribe Now
                </button>
                <button
                  onClick={() => {
                    
                    if (activeService.slug) {
                      router.push(`/services/${activeService.slug}`);
                    }
                  }}
                  className="px-6 py-2 w-fit bg-white border border-gray-300 text-[#022B55] shadow-md shadow-gray-200 hover:bg-gray-500 hover:text-gray-50 hover:shadow-2xl transition"
                  aria-label="View more about service"
                >
                  View More
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Select a category to see details</p>
          )}
        </div>
      </div>

      {/* Service Modal */}
      {showModal && activeService && (
        <ServiceModal
          service={activeService}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
}
