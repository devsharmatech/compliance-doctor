"use client";

const ServicesHero= dynamic(()=> import("@/components/ServicePageComponent/ServiceHero"),{ssr:false, loading: ()=> <SectionLoader/>});
const ServicesList = dynamic(()=>import("@/components/ServicePageComponent/ServiceList"),{ssr:false, loading: ()=> <SectionLoader/>});
const StartupServices = dynamic(()=>import("@/components/ServicePageComponent/startup-services"),{ssr:false, loading: ()=> <SectionLoader/>});
import { useSearchParams } from "next/navigation";
import { useGetServiceByTypeQuery } from "@/store/api-services/service-api";
import { useEffect, Suspense } from "react";
import { SectionLoader } from "@/components/ui";
import dynamic from "next/dynamic";

function ServicesContent() {
  const searchParam = useSearchParams();
  const type = searchParam.get("service");

  const {
    data = [],
    isLoading,
    isError,
  } = useGetServiceByTypeQuery({ type, limit: 100, page: 1 }, { skip: !type });

  useEffect(() => {
    document.title = type ? `Services - ${type}` : "Services";
  }, [type]);

  return (
    <div className="flex flex-col items-center justify-center h-auto bg-white w-full">
      {isLoading && <SectionLoader />}
      {type ? (
        <StartupServices data={data} isLoading={isLoading} isError={isError} />
      ) : (
        <ServicesHero />
      )}
      <ServicesList />
    </div>
  );
}

export default function Services() {
  return (
    <Suspense fallback={<SectionLoader />}>
      <ServicesContent />
    </Suspense>
  );
}
