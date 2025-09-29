'use client';

import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function ContactUs() {
  return (
    <section className="w-full bg-white py-10 px-4 md:px-16">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto  our-features">
        <p>Contact With Us</p>
        <h2>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e
        </h2>
      </div>

      {/* Contact Info Cards */}
      <div className="flex flex-col md:flex-row flex-wrap justify-between p-10 md:p-0 gap-6 mt-10">
        {/* Location */}
        <div className="flex items-start gap-4 w-full md:w-[30%]">
          <div className="bg-blue-600 p-3 rounded-full text-white">
            <FaMapMarkerAlt size={16} />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-[#1A202C]">Location</h4>
            <p className="text-[#333] text-sm">
              Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices.
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4 w-full md:w-[30%]">
          <div className="bg-blue-600 p-3 rounded-full text-white">
            <FaEnvelope size={16} />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-[#1A202C]">Email</h4>
            <p className="text-[#333] text-sm">
              Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices.
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4 w-full md:w-[30%]">
          <div className="bg-blue-600 p-3 rounded-full text-white">
            <FaPhone size={16} />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-[#1A202C]">Phone</h4>
            <p className="text-[#1A202C] text-sm">
              Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices.
            </p>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full h-[300px] md:h-[400px] mt-10 rounded-xl overflow-hidden shadow-md">
        <iframe
          title="map"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19809.47249434435!2d-0.2613840970595089!3d51.495848059786614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760fd28b4a89c1%3A0x54b0e5a3c6f1d3c1!2sChiswick%2C%20London!5e0!3m2!1sen!2suk!4v1622291600910!5m2!1sen!2suk"
        ></iframe>
      </div>
    </section>

  );
}
