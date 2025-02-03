import Faqs from "@/components/homepage/faqs";
import FifthSection from "@/components/homepage/fifth-section";
import Footer from "@/components/homepage/footer";
import FourthSection from "@/components/homepage/fourth-section";
import HeroSection from "@/components/homepage/hero-section";
import LastSection from "@/components/homepage/last-section";
import JoinNewsLetter from "@/components/homepage/news-letter";
import PlanSmart from "@/components/homepage/plan-smarter";
import PopularServices from "@/components/homepage/popular-services";
import SecondSection from "@/components/homepage/second-section";
import SixthSection from "@/components/homepage/sixth-section";
import ThirdSection from "@/components/homepage/third-section";
import { FloatingNav } from "@/components/navigations/floating-nav";
import React from "react";

function Home() {
  return (
    <>
      <FloatingNav />
      <HeroSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixthSection />
      <PopularServices/>
      <LastSection />
      <PlanSmart />
      <Faqs />
      <JoinNewsLetter/>
      <Footer/>
    </>
  );
}

export default Home;
