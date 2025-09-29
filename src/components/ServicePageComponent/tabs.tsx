import React, { useState, useEffect } from "react";
import ContactForm from "../ContactUsComponents/ContactForm";
import ServiceDescription from "@/components/ServicePageComponent/ServiceDescription";
import Image from "next/image";
import "./tabs.css";
import FaqSection from "./FaqSection";

interface ContentSection {
  title: string;
  content: string;
  image?: string;
  optionalContent: string;
}

interface AdvantageSection {
  title: string;
  image?: string;
  content: string;
}

interface TabsProps {
  service: {
    contentSections: ContentSection[];
  };
  advantageSections?: AdvantageSection[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  consultPage?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  service,
  advantageSections,
  faqs,
  consultPage = false,
}) => {
  const { contentSections } = service;

  const [activeTab, setActiveTab] = useState(contentSections[0]?.title || "");
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleStep = (index: number) => {
    setActiveStep(index === activeStep ? -1 : index);
  };

  // Green theme color palette
  const blueTheme = {
    primary: "#1d4ed8", // Blue 700
    primaryDark: "#1e40af", // Blue 800 (darker)
    primaryLight: "#2563eb", // Blue 600 (lighter)
    secondary: "#1e3a8a", // Blue 900 (deep blue)
    accent: "#dbeafe", // Blue 100 (soft accent)
    textDark: "#0f172a", // Dark slate for text
    textLight: "#64748b", // Slate (subtext)
    background: "#f8fafc", // Light background
    cardBg: "#ffffff", // White cards
    border: "#e2e8f0", // Light border
  };

  return (
    <>
      <section className="mb-0 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-green-100 rounded-full opacity-20 -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-green-50 rounded-full opacity-30 translate-x-24 translate-y-24"></div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
          {/* Left Sidebar (sticky) */}
          <aside className="md:col-span-4 lg:col-span-3">
            <div
              className={`sticky top-6 transition-all duration-300 ${
                isScrolled ? "scale-95" : "scale-100"
              }`}
            >
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border border-blue-100 p-2 backdrop-blur-sm">
                {/* Tabs Navigation */}
                <nav className="flex flex-col gap-3 mb-8">
                  {contentSections.map((section, index) => (
                    <button
                      key={section.title}
                      onClick={() => {
                        const element = document.getElementById(section.title);
                        if (element) {
                          element.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }
                        setActiveTab(section.title);
                      }}
                      className={`px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer font-medium group relative overflow-hidden ${
                        activeTab === section.title
                          ? "text-white bg-gradient-to-r from-blue-700 to-blue-800 shadow-lg shadow-blue-200 transform scale-105"
                          : "text-slate-700 bg-white hover:bg-blue-50 border border-blue-100 hover:border-blue-300 hover:transform hover:scale-105"
                      }`}
                    >
                      <span className="relative z-10 flex items-center">
                        {activeTab === section.title && (
                          <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                        )}
                        {section.title}
                      </span>
                      {activeTab === section.title && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800"></div>
                      )}
                    </button>
                  ))}
                </nav>

                {/* Contact Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md border border-blue-200 p-6">
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg
                        className="w-6 h-6 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">
                      Need Help?
                    </h3>
                    <p className="text-sm text-slate-600">
                      Fill out the form below and we'll get back to you.
                    </p>
                  </div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </aside>

          {/* Right Content Area (scrolls) */}
          <main className="md:col-span-8 lg:col-span-9 space-y-16">
            {/* Overview Section */}
            <div id="overview" className="scroll-mt-32 mb-0">
              <ServiceDescription service={service} />
            </div>

            {/* Content Sections */}
            {contentSections.map((section, index: number) => (
              <div
                key={section.title}
                id={section.title}
                className="scroll-mt-32 group mb-4"
              >
                <div
                  className={`rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl ${
                    index % 2 === 0
                      ? "bg-gradient-to-r from-white to-blue-50"
                      : "bg-gradient-to-l from-white to-blue-50"
                  }`}
                >
                  <div className="p-6 lg:p-8">
                    <div
                      className={`gap-8 flex flex-col ${
                        section.image
                          ? index % 2 === 0
                            ? "lg:flex-row"
                            : "lg:flex-row-reverse"
                          : ""
                      }`}
                    >
                      {/* HTML Content */}
                      <div
                        className={`${
                          section.image ? "lg:w-1/2" : "w-full"
                        } flex flex-col justify-center`}
                      >
                        <div className="mb-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            Section {index + 1}
                          </span>
                        </div>
                        <div
                          className="prose  mt-0 prose-lg max-w-none text-slate-700 
             prose-headings:text-blue-700 prose-headings:font-bold 
             prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8 
             prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6
             prose-p:leading-relaxed prose-p:mb-4
             prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-700
             prose-li:marker:text-blue-600 prose-ul:pl-6 prose-ol:pl-6
             prose-img:rounded-xl prose-img:shadow-md
             prose-strong:text-blue-700 prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:pl-4 prose-blockquote:text-gray-600
             "
                          dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                      </div>

                      {/* Image */}
                      {section.image && (
                        <div className="relative w-full lg:w-1/2 h-64 lg:h-80 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                          <Image
                            src={section.image}
                            alt={section.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      )}
                    </div>

                    {/* Optional Extra Content */}
                    {section.optionalContent?.trim() && (
                      <div className="mt-8 pt-6 border-t border-blue-100">
                        <div
                          className="prose  mt-0 prose-lg max-w-none text-slate-700 
             prose-headings:text-blue-700 prose-headings:font-bold 
             prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-8 
             prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-6
             prose-p:leading-relaxed prose-p:mb-4
             prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-700
             prose-li:marker:text-blue-600 prose-ul:pl-6 prose-ol:pl-6
             prose-img:rounded-xl prose-img:shadow-md
             prose-strong:text-blue-700 prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:pl-4 prose-blockquote:text-gray-600
              prose-green max-w-none text-slate-600"
                          dangerouslySetInnerHTML={{
                            __html: section.optionalContent,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </main>
        </div>
      </section>

      {/* Advantages Section */}
      {advantageSections && advantageSections.length > 0 && (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full opacity-20 -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-200 rounded-full opacity-30 -translate-x-24 translate-y-24"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 lg:mb-16">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                What are the <span className="text-blue-600">Advantages</span>?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Here's why you should choose us for your business success
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Sidebar */}
                  <div className="lg:w-2/5 bg-gradient-to-b from-blue-50 to-white p-6 lg:p-8">
                    <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-600 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Key Benefits
                    </h3>
                    <ul className="space-y-3">
                      {advantageSections.map((section, index) => (
                        <li key={index}>
                          <button
                            onClick={() => setActiveIndex(index)}
                            className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                              index === activeIndex
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-200 transform scale-105"
                                : "bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-blue-100 hover:border-blue-300"
                            }`}
                          >
                            <div className="flex items-center">
                              <span
                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 font-semibold ${
                                  index === activeIndex
                                    ? "bg-white text-blue-600"
                                    : "bg-blue-100 text-blue-600"
                                }`}
                              >
                                {index + 1}
                              </span>
                              <span className="font-medium">
                                {section.title}
                              </span>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Content */}
                  <div className="lg:w-3/5 p-6 lg:p-8">
                    <div className="h-full flex flex-col justify-center">
                      <div className="mb-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-3">
                          Advantage {activeIndex + 1}
                        </span>
                        <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-4">
                          {advantageSections[activeIndex]?.title}
                        </h2>
                      </div>
                      <div
                        className="text-slate-600 leading-relaxed space-y-4 text-base lg:text-lg"
                        dangerouslySetInnerHTML={{
                          __html: advantageSections[activeIndex]?.content || "",
                        }}
                      />
                      <div className="mt-6 pt-6 border-t border-blue-100">
                        <div className="flex items-center text-blue-600">
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium">
                            Included with this advantage
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {consultPage && faqs && faqs.length > 0 && <FaqSection faqs={faqs} />}
    </>
  );
};

export default Tabs;
