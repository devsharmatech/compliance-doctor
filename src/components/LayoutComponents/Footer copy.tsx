'use client';

import "./footer.css";
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import SubscribeSection from "../subscription/SubscribeSection";

export default function Footer() {
  return (
    <>
    <SubscribeSection/>
    <footer className="bg-[#cbd5e1] text-[#ffffff] px-6 md:px-12 py-12 border-t-2 border-white footerui">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          
          <img src="/images/logo-white.png" alt="" className="mb-6"/>
          <p className="text-white mb-6 max-w-xs">
            Our vision is to provide convenience and help increase your sales business.
          </p>
        </div>

        {/* About */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About</h3>
          <ul className="space-y-4 text-gray">
            <li><Link href="/about-us">About us</Link></li>
            <li><Link href="#">How it works</Link></li>
            <li><Link href="#">Featured</Link></li>
            <li><Link href="#">Partnership</Link></li>
            <li><Link href="#">Bussiness Relation</Link></li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Community</h3>
          <ul className="space-y-4 text-gray">
            <li><Link href="#">Events</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="#">Podcast</Link></li>
            <li><Link href="#">Invite a friend</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Socials</h3>
          <ul className="space-y-4 text-gray">
            <div className="flex  gap-4">
              
              <div className="flex flex-row gap-2">
                <Link href="#" className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-md">
                  <FaInstagram size={18} />
                </Link>
                
              </div>
              <div className="flex flex-row gap-2">
                <Link href="#" className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-md">
                  <FaTwitter size={18} />
                </Link>
                
              </div>
              <div className="flex flex-row gap-2">
                <Link href="#" className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-md">
                  <FaFacebookF size={18} />
                </Link>
                
              </div>
            </div>

          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-12 border-t border-white pt-6 flex flex-col md:flex-row justify-between text-white text-sm">
        <p>©2022 Company Name. All rights reserved</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <Link href="#">Privacy & Policy</Link>
          <Link href="#">Terms & Condition</Link>
        </div>
      </div>
    </footer>
    </>
  );
}