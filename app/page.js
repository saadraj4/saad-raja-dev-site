import HeroSection from "./components/homepage/hero-section";
import WhatICanDo from "./components/homepage/what-i-can-do";
import HowIDoIt from "./components/homepage/how-i-do-it";
import CodeShowcase from "./components/homepage/code-showcase";
import Testimonials from "./components/homepage/testimonials";
import WhyMe from "./components/homepage/why-me";
import WorkSection from "./components/homepage/projects";
import Experience from "./components/homepage/experience";
import Skills from "./components/homepage/skills";
import ContactSection from "./components/homepage/contact";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhatICanDo />
      <HowIDoIt />
      <CodeShowcase />
      <Testimonials />
      <WhyMe />
      <WorkSection />
      <Experience />
      <Skills />
      <ContactSection />
    </>
  );
}