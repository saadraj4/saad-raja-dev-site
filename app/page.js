import dynamic from "next/dynamic";
import HeroSection from "./components/homepage/hero-section";

// Keep only the above-the-fold section as a static import.
// Everything below gets code-split into its own chunk and
const WhatICanDo = dynamic(() => import("./components/homepage/what-i-can-do"));
const HowIDoIt = dynamic(() => import("./components/homepage/how-i-do-it"));
const CodeShowcase = dynamic(() => import("./components/homepage/code-showcase"));
const Testimonials = dynamic(() => import("./components/homepage/testimonials"));
const WhyMe = dynamic(() => import("./components/homepage/why-me"));
const WorkSection = dynamic(() => import("./components/homepage/projects"));
const Experience = dynamic(() => import("./components/homepage/experience"));
const Skills = dynamic(() => import("./components/homepage/skills"));
const ContactSection = dynamic(() => import("./components/homepage/contact"));
const LinkedInRecommendations = dynamic(() => import("./components/homepage/linkedin-recommendation"));
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
      {/* <LinkedInRecommendations /> */}
      <Skills />
      <ContactSection />
    </>
  );
}