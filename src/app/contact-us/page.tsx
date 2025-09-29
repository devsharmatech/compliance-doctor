'use client';

import React from 'react';
import "./contactus.css";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import dynamic from 'next/dynamic';

const ContactForm = dynamic(() => import("@/components/ContactUsComponents/ContactForm"), { ssr: false });

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4 py-8 contactpage">
      <div className="bg-white rounded-3xl border border-blue-200 shadow-2xl shadow-blue-900/20 h-auto px-6 py-8 md:p-12 md:w-7xl space-y-8 overflow-hidden">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h3 className="text-4xl md:text-5xl font-bold text-blue-700">Get In Touch</h3>
          <p className="text-blue-600 text-lg max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Info Cards - Small Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-all duration-300">
                <FaLocationDot className="text-blue-600 text-xl group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 text-lg">Our Location</h3>
                <p className="text-blue-600 text-sm mt-1">123 Business District</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-all duration-300">
                <MdEmail className="text-blue-600 text-xl group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 text-lg">Email Us</h3>
                <p className="text-blue-600 text-sm mt-1">hello@company.com</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-all duration-300">
                <FaPhoneAlt className="text-blue-600 text-lg group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 text-lg">Call Us</h3>
                <p className="text-blue-600 text-sm mt-1">+91 12345 66770</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map and Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
          
          {/* Left Side - Map */}
          <div className="space-y-6">
            <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border border-blue-200">
              <iframe
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.2102675861!2d77.20685617526722!3d28.58589407569083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2daa9eb4d0b%3A0x717971125923e5d!2sIndia%20Gate%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
            {/* Additional Location Info */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="font-semibold text-blue-900 text-lg mb-3">Visit Our Office</h3>
              <div className="space-y-2 text-blue-700">
                <p className="flex justify-between">
                  <span className="font-medium">Address:</span>
                  <span>123 Business District, City Center</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">City:</span>
                  <span>Metropolis, MP 12345</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-medium">Hours:</span>
                  <span>Mon-Fri: 9AM-6PM</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex flex-col justify-center">
            <ContactForm />
          </div>
        </div>

        {/* Footer Message Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white mt-8">
          <h3 className="text-2xl font-bold mb-4">Let's Start a Conversation</h3>
          <span className="text-blue-100 text-lg max-w-3xl mx-auto leading-relaxed">
            We're committed to providing exceptional service and support. Whether you have questions about 
            our services, need technical assistance, or want to explore partnership opportunities, our team 
            is here to help you succeed.
          </span>
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-blue-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>24/7 Customer Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Quick Response Time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Expert Assistance</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}