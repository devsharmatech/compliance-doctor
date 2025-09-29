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
  if (isLoading) return <div className="p-10">Loading...</div>;
  if (!consult || isError) return <div className="p-10 text-red-600">Consult type not found.</div>;

  return (
    <>
      <div className="p-8 space-y-6 odd-section">


        <div className='custom-container'>
          <h1 className="text-2xl md:text-4xl text-center md:text-left color-blue">
            {consult.title}
          </h1>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Left - Description */}
            <div className="flex flex-col w-full md:w-2/3 space-y-6">
              <p
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
              {/* <TalkIPForm /> */}
              <ConsultExpertForm onSubmit={handleGetStarted} serviceName={consult.title} />
            </div>
          </div>
        </div>


      </div>
      <Tabs service={{ contentSections: consult.contentSections }} advantageSections={consult.advantageSections} faqs={consult.faq} consultPage />
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
