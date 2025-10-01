"use client";
import { useGetHeroQuery } from "@/store/api-services/hero-api";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { OverlayLoader } from "../ui";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import TimelineSection from "@/components/HomePageComponents/TimeLineSection";
import { useState } from "react";
import Modal from "../modals/Modal";
import ContactForm from "../ContactUsComponents/ContactForm";
// import { Search } from "lucide-react";

export default function Hero() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data, isLoading, isError, error } = useGetHeroQuery(
    { limit: 1, page: 1 },
    { skip: !isAuthenticated }
  );

  const heroContent = data?.[0];
  const [isOpenEnquiry, setIsOpenEnquiry] = useState(false);

  if (isLoading) return <OverlayLoader />;
  if (isError) {
    console.error("Hero API error:", error);
    return (
      <div className="text-red-500 text-center py-4">
        Failed to load hero content.
      </div>
    );
  }

  return (
    <div className="px-5 w-full">
      <section
        className="text-white flex flex-col items-center justify-center px-4 py-8 sm:py-12 md:py-16 lg:py-20 pb-16 sm:pb-20 md:pb-24 w-full 
  bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 rounded-2xl"
      >
        <div className="max-w-4xl text-center mx-auto w-full">
          {/* Heading */}
          <h1 className="text-2xl xs:text-[28px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight sm:leading-snug text-white px-2">
            Expert Solutions for{" "}
            <span className="text-gray-300 block sm:inline">Modern Business</span> Challenges
          </h1>

          <h4 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl mt-3 sm:mt-4 md:mt-6 text-gray-100 px-2">
            Simplify Compliance{" "}
            <span className="font-semibold text-gray-200 block sm:inline">
              Focus on Growth.
            </span>
          </h4>

          {/* Buttons */}
          <div className="flex flex-col xs:flex-row justify-center gap-3 sm:gap-4 pt-4 sm:pt-6 md:pt-8 w-full px-2">
            <button
              className="px-4 py-2 xs:px-5 xs:py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 
          w-full xs:w-auto text-sm xs:text-base sm:text-lg md:text-xl 
          font-bold text-gray-700 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-300
          hover:bg-gray-100 hover:scale-105 transition-all duration-300 ease-in-out"
              onClick={() => setIsOpenEnquiry((pre) => !pre)}
            >
              Enquiry Now
            </button>

            <Link href="/services">
              <button
                className="px-4 py-2 xs:px-5 xs:py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 
            w-full xs:w-auto text-sm xs:text-base sm:text-lg md:text-xl 
            font-bold text-white bg-gradient-to-r from-black via-black to-black
            rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
              >
                {heroContent?.ctaSecondaryLabel || "Explore Our Services"}
              </button>
            </Link>
          </div>

          {/* Search Section - Improved Responsiveness */}
          <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center w-full px-2 sm:px-4">
            <div className="flex w-full max-w-2xl sm:max-w-3xl bg-white rounded-full shadow-xl overflow-hidden border border-gray-200">
              {/* Search Icon */}
              <div className="flex items-center justify-center pl-3 xs:pl-4 sm:pl-5 pr-1 sm:pr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </div>

              {/* Input */}
              <input
                type="text"
                placeholder="Search for services, solutions..."
                className="flex-grow 
            px-2 xs:px-3 sm:px-4 md:px-5
            py-2 xs:py-2 sm:py-3 md:py-4
            text-sm xs:text-base sm:text-lg md:text-xl
            text-gray-700 outline-none
            placeholder:text-sm xs:placeholder:text-base sm:placeholder:text-lg
            transition-all duration-300"
              />

              {/* Search Button */}
              <button
                className="px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10
            py-2 xs:py-2 sm:py-3 md:py-4
            bg-gradient-to-r from-black to-black
            text-white font-semibold
            text-sm xs:text-base sm:text-lg md:text-xl
            hover:from-gray-700 hover:to-gray-900
            rounded-full
            transition-all duration-300
            whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Enquiry Modal */}
        {isOpenEnquiry && (
          <Modal isOpen={isOpenEnquiry} onClose={() => setIsOpenEnquiry(false)}>
            <ContactForm />
          </Modal>
        )}
      </section>

      {/* Services Section */}
      <div className="services-home mt-8">
        <TimelineSection />
      </div>
    </div>
  );
}
