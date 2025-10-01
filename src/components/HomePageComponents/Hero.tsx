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
        className="text-white flex flex-col items-center justify-center px-4 py-12 pb-24 w-full 
    bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 rounded-2xl"
      >
        <div className="max-w-4xl text-center mx-auto">
          {/* Heading */}
          <h1 className="text-[28px] sm:text-[32px] md:text-4xl lg:text-5xl font-bold leading-snug text-white">
            Expert Solutions for{" "}
            <span className="text-gray-300">Modern Business</span> Challenges
          </h1>

          <h4 className="text-[18px] sm:text-[20px] md:text-2xl lg:text-3xl mt-4 text-gray-100">
            Simplify Compliance{" "}
            <span className="font-semibold text-gray-200">
              Focus on Growth.
            </span>
          </h4>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-6 w-full">
            <button
              className="px-5 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 w-full sm:w-auto text-base sm:text-lg md:text-xl 
          font-bold text-gray-700 bg-white rounded-2xl shadow-lg border border-gray-300
          hover:bg-gray-100 hover:scale-105 transition-all duration-300 ease-in-out"
              onClick={() => setIsOpenEnquiry((pre) => !pre)}
            >
              Enquiry Now
            </button>

            <Link href="/services">
              <button
                className="px-5 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 w-full sm:w-auto text-base sm:text-lg md:text-xl 
            font-bold text-white bg-gradient-to-r from-black via-black to-black
            rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
              >
                {heroContent?.ctaSecondaryLabel || "Explore Our Services"}
              </button>
            </Link>
          </div>

          <div className="mt-10 flex justify-center w-full ">
            <div className="flex w-full max-w-3xl bg-white rounded-full shadow-xl overflow-hidden border border-gray-200">
              {/* Search Icon */}
              <div className="flex items-center pl-4 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
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
               px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4
               text-lg sm:text-base md:text-lg lg:text-xl
               text-gray-700 outline-none
               rounded-lg
               transition"
              />

              {/* Button */}
              <button
                className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-5
               bg-gradient-to-r from-black to-black
               text-white font-semibold
               text-lg sm:text-base md:text-lg lg:text-xl
               hover:from-gray-700 hover:to-gray-900
               rounded-full
               transition-all duration-300"
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
