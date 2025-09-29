"use client";

import React, { useState, useEffect } from "react";
import PricingPlans from "./PricingPlans";
import {
  useGetStatesQuery,
  useGetPlansByStateQuery,
} from "@/store/api-services/subscriptionPlanApi";

interface PricingSelectorProps {
  subscriptionData: any[]; // Default plans (filtered by currentService)
  currentService: string;
  service: any; // Current service ID
}

export default function PricingSelector({
  subscriptionData,
  currentService,
  service,
}: PricingSelectorProps) {
  const {
    data: statesData,
    isLoading: isStatesLoading,
    error,
  } = useGetStatesQuery({});

  const [selectedStateId, setSelectedStateId] = useState<string>(""); // no default selection
  const [selectedStateName, setSelectedStateName] = useState<string>("");
  const [filteredPlans, setFilteredPlans] = useState<any[]>(subscriptionData);
  const [stateFee, setStateFee] = useState<number>(0);

  const {
    data: statePlans,
    isFetching: isStatePlansLoading,
    refetch: refetchStatePlans,
  } = useGetPlansByStateQuery(selectedStateId, {
    skip: !selectedStateId, // skip API call if no state selected
  });

  // When selectedStateId changes, update stateFee and selectedStateName
  useEffect(() => {
    if (!selectedStateId) {
      // No state selected - reset fee and name and show default plans
      setSelectedStateName("");
      setStateFee(0);
      setFilteredPlans(subscriptionData);
      return;
    }

    const found = statesData?.find((s) => s._id === selectedStateId);
    if (found) {
      setSelectedStateName(found.name);
      setStateFee(found.fee || 0);
    }
  }, [selectedStateId, statesData, subscriptionData]);

  // Update filteredPlans whenever statePlans or currentService changes
  useEffect(() => {
    if (!selectedStateId) {
      // If no state selected, use default subscriptionData
      setFilteredPlans(subscriptionData);
      setStateFee(0);
      return;
    }

    if (statePlans) {
      const matchedPlans = statePlans.filter(
        (plan: any) => plan.serviceId?._id?.toString() === currentService
      );
      setFilteredPlans(matchedPlans);
    }
  }, [statePlans, selectedStateId, currentService, subscriptionData]);

  // Handle manual state change
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedStateId(id);
    setFilteredPlans([]); // reset
    setStateFee(0);
    setSelectedStateName("");

    if (id) {
      // trigger fresh API fetch even if cached
      setTimeout(() => {
        refetchStatePlans();
      }, 0);
    }
  };
  if (
    (!subscriptionData || subscriptionData.length === 0) &&
    (!filteredPlans || filteredPlans.length === 0)
  ) {
    return null;
  }

  if (isStatesLoading) return <p>Loading states...</p>;
  if (error) return <p>Error loading states.</p>;

  return (
    <div className="bg-gray-50 py-12 px-0 pb-0 text-center">
      <div className="custom-container">
        <div className="flex flex-col items-center space-y-8 md:space-y-10">
          <div className="text-center mb-12 lg:mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
              Right Plan for {" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-800">
                Your Business
              </span>
            </h3>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Compliance Doctor&apos;s incorporation experts register over 1500
              companies every month.
            </p>
          </div>
          <div className="flex flex-col items-center w-full max-w-xl bg-white border border-[#EDEDED] px-5 py-6 gap-5">
            <h1 className="text-[18px] md:text-[19px] text-gray-900 text-center font-medium">
              Select your state to view the Government Fee
            </h1>
            <select
              value={selectedStateId}
              onChange={handleStateChange}
              className="rounded-md border border-gray-300 px-4 py-2 w-full md:w-auto"
            >
              <option value="">Select your state</option>
              {statesData?.map((state) => (
                <option key={state._id} value={state._id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-10 px-0">
          {isStatePlansLoading ? (
            <p>Loading plans for selected state...</p>
          ) : filteredPlans.length > 0 ? (
            <PricingPlans
              stateFee={stateFee}
              subscriptionData={filteredPlans}
              service={service}
            />
          ) : selectedStateId ? (
            <p className="text-red-600 font-medium">
              No plans available in <strong>{selectedStateName}</strong> for
              this service.
            </p>
          ) : (
            <PricingPlans
              stateFee={0}
              subscriptionData={subscriptionData}
              service={service}
            />
          )}
        </div>
      </div>
    </div>
  );
}
