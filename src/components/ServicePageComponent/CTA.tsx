import React from 'react'
import { useRouter } from 'next/navigation';

const ctaData = [
  {
    service: "Goods & Services Tax (GST)",
    content: {
      headline: "Navigate GST with Confidence. Ensure Seamless Compliance.",
      description: "Don't let the complexities of GST burden your business. Partner with Compliance Doctor for expert guidance and digital solutions that make tax management simple, transparent, and efficient."
    }
  },
  {
    service: "UDYAM Registration",
    content: {
      headline: "Unlock Growth Opportunities. Get Your UDYAM Registration Today!",
      description: "Formalize your MSME and tap into a wealth of government support. Compliance Doctor makes UDYAM Registration simple and swift."
    }
  },
  {
    service: "Registrations",
    content: {
      headline: "Seamless Registrations for Your Business Success.",
      description: "Don't let complex registration processes hold you back. Partner with Compliance Doctor for efficient, expert-driven assistance to ensure your business is fully compliant from day one."
    }
  },
  {
    service: "Trademark Services",
    content: {
      headline: "Protect Your Vision. Secure Your Brand.",
      description: "Your brand is your identity. Don't leave it vulnerable. Partner with Compliance Doctor for expert-driven trademark services that secure your intellectual property and fuel your business growth."
    }
  },
  {
    service: "Ministry of Corporate Affairs",
    content: {
      headline: "Secure Your Corporate Standing. Achieve Seamless Compliance.",
      description: "Don't let the intricacies of MCA regulations become a burden. Partner with Compliance Doctor for expert corporate secretarial services that ensure your entity's continuous legal compliance and robust governance."
    }
  },
  {
    service: "Income Tax Services",
    content: {
      headline: "Simplify Your Taxes. Maximize Your Savings.",
      description: "Don't let income tax complexities add to your stress. Partner with Compliance Doctor for expert guidance and seamless tax management solutions that ensure compliance and optimize your financial outcomes."
    }
  },
];

interface Props {
  service: {
    name: string;
  }
}

const CTA = ({ service }: Props) => {

  const router = useRouter();

  const cta = ctaData.find(item => item.service === service.name);

  return cta ? (
    <>
      <div className='flex flex-col gap-4 px-12 mt-16 mb-5'>
        <h1 className='text-3xl font-bold'>{cta.content.headline}</h1>
        <p className='text-gray-700'>{cta.content.description}</p>
      </div>
      <div className='flex gap-4 px-12 mb-5'>
        <button onClick={() => router.push('/cta-forms?type=get-registration')} className='bg-[#FBA61F] text-white p-3 rounded-lg text-sm hover:shadow-md cursor-pointer'>Get your registration done</button>
        <button onClick={() => router.push('/cta-forms?type=free-consultation')} className='bg-[#FBA61F] text-white p-3 rounded-lg text-sm hover:shadow-md cursor-pointer'>Request a Free Consultation</button>
      </div>
    </>
  ) : null;
}

export default CTA