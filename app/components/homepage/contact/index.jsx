"use client";

import { useState } from "react";
import Link from "next/link";
import { personalData } from "@/utils/data/personal-data";
import Reveal from "../../reveal";
import ContactForm from "./contactForm";
import { FiMail, FiCopy, FiCheck, FiArrowUpRight, FiPhone, FiMapPin } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter, FaStackOverflow, FaFacebook, FaInstagram } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import MagneticCard from "../../motion/magnetic-card";

function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const socials = [
    { name: "GitHub", url: personalData.github, icon: FaGithub, color: "hover:text-[#24292f] hover:bg-[#24292f]/5" },
    { name: "LinkedIn", url: personalData.linkedIn, icon: FaLinkedin, color: "hover:text-[#0077b5] hover:bg-[#0077b5]/5" },
    { name: "Twitter", url: personalData.twitter, icon: FaTwitter, color: "hover:text-[#1da1f2] hover:bg-[#1da1f2]/5" },
    { name: "StackOverflow", url: personalData.stackOverflow, icon: FaStackOverflow, color: "hover:text-[#f48024] hover:bg-[#f48024]/5" },
    { name: "Facebook", url: personalData.facebook, icon: FaFacebook, color: "hover:text-[#1877f2] hover:bg-[#1877f2]/5" },
    { name: "Instagram", url: personalData.instagram, icon: FaInstagram, color: "hover:text-[#e1306c] hover:bg-[#e1306c]/5" },
  ];

  return (
    <section id="contact" className="py-12 border-t border-line section-elevated overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-accent/8 via-accent/4 to-transparent rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-blue-500/6 to-transparent rounded-full blur-[100px] pointer-events-none translate-x-1/3 translate-y-1/3" />
      
      <div className="wrap relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal direction="left" delay={0.1}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                Contact Direct
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight leading-tight">
                Let&apos;s build the next thing.
              </h2>

              <p className="mt-5 text-sm sm:text-base text-muted leading-relaxed">
                Tell me what you&apos;re trying to solve. I&apos;ll give you an
                honest evaluation of whether I&apos;m the right fit, the
                architecture required, and what it takes to get it live.
              </p>
            </Reveal>

            {/* Direct Contact Details Cards */}
            <div className="space-y-3">
              <Reveal direction="left" delay={0.15}>
                <MagneticCard intensity={3}>
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-line glass-card layer-2 hover:border-accent/30 transition-all hover:shadow-lg">
                    <div className="w-10 h-10 rounded-lg bg-accent-tint text-accent flex items-center justify-center shrink-0">
                      <FiMail size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Email Address</p>
                      <p className="text-sm font-semibold text-ink truncate select-all">{personalData.email}</p>
                    </div>
                    <button 
                      onClick={handleCopyEmail}
                      className="p-2 text-muted hover:text-accent rounded-lg hover:bg-bg-soft transition-colors cursor-pointer"
                      title="Copy Email"
                    >
                      {copied ? <FiCheck size={16} className="text-green-500" /> : <FiCopy size={16} />}
                    </button>
                  </div>
                </MagneticCard>
              </Reveal>

              <Reveal direction="left" delay={0.2}>
                <MagneticCard intensity={3}>
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-line glass-card layer-2 hover:border-accent/30 transition-all hover:shadow-lg">
                    <div className="w-10 h-10 rounded-lg bg-accent-tint text-accent flex items-center justify-center shrink-0">
                      <FiPhone size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Phone</p>
                      <p className="text-sm font-semibold text-ink">{personalData.phone}</p>
                    </div>
                  </div>
                </MagneticCard>
              </Reveal>

              <Reveal direction="left" delay={0.25}>
                <MagneticCard intensity={3}>
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-line glass-card layer-2 hover:border-accent/30 transition-all hover:shadow-lg">
                    <div className="w-10 h-10 rounded-lg bg-accent-tint text-accent flex items-center justify-center shrink-0">
                      <FiMapPin size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Location</p>
                      <p className="text-sm font-semibold text-ink">{personalData.address}</p>
                    </div>
                  </div>
                </MagneticCard>
              </Reveal>
            </div>

            {/* Social Grid */}
            <Reveal direction="left" delay={0.3} className="space-y-3">
              <p className="text-[10px] font-bold text-muted-2 uppercase tracking-wider">Social Links</p>
              <div className="flex flex-wrap gap-2">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-lg border border-line glass-card text-muted transition-all flex items-center justify-center layer-2 hover:shadow-md ${social.color}`}
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={social.name}
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <Reveal direction="right" delay={0.2}>
              <ContactForm />
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ContactSection;