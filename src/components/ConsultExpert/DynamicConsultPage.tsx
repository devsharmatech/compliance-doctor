import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import TestimonialSliderConsult from "@/components/HomePageComponents/TestimonialSliderConsult";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IoClose } from 'react-icons/io5';
import { useGetConsultsByTypeQuery } from '@/store/api-services/consultApi';
import TalkIPForm from './TalkIPForm';
import Form from './Form';
import { useGetAllPlansQuery, useGetPlanByIdQuery, useGetPlansByServiceIdAndTypeQuery } from '@/store/api-services/subscriptionPlanApi';
import Tabs from '../ServicePageComponent/tabs';
import ConsultExpertForm from '../form/ConsultExpertForm';
import { useSubmitFormMutation } from '@/store/api-services/form-submission-api';
import PricingSelector from '../ServicePageComponent/PricingSelector';

function cleanHtml(html: string = ''): string {
  return html
    .replace(/<!--StartFragment-->/g, '')
    .replace(/<!--EndFragment-->/g, '')
    .replace(/<\/?(html|body)[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function DynamicConsultTalk() {
  const [showPopup, setShowPopup] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const slug = searchParams.get('type');

  const {
    data: consults = [],
    isLoading,
    isError,
  } = useGetConsultsByTypeQuery(slug || '', { skip: !slug });


  const consult = useMemo(() => consults[0], [consults]);
  const { data: plans, isLoading: plansLoading } = useGetPlansByServiceIdAndTypeQuery({ serviceId: consult?._id, type: "Consult" }, { skip: !consult });
  const [submitForm] = useSubmitFormMutation();
  const handleGetStarted = async (data) => {

    await submitForm({
      type: 'other',
      data: data,
    }).unwrap();
    alert("Form Submitted Successfully");
    const element = document.getElementById('pricing');
    if (element)
      element.scrollIntoView({ behavior: "smooth" });
  }
  if (isLoading) {
  return (
    <div className="flex items-center justify-center p-10">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-10 h-10 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-blue-700 font-medium">Loading, please wait...</p>
      </div>
    </div>
  );
}

if (!consult || isError) {
  return (
    <div className="flex items-center justify-center p-10">
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-md max-w-md w-full text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 mx-auto mb-2 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L4.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h3 className="text-lg font-semibold">Consult type not found</h3>
        <p className="text-sm text-red-500 mt-1">
          Please check again or contact support if the issue persists.
        </p>
      </div>
    </div>
  );
}


  return (
    <>
      <div className="p-8 space-y-6 odd-section">


        <div className='custom-container'>
          <h1 className="text-2xl md:text-3xl text-center md:text-left text-blue-700 mb-4">
            {consult.title}
          </h1>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Left - Description */}
            <div className="flex flex-col w-full md:w-2/3 space-y-6">
              <div
                className="[&>*]:mt-0 [&>*]:mb-2"
                dangerouslySetInnerHTML={{ __html: cleanHtml(consult.shortDescription || '') }}
              />
              <div
                className="px-6 py-4"
                dangerouslySetInnerHTML={{ __html: cleanHtml(consult.longDescription || '') }}
              />
              <TestimonialSliderConsult />
            </div>


            <div className="w-full md:w-1/3">
              <ConsultExpertForm onSubmit={handleGetStarted} serviceName={consult.title} />
            </div>
          </div>
        </div>


      <Tabs service={{ contentSections: consult.contentSections }} advantageSections={consult.advantageSections} faqs={consult.faq} consultPage />
      </div>
      {plans && consult && (
        <PricingSelector
          subscriptionData={plans}
          currentService={consult._id?.toString() || ""}
          service={consult}
        />
      )}
    </>
  );
}
