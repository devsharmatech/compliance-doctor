"use client";

import { useGetServiceByNameQuery } from "@/store/api-services/service-api";
import { notFound, useParams } from "next/navigation";
import Head from "next/head";
const ServiceDescription = dynamic(
  () => import("@/components/ServicePageComponent/ServiceDescription"),
  { ssr: false, loading: () => <SectionLoader /> }
);
const PricingSelector = dynamic(
  () => import("@/components/ServicePageComponent/PricingSelector"),
  { ssr: false, loading: () => <SectionLoader /> }
);
import Tabs from "@/components/ServicePageComponent/tabs";
import { useGetAllPlansQuery } from "@/store/api-services/subscriptionPlanApi";
import { useState } from "react";
const FaqSection = dynamic(
  () => import("@/components/ServicePageComponent/FaqSection"),
  { ssr: false, loading: () => <SectionLoader /> }
);
import { HiOutlinePhone } from "react-icons/hi2";
import { CiMail } from "react-icons/ci";
import { MdOutlineMessage } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import {
  FaDiscord,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { useSubmitFormMutation } from "@/store/api-services/form-submission-api";
import dynamic from "next/dynamic";
import { SectionLoader } from "@/components/ui";
import ConsultExpertForm from "@/components/form/ConsultExpertForm";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

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
  const {
    data: service,
    isLoading,
    isError,
  } = useGetServiceByNameQuery({ name: params.slug });
  const { data: plans, isLoading: plansLoading } = useGetAllPlansQuery({});
  const [error, setError] = useState({
    email: false,
    mobile: false,
    pincode: false,
    city: false,
  });
  const [submitForm] = useSubmitFormMutation();
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    pincode: "",
    city: "",
  });

  const handleGetStarted = async (data) => {
    await submitForm({
      type: "service",
      data: data,
    }).unwrap();
    alert("Form Submitted Successfully");
    const element = document.getElementById("pricing");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // debugger
  // Handle loading and error states
  if (isLoading) {
    return <div className="text-center py-10">Loading service details...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-600">
        Failed to load service details.
      </div>
    );
  }

  if (!service) {
    notFound();
  }

  return (
    <>
      <Head>
        <title>{service.metaTitle || service.name}</title>
        <meta
          name="description"
          content={service.metaDescription || service.description}
        />
      </Head>
      {service?.bannerImage && (
        <Banner
          image={service.bannerImage}
          title={service.name}
          overlay={true}
          breadcrumb={
            <div className="flex items-center justify-center text-center h-[50px] my-5 text-lg text-[#c1c1c1]">
              <span className="text-[#fff] mr-1.5"> Home </span> -{" "}
              {service.name}
            </div>
          }
        />
      )}

      <main className="container mx-auto  bg-white">
        {/* <ServiceDescription service={service} /> */}

        <Tabs
          service={service}
          advantageSections={service.advantageSections}
          faqs={service.faq}
        />

        <div className="bg-blue-50 py-20 px-4">
          <div className="custom-container">
            <div className="text-center mb-12 lg:mb-16">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                Contact{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-800">
                  With Us
                </span>
              </h3>

              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Have queries? Reach out to our experts.
              </p>
            </div>
            <div className="flex flex-col lg:flex-row justify-center gap-10 lg:gap-20">
              {/* Left Card - Contact Info */}
              <div className="w-full max-w-2xl bg-white p-8 md:p-10 rounded-2xl shadow-md border border-blue-100 transition hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-lg font-semibold text-blue-700">
                  Contact Details
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Fill up the form and our team will get back to you within 24
                  hours.
                </p>

                {/* Contact Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                  {/* Phone */}
                  <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 hover:bg-blue-100 transition">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-700 shadow-inner">
                      <HiOutlinePhone className="text-[22px]" />
                    </div>
                    <span className="text-base text-gray-900">
                      +91 9999999999
                    </span>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 hover:bg-blue-100 transition">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-700 shadow-inner">
                      <CiMail className="text-[22px]" />
                    </div>
                    <span className="text-base text-gray-900">
                      info@example.com
                    </span>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 hover:bg-blue-100 transition">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-700 shadow-inner">
                      <MdOutlineMessage className="text-[22px]" />
                    </div>
                    <span className="text-base text-gray-900">
                      +91 9999999999
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 hover:bg-blue-100 transition">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-700 shadow-inner">
                      <IoLocationOutline className="text-[22px]" />
                    </div>
                    <span className="text-base text-gray-900">
                      Kolkata, India
                    </span>
                  </div>
                </div>

                {/* Social Media */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-10">
                  <span className="text-base text-gray-700 font-medium">
                    To Connect With Us:
                  </span>
                  <div className="flex gap-4 text-blue-700">
                    <FaDiscord className="cursor-pointer text-[20px] hover:scale-110 transition" />
                    <FaFacebookF className="cursor-pointer text-[20px] hover:scale-110 transition" />
                    <FaTwitter className="cursor-pointer text-[20px] hover:scale-110 transition" />
                    <FaLinkedinIn className="cursor-pointer text-[20px] hover:scale-110 transition" />
                    <FaInstagram className="cursor-pointer text-[20px] hover:scale-110 transition" />
                  </div>
                </div>
              </div>

              <div id="service-register-form">
                <ConsultExpertForm
                  onSubmit={handleGetStarted}
                  serviceName={service.name}
                />
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
            service={service}
          />
        )}

        {/* Features */}
        {service.features?.length > 0 && (
          <section className="my-8">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            {Array.isArray(service?.features) ? (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {service.features.map((feature: string, i: number) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: service?.features }}
              ></div>
            )}
          </section>
        )}

        {/* Testimonials */}
        {service.testimonials?.length > 0 && (
          <section className="py-16 bg-white">
            <div className="custom-container">
              <div className="text-center mb-12 lg:mb-16">
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                  What Our{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-800">
                    Clients Say
                  </span>
                </h3>

                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Don't just take our word for it - hear from our satisfied
                  customers
                </p>
              </div>
              <div className="relative bg-white">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={30}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                  pagination={{
                    clickable: true,
                    el: ".testimonial-pagination",
                    bulletClass:
                      "swiper-pagination-bullet bg-blue-200 opacity-100",
                    bulletActiveClass:
                      "swiper-pagination-bullet-active !bg-blue-700",
                  }}
                  navigation={{
                    nextEl: ".testimonial-button-next",
                    prevEl: ".testimonial-button-prev",
                  }}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                >
                  {service.testimonials.map((testi: any, i: number) => (
                    <SwiperSlide
                      key={i}
                      className="py-8 bg-white"
                      style={{ boxShadow: "none" }}
                    >
                      <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 h-full group hover:border-blue-300">
                        {/* Quote Icon */}
                        <div className="text-blue-700 mb-4">
                          <svg
                            className="w-8 h-8 opacity-50"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                          </svg>
                        </div>

                        {/* Testimonial Content */}
                        <div className="flex items-start space-x-4 mb-4">
                          {testi.image && (
                            <img
                              src={testi.image}
                              alt={testi.name}
                              className="rounded-full object-cover w-12 h-12 border-2 border-blue-200"
                            />
                          )}
                          <div className="flex-1">
                            <p className="text-gray-700 leading-relaxed mb-4 italic">
                              "{testi.quote}"
                            </p>
                            <div>
                              <p className="font-bold text-blue-700 text-lg">
                                {testi.name}
                              </p>
                              {testi.position && (
                                <p className="text-sm text-gray-500">
                                  {testi.position}
                                </p>
                              )}
                              {testi.company && (
                                <p className="text-sm text-gray-400">
                                  {testi.company}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Rating Stars (optional) */}
                        {testi.rating && (
                          <div className="flex items-center mt-4">
                            {[...Array(5)].map((_, starIndex) => (
                              <svg
                                key={starIndex}
                                className={`w-5 h-5 ${
                                  starIndex < testi.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <button className="testimonial-button-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-blue-700 text-blue-700 hover:text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 border border-blue-200 hover:border-blue-700">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button className="testimonial-button-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-blue-700 text-blue-700 hover:text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 border border-blue-200 hover:border-blue-700">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Custom Pagination */}
                <div className="testimonial-pagination flex justify-center space-x-2 mt-8 !relative" />
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
