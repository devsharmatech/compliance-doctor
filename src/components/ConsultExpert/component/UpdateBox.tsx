"use client";
import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function UpdateBox() {
  return (
    <section className="flex items-center justify-center p-10 md:p-28">
      {/* Header */}

      <div className="border border-[#EDEDED] p-5 w-full md:w-[1200px] md:h-[781px] md:px-[24px] md:py-[20px] advantage">
        <div className="flex flex-col gap-1 items-start mb-5">
          {/* <FaRegCalendarAlt className="text-blue-500 text-xl mr-2" /> */}
          <h2 className="text-lg md:text-[16px] text-[#326EE6] font-semibold">Updates & Alerts</h2>
          <p>Fill up the form and our team will get back to you with in 24 hours</p>
        </div>

        <div className="mb-5">
          <h3 className="text-[#326EE6] text-[16px] mb-2">Highlights:</h3>
          <p className="text-sm md:text-base mb-4 text-gray-700">
            <strong>Tax Exemption Limit Increased:</strong> No income tax will be payable on annual income up to ₹12,00,000 under the new tax regime.
          <br />
          <strong>Revised Tax Slabs:</strong> The new tax slabs under the revised regime are as follows:
        </p>
        </div>
        

        {/* Table */}
        <div>
          <table className="md:w-[1152px] md:h-[443px] p-10 border border-[#EDEDED] advantage">
            <thead>
              <tr>
                <th className="p-2 text-left text-[#0A2252]">Annual Income (₹)</th>
                <th className="p-2 text-left text-[#0A2252]">Tax Rate</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["0 – 4,00,000", "Nil"],
                ["4,00,001 – 8,00,000", "5%"],
                ["8,00,001 – 12,00,000", "10%"],
                ["12,00,001 – 16,00,000", "15%"],
                ["16,00,001 – 20,00,000", "20%"],
                ["20,00,001 – 24,00,000", "25%"],
                ["Above 24,00,000", "30%"],
              ].map(([income, rate], i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-2">{income}</td>
                  <td className="p-2">{rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 87A */}
        <p className="text-sm md:text-base mt-4 text-gray-700">
          <strong>Section 87A Rebate Enhanced:</strong>
          <br />
          The rebate under Section 87A has been increased to ₹60,000 from the previous ₹25,000, further benefiting taxpayers under the new regime.
        </p>
      </div>

    </section>
  );
}
