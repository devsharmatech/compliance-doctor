"use client";

import React from "react";
import "../../app/about-us/about.css";
import { useState } from "react";
import CompanyRegistrations from "./ServiceForms/CompanyRegistrations";
import UdyamRegistration from "./ServiceForms/UdyamRegistration";
import GSTRegistrations from "./ServiceForms/GSTRegistrations";
import TrademarkRegistrations from "./ServiceForms/TrademarkRegistrations";

interface ServiceDescriptionProps {
  service: {
    name: string;
    description: string;
    bannerImage?: string;
  };
}

function cleanHtml(html: string = ""): string {
  return html
    .replace(/<!--StartFragment-->/g, "")
    .replace(/<!--EndFragment-->/g, "")
    .replace(/<\/?(html|body)[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function ServiceDescription({
  service,
}: ServiceDescriptionProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleRegister = () => {
    // setModalOpen(true);
    const serviceForm = document.getElementById("service-register-form");
    if (serviceForm) {
      serviceForm.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getModalComponent = () => {
    switch (service.name) {
      case "Registrations":
        return <CompanyRegistrations onClose={() => setModalOpen(false)} />;
      case "UDYAM Registration":
        return <UdyamRegistration onClose={() => setModalOpen(false)} />;
      case "Goods & Services Tax (GST)":
        return <GSTRegistrations onClose={() => setModalOpen(false)} />;
      case "Trademark Services":
        return <TrademarkRegistrations onClose={() => setModalOpen(false)} />;
      default:
        return null;
    }
  };

  return (
    <>
      <section className="w-full py-12 px-12">
        <div className="container mx-auto flex flex-col lg:flex-row gap-8 justify-between">
          {/* Left Text Content */}
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-2xl md:text-4xl text-center md:text-left text-black font-bold">
              {service.name}
            </h1>
            <div
              className="text-lg text-justify md:text-left text-gray-800 [&>*]:mt-0 [&>*]:mb-2"
              dangerouslySetInnerHTML={{
                __html: cleanHtml(service.description || ""),
              }}
            />
            <h4 className="font-bold text-lg text-black">
              Don’t wait—Start Your {service.name} Today!!
            </h4>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                onClick={handleRegister}
                className="bg-blue-700 hover:bg-blue-800 text-white transition duration-300 
             text-[16px] font-semibold px-6 py-3 rounded-xl shadow-lg 
             hover:shadow-xl flex items-center justify-center gap-2 registerbtn"
              >
                Register Now!
              </button>
            </div>
          </div>

          {/* Right Image and Stats */}
          <div className="lg:w-1/2 relative mt-12 lg:mt-0 flex justify-center">
            <div className="image-conainer">
              <img
                src={service.bannerImage || "/images/tax.webp"}
                alt={service.name}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {modalOpen && getModalComponent()}
      </section>
    </>
  );
}
