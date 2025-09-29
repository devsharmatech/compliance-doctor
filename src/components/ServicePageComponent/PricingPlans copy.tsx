'use client';

import React from 'react';
import { Heart, Bolt, Crown, Rocket } from 'lucide-react';
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
}

const iconMap: Record<string, React.ElementType> = {
  starter: Heart,
  platinum: Crown,
  gold: Bolt,
  growth: Rocket,
};

export default function PricingPlans({ stateFee, subscriptionData }: PricingPlansProps) {
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

              <h2 className="mb-1">{plan.name}</h2>
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

             

              <h3 className="mt-4 font-semibold ">What you'll get</h3>
              <ul className="mt-2 space-y-1">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start gap-2">
                    <span className=" font-bold text-lg background-circle">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

             <button
  className={`w-[200px] h-[51px] mt-5 text-black bg-white shadow-lg p-3 text-lg registerbtn ${
    idx % 2 === 0 ? 'inset-shadow-sm inset-shadow-[#326EE6]' : ''
  }`}
>
  Get Started
</button>


              {/* <button onClick={() => handleGetStarted(plan)} className={`w-[200px] h-[51px] mt-5 text-black hover:cursor-pointer bg-white shadow-lg p-3 text-lg registerbtn ${index % 2 === 0 ? 'inset-shadow-sm inset-shadow-[#326EE6]' : ''}`}>Get Started</button> */}
            </div>
          );
        })}
        {/* {subscriptionData.map((plan, idx) => (
          
          <div
            key={plan._id}
            className={`border rounded-xl p-6 shadow-sm ${
              idx === 1 ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
            }`}
          >
             <h2 className="text-xl font-semibold mb-1">{plan.name}</h2>
              <p className="text-sm text-gray-500 mb-2">
              {plan.description}
            </p>
            <div className='flex flex-row items-center gap-5'>
                <div className='line-through text-xl text-[#858C93]'>₹{plan.durationInDays}</div>
                <div className='px-2 py-1 bg-[#0258F8] text-white rounded-2xl text-xs'>{Math.round(((plan.durationInDays- plan.price) / plan.durationInDays) * 100)}% off</div>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              + ₹{plan.price.toLocaleString()} (to be paid later)
            </p>
           
           

          
            {plan.discount && (
              <div className="flex items-center gap-2 text-sm mb-1">
                <span className="text-green-600 font-medium">{plan.discount}</span>
              </div>
            )}

            <div className="text-3xl font-bold text-black mb-1">
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
              <p className="text-sm text-yellow-600 mb-3 font-medium">
                🏆 Unlock partner benefits <br />
                {plan.benefits}
              </p>
            )}

            <button
              className="w-full font-semibold py-2 rounded-lg border bg-white text-black"
            >
              Get Started
            </button>

            <h3 className="mt-4 font-semibold text-black">What you'll get</h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-800">
              {plan.features.map((feature, fidx) => (
                <li key={fidx} className="flex items-start gap-2">
                  <span className="text-green-600 font-bold text-lg">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))} */}
      </div>
    </section>
  );
}
