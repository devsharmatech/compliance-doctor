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
      <div className="mt-10 flex justify-center w-full px-2">
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
        text-sm sm:text-base md:text-lg lg:text-xl
        text-gray-700 outline-none
        min-w-0
        transition"
          />

          {/* Button */}
          <button
            className="flex-shrink-0
        px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-5
        bg-gradient-to-r from-black to-black
        text-white font-semibold
        text-sm sm:text-base md:text-lg lg:text-xl
        hover:from-gray-700 hover:to-gray-900
        rounded-full
        transition-all duration-300"
          >
            Search
          </button>
        </div>
      </div>


      {/* Services Section */}
      <div className="services-home mt-8">
        <TimelineSection />
      </div>
    </div>
  );
}
