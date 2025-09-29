'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import GetRegistrationForm from '@/components/ServicePageComponent/CTAForms/GetRegistrationForm';
import FreeConsultationForm from '@/components/ServicePageComponent/CTAForms/FreeConsultationForm';

function CTApage() {
  const searchParams = useSearchParams();
  const formtype = searchParams.get('type');

  return (
    <>
      <div className='flex justify-center flex-row'>
        <div className='flex flex-col justify-center items-center w-1/2'>
          <div>
            <h1 className='text-2xl md:text-3xl text-[#00457C] text-center md:text-left'>50,000+ <span className='text-black'>Business registered</span></h1>
            <h3 className='text-lg md:text-xl mt-3 text-center md:text-left'>10% of all Indian businesses register with us</h3>
            <ul className='flex flex-col md:block list-disc mt-8 space-y-6'>
              <li>
                <p className='text-md'>Company registration in under 7-14 days
                  <br></br>
                  <small> Expand your business without having to wait</small>
                </p>

              </li>
              <li>
                <p className='text-md'>24 x 7 expert support
                  <br></br>
                  <small>
                    Minimize challenges and maximize productivity
                  </small>
                </p>
              </li>
              <li>
                <p className='text-md'>100% online process
                  <br></br>
                  <small>
                    Start business from the comfort of your home
                  </small>
                </p>

              </li>
            </ul>
          </div>
        </div>
        <div className='flex justify-center items-center w-1/2'>
          {formtype === 'get-registration' && <GetRegistrationForm />}
          {formtype === 'free-consultation' && <FreeConsultationForm />}
          {!formtype ||
            (formtype !== 'get-registration' && formtype !== 'free-consultation') && (
              <div className="text-center text-red-600 mt-20">Invalid or missing form type.</div>
            )}
        </div>
      </div>
    </>
  );
}

export default function FormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CTApage />
    </Suspense>
  );
};
