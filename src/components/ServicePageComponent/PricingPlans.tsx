"use client";

import React, { ReactElement, useState } from "react";
import { Heart, Bolt, Crown, Rocket, X, Check, Star } from "lucide-react";
import { useParams } from "next/navigation";
import { useSubmitFormMutation } from "@/store/api-services/form-submission-api";

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

export default function PricingPlans({
  stateFee,
  subscriptionData,
  service,
}: PricingPlansProps) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [submitForm] = useSubmitFormMutation();
  const params = useParams();
  const [formData, setFormData] = useState<any>({
    companyName: "",
    gstNo: "",
    userName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

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
      type: "service",
      data: payload,
    }).unwrap();

    setFormData({
      companyName: "",
      gstNo: "",
      userName: "",
      email: "",
      phone: "",
    });
    setSelectedPlan(null);
    alert("Your request has been submitted successfully!");
  };

  return (
    <section className="w-full py-16 px-0 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        
        <div className="text-center mb-12 lg:mb-16">
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
            Choose Your {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-800">
              Perfect Plan
            </span>
          </h3>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Flexible pricing options designed to grow with your business. Start
            small, scale big.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {subscriptionData.map((plan, idx) => {
            const typeKey = plan.planType?.toLowerCase().trim();
            const Icon = iconMap[typeKey] || Heart;
            const isPopular = idx === 1;

            return (
              <div
                key={plan._id}
                className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  isPopular
                    ? "bg-gradient-to-br from-blue-700 to-blue-900 text-white shadow-2xl border-2 border-blue-500"
                    : "bg-white border border-blue-200 shadow-lg"
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`p-3 rounded-xl ${
                      isPopular ? "bg-blue-600" : "bg-blue-100"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isPopular ? "text-white" : "text-blue-700"
                      }`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`text-2xl font-bold ${
                        isPopular ? "text-white" : "text-blue-900"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <span
                      className={`text-sm mb-0 ${
                        isPopular ? "text-blue-100" : "text-blue-600"
                      }`}
                      style={{ lineHeight: "1.5", marginBottom: "0" }}
                    >
                      {plan.description}
                    </span>
                  </div>
                </div>

                {/* Pricing Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="line-through text-lg text-gray-500">
                      ₹{plan.durationInDays}
                    </div>
                    <div className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs font-bold">
                      {Math.round(
                        ((plan.durationInDays - plan.price) /
                          plan.durationInDays) *
                          100
                      )}
                      % OFF
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      className={`text-4xl font-bold ${
                        isPopular ? "text-white" : "text-blue-900"
                      }`}
                    >
                      ₹{plan.price.toLocaleString()}
                    </span>
                    <span
                      className={`text-sm ${
                        isPopular ? "text-blue-200" : "text-gray-500"
                      }`}
                    >
                      + ₹{plan.price.toLocaleString()} (later)
                    </span>
                  </div>

                  <span
                    className={`text-sm ${
                      isPopular ? "text-white" : "text-gray-600"
                    }`}
                  >
                    Total Due: ₹{(plan.price + stateFee).toLocaleString()}
                  </span>
                </div>

                {/* Cashback & Benefits */}
                {plan.cashback && (
                  <div
                    className={`p-4 rounded-xl mb-4 ${
                      isPopular ? "bg-blue-600" : "bg-blue-50"
                    }`}
                  >
                    <span
                      className={`text-sm font-semibold ${
                        isPopular ? "text-white" : "text-blue-800"
                      }`}
                    >
                      {plan.cashback}
                    </span>
                    <span
                      className={`text-xs mt-1 ${
                        isPopular ? "text-blue-100" : "text-blue-600"
                      }`}
                    >
                      Unlock cashback benefits upon opening a current account
                      with our partner banks.{" "}
                      <a href="#" className="underline font-semibold">
                        T&C
                      </a>
                    </span>
                  </div>
                )}

                {plan.benefits && (
                  <div
                    className={`p-3 rounded-lg mb-4 border ${
                      isPopular ? "border-blue-500" : "border-blue-200"
                    }`}
                  >
                    <span
                      className={`text-sm font-semibold ${
                        isPopular ? "text-white" : "text-blue-800"
                      }`}
                    >
                      🎁 Partner Benefits
                    </span>
                    <span
                      className={`text-xs mt-1 ${
                        isPopular ? "text-blue-100" : "text-blue-600"
                      }`}
                    >
                      {plan.benefits}
                    </span>
                  </div>
                )}

                {/* Features List */}
                <div className="mb-6">
                  <h3
                    className={`font-semibold mb-3 ${
                      isPopular ? "text-blue-100" : "text-blue-900"
                    }`}
                  >
                    What You'll Get:
                  </h3>
                  {Array.isArray(plan?.features) ? (
                    <ul className="space-y-3">
                      {plan.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-start gap-3">
                          <Check
                            className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                              isPopular ? "text-green-300" : "text-green-500"
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              isPopular ? "text-blue-100" : "text-gray-700"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div
                      className={`text-sm ${
                        isPopular ? "text-blue-100" : "text-gray-700"
                      }`}
                      dangerouslySetInnerHTML={{ __html: plan.features }}
                    />
                  )}
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={() => setSelectedPlan(plan)}
                  style={{ cursor: "pointer" }}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    isPopular
                      ? "bg-white text-blue-700 hover:bg-blue-50 hover:shadow-lg"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
                  }`}
                >
                  Get Started
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-2">
                You selected: {selectedPlan.name}
              </h3>
              <p className="text-gray-600">
                Complete your registration to get started
              </p>
            </div>

            {/* Plan Summary */}
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-700 font-semibold">Plan Type:</span>
                <span className="text-blue-900 font-bold">
                  {selectedPlan.planType}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-700 font-semibold">Amount:</span>
                <span className="text-2xl font-bold text-blue-900">
                  ₹{selectedPlan.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Customer Info Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {service?.formFields &&
                service.formFields.length > 0 &&
                service.formFields.map((field: any, index: number) => (
                  <div key={index}>
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      placeholder={field.placeholder || field.name}
                      required={field.required || false}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                ))}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
