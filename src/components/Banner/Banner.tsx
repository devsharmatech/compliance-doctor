// components/Banner.tsx
import React from "react";
import Image from "next/image";
import { ReactNode } from "react";

interface BannerProps {
  image: string;
  title?: string;
  overlay?: boolean; // option to enable/disable overlay
  height?: string; // custom height (default applied if not provided)
  breadcrumb?: ReactNode;
}

const Banner: React.FC<BannerProps> = ({
  image,
  title,
  overlay = true,
  height = "h-[300px] md:h-[350px]",
  breadcrumb, 
}) => {
  return (
    <section className={`relative w-full ${height}`}>
      <Image
        src={image}
        alt={title || "Banner"}
        fill
        className="object-cover"
        priority
      />

      {overlay && (
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
         
          {title && (
            <h1 className="text-white text-2xl md:text-4xl font-bold text-center px-4">
              {title}
            </h1>
          )}
           {/* Breadcrumb (if provided) */}
          {breadcrumb && <div className="mb-3">{breadcrumb}</div>}
        </div>
      )}
    </section>
  );
};

export default Banner;
