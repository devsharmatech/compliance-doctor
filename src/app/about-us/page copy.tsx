// // app/about/page.tsx
// 'use client';

// import Image from 'next/image';
// import React from 'react';

// export default function AboutPage() {
//   return (
//     <div className="flex flex-col w-full">
//       {/* ----------- HERO SECTION ----------- */}
//       <section className="w-full bg-[#F3F6F9] py-12 md:py-20 px-4 md:px-20 text-center">
//         <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About Us</h1>
//         <p className="text-gray-600 max-w-2xl mx-auto">
//           We are a team of printing experts dedicated to providing top-notch solutions for businesses and individuals. Our commitment to quality, innovation, and customer satisfaction drives everything we do.
//         </p>
//       </section>

//       {/* ----------- WHO WE ARE SECTION ----------- */}
//       <section className="w-full py-12 px-4 md:px-20 flex flex-col lg:flex-row items-center gap-12">
//         <div className="w-full lg:w-1/2">
//           <Image
//             src="/images/about1.png" // Replace with actual image path
//             alt="Who we are"
//             width={600}
//             height={400}
//             className="rounded-xl object-cover w-full"
//           />
//         </div>
//         <div className="w-full lg:w-1/2">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-4">Who We Are</h2>
//           <p className="text-gray-600 leading-7">
//             Founded in [Year], we’ve grown from a small local print shop to a comprehensive provider of digital and traditional printing services. Our experienced team works passionately to turn your vision into reality through precise, creative, and impactful print products.
//           </p>
//         </div>
//       </section>

//       {/* ----------- WHY CHOOSE US SECTION ----------- */}
//       <section className="w-full bg-[#F3F6F9] py-12 px-4 md:px-20 flex flex-col lg:flex-row-reverse items-center gap-12">
//         <div className="w-full lg:w-1/2">
//           <Image
//             src="/images/about2.png" // Replace with actual image path
//             alt="Why choose us"
//             width={600}
//             height={400}
//             className="rounded-xl object-cover w-full"
//           />
//         </div>
//         <div className="w-full lg:w-1/2">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-4">Why Choose Us</h2>
//           <ul className="list-disc pl-5 text-gray-600 space-y-2">
//             <li>High-quality printing with premium materials</li>
//             <li>Fast turnaround and reliable delivery</li>
//             <li>Eco-friendly and sustainable options</li>
//             <li>Personalized customer support</li>
//             <li>Competitive pricing for all services</li>
//           </ul>
//         </div>
//       </section>

//       {/* ----------- OUR JOURNEY SECTION ----------- */}
//       <section className="w-full py-12 px-4 md:px-20 flex flex-col lg:flex-row items-center gap-12">
//         <div className="w-full lg:w-1/2">
//           <Image
//             src="/images/about3.png" // Replace with actual image path
//             alt="Our journey"
//             width={600}
//             height={400}
//             className="rounded-xl object-cover w-full"
//           />
//         </div>
//         <div className="w-full lg:w-1/2">
//           <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Journey</h2>
//           <p className="text-gray-600 leading-7 mb-4">
//             Over the years, we have expanded our capabilities, invested in the latest technologies, and continuously trained our staff to remain at the forefront of the printing industry.
//           </p>
//           <p className="text-gray-600 leading-7">
//             Our journey is defined by the relationships we've built and the impactful prints we've delivered. Join us as we continue to innovate and serve.
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// }


// components/AboutUs.js


'use client';

import React from 'react';
import './about.css';
import { useGetAboutUsQuery } from '@/store/api-services/about-us-api';
import AboutUsImage from "@public/images/aboutus.png";
import AboutVector from "@public/images/servicehero.jpg";



const AboutPage = () => {

  const { data: about, isLoading, isError } = useGetAboutUsQuery({});

  console.log('About Us Data:', about);
  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError || !about) return <p className="text-center py-10">Failed to load About Us content.</p>;

  return (
    <>
      <section className="flex items-center bg-blue-50 py-4 px-0 md:px-12 abouttop h-[250px] md:h-[282px]">
        <div className="w-full mx-auto flex md:justify-center items-center">
          <h2 className='text-3xl lg:text-4xl text-center md:text-left'> Expert Solutions for Modern Business Challenges: Simplify Compliance Focus on Growth.</h2>
          <div className="hidden lg:block flex-shrink-0 rounded-md aboutimg">

            {/* <img src={about?.bannerImage || AboutUsImage.src} alt="About Us" className="w-full h-full object-cover rounded-4xl" /> */}
          </div>
        </div>
      </section>
      <section className='hidden lg:block mt-12 py-4 px-12'>
        <div className="container mx-auto flex gap-16 justify-between items-center">
          <div className="w-1/2">
            <div className="image-conainer">
              <img src="/images/tax.webp" alt='about' />
            </div>
          </div>
          <div className="w-1/2">
            <h2 className="text-4xl text-[#00457C]">{about?.title}</h2>
            <p className="text-lg mt-4 text-[#333]" dangerouslySetInnerHTML={{ __html: about?.description }}></p>
          </div>
        </div>
      </section>

      <section className='flex flex-col mt-10 lg:hidden px-12 py-4 space-y-5'>
        <h2 className="text-3xl text-[#00457C] text-center">{about?.title}</h2>
        <div className="image-conainer">
          <img src="/images/tax.webp" alt='about' />
        </div>
        <p className="text-lg mt-4 text-[#333]" dangerouslySetInnerHTML={{ __html: about?.description }}></p>
      </section>

      <section className="mt-12 mb-20 px-12">
        {/* <div className="flex flex-col w-[500px] mx-auto">
          <h1 className="text-4xl  pb-5 w-[484px] flex justify-between">
          
            Why our clients trust us?
          </h1>
          <div className="w-[283px] mx-auto">
            <img src="/images/aboutvector.png" alt="vector" />
          </div>
        </div> */}

        {about?.contentSections?.map((section: any, index: number) => (

          <>

            <div
              key={section._id}
              className={`hidden lg:flex py-3 pb-5 my-10 gap-12 justify-evenly ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
            >
              <div className="w-1/2 flex flex-col justify-center about-illustration">
                <h1 className="text-4xl text-[#00457C] mb-8">{section.title}</h1>
                <div className="w-3/4 text-[#333]" dangerouslySetInnerHTML={{ __html: section.content }}>
                  {/* {section.content} */}
                </div>
              </div>
              <div className="w-1/2">
                <div className="image-conainer">
                  <img src={section.image || AboutVector.src} alt={section.title} className="object-contain w-full h-full" />
                </div>
              </div>
            </div>

            <div key={section._id} className='flex flex-col gap-5 lg:hidden'>
              <h1 className="text-4xl text-[#00457C] mb-8">{section.title}</h1>
              <div className="image-conainer">
                <img src={section.image || AboutVector.src} alt={section.title} className="object-contain w-full h-full" />
              </div>
              <div className=" text-[#333]" dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>

          </>
        ))}
      </section>
    </>
  );
};

export default AboutPage;
