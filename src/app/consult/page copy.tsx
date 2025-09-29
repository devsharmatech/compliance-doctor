"use client";

import React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
// import TalkLawyer from "@/components/ConsultExpert/TalkLawyer";
// import CAService from "@/components/ConsultExpert/CAServices";
// import TalkSecretary from "@/components/ConsultExpert/TalkSecretary";
// import TalkIP from "@/components/ConsultExpert/TalkIP";
import { SectionLoader } from "@/components/ui";
import dynamic from "next/dynamic";
// import DynamicConsultTalk from "@/components/ConsultExpert/DynamicConsultPage";
const DynamicConsultTalk = dynamic(()=> import("@/components/ConsultExpert/DynamicConsultPage"),{ssr:false, loading: ()=> <SectionLoader/>})

function ConsultContent() {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");

    // if(type === "Talk to a Lawyer") {
    //     return <TalkLawyer />;
    // }
    // else if(type === "CA Services") {
    //     return <CAService />;
    // }
    // else if(type === "Talk to a Company Secretary") {
    //     return <TalkSecretary />;
    // }
    // else if(type === "Talk to a IP/Trademark Lawyer") {
    //     return <TalkIP />;
    // }

    return (
        <>
        <div><DynamicConsultTalk /></div>
        {/* <div>No type match</div> */}
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