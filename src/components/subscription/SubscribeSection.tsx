"use client";

import { useState } from "react";
import "./SubscribeSection.css"; // Import the CSS

export default function SubscribeSection() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
  };

  return (
    <section className="subscribe-section bg-gradient-to-r from-blue-700 to-blue-800 text-white py-8 px-4" style={{padding:"1.5rem 0.8rem"}}>
      <div className="subscribe-container max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h2 className="subscribe-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
          Confused? Let us help
        </h2>
        <p className="subscribe-subtitle text-sm sm:text-base md:text-lg lg:text-xl text-green-100 mt-2">
          Get exclusive access by signing up today.
        </p>

        {/* Form */}
        <form
          className=" mt-2 flex flex-col sm:flex-row items-center gap-3"
          onSubmit={handleSubscribe}
        >
          <div className="mt-4 flex justify-center w-full px-2">
            <div className="flex w-full max-w-3xl bg-white rounded-full shadow-xl overflow-hidden border border-gray-200">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow 
               px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4
               text-lg sm:text-base md:text-lg lg:text-xl
               text-gray-700 outline-none
               rounded-lg
               transition"
              />

              {/* Button */}
              <button
                type="submit"
                className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-5
               bg-gradient-to-r from-black to-black
               text-white font-semibold
               text-lg sm:text-base md:text-lg lg:text-xl
               hover:from-gray-700 hover:to-gray-900
               rounded-full
               transition-all duration-300"
              >
                Subscribe
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Decorative background circles */}
      <div className="circle top-left"></div>
      <div className="circle bottom-right"></div>
    </section>
  );
}
