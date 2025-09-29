'use client';

import React, { ReactElement, useState } from 'react';
import { Heart, Bolt, Crown, Rocket, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useSubmitFormMutation } from '@/store/api-services/form-submission-api';
// import { IconType } from 'react-icons';

interface Plan {
  _id: string;
  name: string;
  description: string;
  price: number;
  durationInDays: number;
  planType: string;
  features: string[];
  discount?: string;
  cashback?: string;
  benefits?: string;

}

interface PricingPlansProps {
  stateFee: number;
  subscriptionData: Plan[];
  service: any;
}

const iconMap: Record<string, React.ElementType> = {
  starter: Heart,
  platinum: Crown,
  gold: Bolt,
  growth: Rocket,
};

export default function PricingPlans({ stateFee, subscriptionData, service }: PricingPlansProps) {
  const [selectedPlan, setSelectedPlan] = useState <Plan | null>(null);
  const [submitForm] = useSubmitFormMutation();
  const params = useParams();
  const [formData, setFormData] = useState<any>({
    companyName: '',
    gstNo: '',
    userName: '',
    email: '',
    phone: '',
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  };
    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();
      if(!selectedPlan) return;

      const payload = {
        ...formData,
        service: params.slug,
        planId: selectedPlan._id,
      planName: selectedPlan.name,
      price: selectedPlan.price,
      totalDue: selectedPlan.price + stateFee,

      };
      console.log("Submitting Customer Data:", payload);
    await submitForm({
      type: 'service',
      data:payload,
    }).unwrap();

     setFormData({ companyName: '', gstNo: '', userName: '', email: '', phone: '' });
    setSelectedPlan(null);
    alert("Your request has been submitted successfully!");
    }
  
  return (
    <section className="w-full py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-left plan">

        {subscriptionData.map((plan, idx) => {
          const typeKey = plan.planType?.toLowerCase().trim(); 
          const Icon = iconMap[typeKey] || Heart;

          return (
            <div
              key={plan._id}
              className={`border rounded-xl p-6  ${
                idx === 1 ? 'plan-bgactive border-blue-200 text-white'  : 'bg-white border-gray-200'
              }`}
            >
              {/* 👇 Plan Icon */}
              <Icon className="w-5 h-5 text-gray-600 mb-4" />

              <h3 className="mb-1 text-blue-700">{plan.name}</h3>
              <p className="mb-2">{plan.description}</p>

              <div className="flex flex-row items-center gap-5">
                <div className="line-through text-xl ">₹{plan.durationInDays}</div>
                <div className="px-2 py-1 bg-[#0258F8] text-white rounded-2xl text-xs">
                  {Math.round(((plan.durationInDays - plan.price) / plan.durationInDays) * 100)}% off
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                + ₹{plan.price.toLocaleString()} (to be paid later)
              </p>

              {plan.discount && (
                <div className="flex items-center gap-2 text-sm mb-1">
                  <span className=" font-medium">{plan.discount}</span>
                </div>
              )}

              <div className="text-3xl font-bold  mb-1">
                ₹{plan.price.toLocaleString()}
              </div>

              <p className="text-sm text-gray-600 mb-2">
                Total Due: ₹{(plan.price + stateFee).toLocaleString()}
              </p>

              {plan.cashback && (
                <p className="text-xs text-blue-700 mb-3">
                  <strong>{plan.cashback}</strong><br />
                  Unlock cashback benefits upon opening a current account with our partner banks.{' '}
                  <a href="#" className="underline text-blue-600">T&C</a>
                </p>
              )}

              {plan.benefits && (
                <p className="text-sm  mb-3 font-medium">
                   Unlock partner benefits <br />
                  {plan.benefits}
                </p>
              )}

             

              <h3 className="mt-4 font-semibold">What you&apos;ll get</h3>
              {Array.isArray(plan?.features) ? <ul className="mt-2 space-y-1">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start gap-2">
                    <span className=" font-bold text-lg background-circle">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

                :
                <div dangerouslySetInnerHTML={{__html:plan.features}}></div>}
             <button type='button'
             onClick={()=> setSelectedPlan(plan)}
  className={`w-[200px] h-[51px] mt-5 text-black bg-white shadow-lg p-3 text-lg registerbtn ${
    idx % 2 === 0 ? 'bg-green-custom' : ''
  }`}
>
  Get Started
</button>
            </div>
          );
        })}
        
      </div>

      {selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <X size={20} />
            </button>

            {/* Plan Summary */}
            <h2 className="text-xl font-bold mb-2">You selected: {selectedPlan.name}</h2>
            <p className="text-sm text-gray-600 mb-2">
              Plan Type: <span className="font-medium">{selectedPlan.planType}</span>
            </p>
            <p className="text-lg font-semibold mb-4">Amount: ₹{selectedPlan.price.toLocaleString()}</p>

            {/* Customer Info Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {service?.formFields && service.formFields.length > 0 && service.formFields.map((field:any, index: number) => (
                <input
                  key={index}
                  type={field.type || 'text'}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  placeholder={field.placeholder || field.name}
                  required={field.required || false}
                  className="w-full border p-2 rounded"
                />
              ))}
              {/* <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company Name"
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="gstNo"
                value={formData.gstNo}
                onChange={handleChange}
                placeholder="GST No."
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="w-full border p-2 rounded"
              /> */}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
