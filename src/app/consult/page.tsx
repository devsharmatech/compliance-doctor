"use client";

import React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SectionLoader } from "@/components/ui";
import dynamic from "next/dynamic";

const DynamicConsultTalk = dynamic(()=> import("@/components/ConsultExpert/DynamicConsultPage"),{ssr:false, loading: ()=> <SectionLoader/>})

function ConsultContent() {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");


    return (
        <>
        <div><DynamicConsultTalk /></div>
        </>
    );
    
}

export default function Consult() {
    return (
        <Suspense fallback={<SectionLoader />}>
            <ConsultContent />
        </Suspense>
    );
}