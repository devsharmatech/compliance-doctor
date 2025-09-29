import Banners from "@/components/HomePageComponents/Banners";
import ContactUs from "@/components/HomePageComponents/ContactUs";
import FeatureWithImageSection from "@/components/HomePageComponents/Features";
import Hero from "@/components/HomePageComponents/Hero";
import Services from "@/components/HomePageComponents/Services";
import TestimonialSlider from "@/components/HomePageComponents/Testimonials";
import TimelineSection from "@/components/HomePageComponents/TimeLineSection";
import UpdateAlerts from "@/components/HomePageComponents/UpdateAlerts";
import FaqSection from "@/components/ServicePageComponent/FaqSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-1">
      <Hero />

      {/* <Services/> */}

      <UpdateAlerts />
      <FeatureWithImageSection />
      <Banners />
      <TestimonialSlider />
      <FaqSection faqs={null}/>
      <ContactUs />
    </div>
  );
}
