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
  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetHeroQuery({ limit: 1, page: 1 }, { skip: !isAuthenticated });

  const heroContent = data?.[0];
  ;
  const [isOpenEnquiry, setIsOpenEnquiry] = useState(false);

  if (isLoading) return <OverlayLoader />;
  if (isError) {
    console.error("Hero API error:", error);
    return <div className="text-red-500 text-center py-4">Failed to load hero content.</div>;
  }

  return (
    <div className="px-5 w-full">
    <section className=" text-white min-h-[70vh] flex flex-col px-4 py-10 w-full herobg">
      <div className="max-w-full text-center herotext">
        {/* <p className="text-sm text-slate-200">{heroContent?.subtitle || "Neque porro quisquam est qui dolorem ipsum quia"}</p> */}

        <h1 className="text-[23px] md:text-3xl font-bold leading-tight ">
          <span className="text-white">Expert Solutions for Modern Business Challenges:  </span>
          
        </h1>
        <h4 className="text-[23px]  ">
          <span className="text-white">Simplify Compliance </span>
          <span className="text-white"> Focus on Growth.</span>
        </h4>

        {/* <p className="text-slate-300 text-base md:text-lg">
          {heroContent?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
        </p> */}



        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <button className="px-6 py-3 bg-white text-[#333] text-xs md:text-base font-semibold button-radius hover:bg-gray-100 transition"
            onClick={() => setIsOpenEnquiry((pre) => !pre)}>
            {"Enquiry Now"}
          </button>
          <Link href="/services">
            <button className="px-6 py-3 bg-white text-[#333] text-xs md:text-base font-semibold button-radius hover:bg-gray-100 transition">
              {heroContent?.ctaSecondaryLabel || "Explore Our Services"}
            </button>
          </Link>
        </div>
      </div>
     
      {isOpenEnquiry && (
        <Modal isOpen={isOpenEnquiry} onClose={() => setIsOpenEnquiry(false)}>
          <ContactForm />
        </Modal>
      )}
    </section>

     <div className="services-home mt-5">
        <div>
          <TimelineSection />
        </div>
      </div>
      </div>
  );
}
