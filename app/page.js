import HeroSection from "./components/homepage/hero-section";
import WhatICanDo from "./components/homepage/what-i-can-do";
import HowIDoIt from "./components/homepage/how-i-do-it";
import WorkSection from "./components/homepage/projects";
import Experience from "./components/homepage/experience";
import ContactSection from "./components/homepage/contact";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhatICanDo />
      <HowIDoIt />
      <WorkSection />
      <Experience />
      <ContactSection />
    </>
  );
}