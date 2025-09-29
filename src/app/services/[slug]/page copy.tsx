"use client";

import { useGetServiceByNameQuery } from "@/store/api-services/service-api";
import { notFound, useParams } from "next/navigation";
import Head from "next/head";
const ServiceDescription = dynamic(()=> import("@/components/ServicePageComponent/ServiceDescription"), {ssr:false, loading: ()=> <SectionLoader/>});
const PricingSelector = dynamic(()=> import("@/components/ServicePageComponent/PricingSelector"), {ssr:false, loading: ()=> <SectionLoader/>});
import Tabs from "@/components/ServicePageComponent/tabs";
import { useGetAllPlansQuery } from "@/store/api-services/subscriptionPlanApi";
import { useState } from "react";
const FaqSection = dynamic(()=>import("@/components/ServicePageComponent/FaqSection"), {ssr:false, loading: ()=> <SectionLoader/>});
import { HiOutlinePhone } from "react-icons/hi2";
import { CiMail } from "react-icons/ci";
import { MdOutlineMessage } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaDiscord, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { useSubmitFormMutation } from "@/store/api-services/form-submission-api";
import dynamic from "next/dynamic";
import { SectionLoader } from "@/components/ui";
import ConsultExpertForm from "@/components/form/ConsultExpertForm";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Banner from "@/components/Banner/Banner";

interface faqs {
  question: string;
  answer: string;
}

export default function ServiceDetail() {
  const params = useParams();
  const { data: service, isLoading, isError } = useGetServiceByNameQuery({ name: params.slug });
  const { data: plans, isLoading: plansLoading } = useGetAllPlansQuery({});
  const [error, setError] = useState({ email: false, mobile: false, pincode: false, city:false });
  const [submitForm] = useSubmitFormMutation();
  const [formData, setFormData] = useState(
    {
      email: '',
      mobile: '',
      pincode: '',
      city:'',
    }
  );

  const handleGetStarted = async(data) => {

    await submitForm({
      type: 'service',
      data:data,
    }).unwrap();
    alert("Form Submitted Successfully");
    const element = document.getElementById('pricing');
    if (element)
      element.scrollIntoView({ behavior: "smooth" });
  }

  // debugger
  // Handle loading and error states
  if (isLoading) {
    return <div className="text-center py-10">Loading service details...</div>;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-600">Failed to load service details.</div>;
  }

  if (!service) {
    notFound();
  }

  return (
    <>
  
      <Head>
        <title>{service.metaTitle || service.name}</title>
        <meta name="description" content={service.metaDescription || service.description} />
      </Head>
        {service?.bannerImage && (
      <Banner
        image={service.bannerImage}
        title={service.name}
        overlay={true}
        breadcrumb={
           <div className="flex items-center justify-center text-center h-[50px] my-5 text-lg text-[#c1c1c1]">
        <span className="text-[#fff] mr-1.5"> Home </span>  - {service.name}
      </div>
        }
      />
    )}

      <main className="container mx-auto  bg-white">
        
        {/* <ServiceDescription service={service} /> */}
      
      
          <Tabs service={service} advantageSections={service.advantageSections} faqs={service.faq} />
       
       
         
        {/* {service.name === 'Trademark Services' ? null : (<Pricing service={service} details={formData} />)} */}

        <div className="bg-[#FAFAFA] py-20 px-4">
          <div className="custom-container">
          <div className="flex flex-col items-center text-center text-[#326EE6] font-semibold text-[22px] mb-10">
            Contact With Us
            <h1 className="text-[#0A2252] text-[28px] md:text-[36px] mt-2 font-semibold">
              Have queries? Reach out to our experts.
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row justify-center gap-10 lg:gap-20">
            {/* Left Card - Contact Info */}
            <div className="w-full max-w-2xl bg-white p-6 md:p-10 border border-[#EDEDED]">
              <h2 className="text-[18px] font-semibold">Contact details</h2>
              <p className="text-[15px] text-gray-600 mt-1">
                Fill up the form and our team will get back to you within 24 hours.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                {/* Phone */}
                <div className="flex items-center px-3 space-x-3 bg-[#FAFAFA] w-full h-[68px]">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border border-[#BDC7F4]">
                    <HiOutlinePhone className="text-[#326EE6] text-[24px]" />
                  </div>
                  <span className="text-[16px] text-[#0C1819]">+91 9999999999</span>
                </div>

                {/* Email */}
                <div className="flex items-center px-3 space-x-3 bg-[#FAFAFA] w-full h-[68px]">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border border-[#BDC7F4]">
                    <CiMail className="text-[#326EE6] text-[24px]" />
                  </div>
                  <span className="text-[16px] text-[#0C1819]">info@example.com</span>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center px-3 space-x-3 bg-[#FAFAFA] w-full h-[68px]">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border border-[#BDC7F4]">
                    <MdOutlineMessage className="text-[#326EE6] text-[24px]" />
                  </div>
                  <span className="text-[16px] text-[#0C1819]">+91 9999999999</span>
                </div>

                {/* Location */}
                <div className="flex items-center px-3 space-x-3 bg-[#FAFAFA] w-full h-[68px]">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border border-[#BDC7F4]">
                    <IoLocationOutline className="text-[#326EE6] text-[24px]" />
                  </div>
                  <span className="text-[16px] text-[#0C1819]">Kolkata, India</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-10">
                <span className="text-[16px] text-[#2B3536] font-medium">To Connect With Us:</span>
                <div className="flex gap-4 text-[#326EE6]">
                  <FaDiscord className="cursor-pointer text-[20px]" />
                  <FaFacebookF className="cursor-pointer text-[20px]" />
                  <FaTwitter className="cursor-pointer text-[20px]" />
                  <FaLinkedinIn className="cursor-pointer text-[20px]" />
                  <FaInstagram className="cursor-pointer text-[20px]" />
                </div>
              </div>
            </div>

           
            <div id="service-register-form">
              <ConsultExpertForm onSubmit={handleGetStarted} serviceName={service.name}/>
            </div>
            
          </div>
          </div>
        </div>

        <div className="px-12">
          <FaqSection faqs={service.faq} />
        </div>
        {/* <TabsContent /> */}
        {plans && service && (
          <PricingSelector
            subscriptionData={plans.filter(
              (plan) =>
                plan.serviceId?._id?.toString() === service._id?.toString()
            )}
            currentService={service._id?.toString() || ""} 
            service = {service}
          />
        )}
        

        {/* Features */}
        {service.features?.length > 0 && (
          <section className="my-8">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            {Array.isArray(service?.features) ? <ul className="list-disc list-inside space-y-2 text-gray-700">
              {service.features.map((feature: string, i: number) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>  : 
            <div dangerouslySetInnerHTML={{__html:service?.features}}></div>}
          </section>
        )}

       

        {/* Testimonials */}
        {service.testimonials?.length > 0 && (
  <section className="my-8">
    <div className="custom-container">
      <h2 className="text-2xl font-semibold mb-6">Testimonials</h2>

      <div className="space-y-6">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },   
          }}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className="pb-16"
        >
          {service.testimonials.map((testi: any, i: number) => (
            <SwiperSlide key={i}>
              <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-sm text-left h-full">
                {testi.image && (
                  <img
                    src={testi.image}
                    alt={testi.name}
                    className="rounded-full object-cover w-10 h-10"
                  />
                )}
                <div>
                  <p className="text-sm text-gray-700">{testi.quote}</p>
                  <p className="font-semibold text-[#1e3a8a] mt-2">{testi.name}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </section>
)}

      </main>
    </>
  );
}
