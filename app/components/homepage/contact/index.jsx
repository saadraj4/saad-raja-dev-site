"use client";

import { useState } from "react";
import Link from "next/link";
import { personalData } from "@/utils/data/personal-data";
import Reveal from "../../reveal";
import { FiMail, FiCopy, FiCheck, FiArrowRight } from "react-icons/fi";
import { toast } from "react-toastify";

function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 border-t border-line bg-white">
      <div className="wrap">
        <Reveal className="contact-hero">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              Ready When You Are
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Have a product you need built or fixed?
            </h2>

            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto">
              Tell me what you&apos;re trying to solve. I&apos;ll give you an
              honest evaluation of whether I&apos;m the right fit, the
              architecture required, and what it takes to get it live.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={`mailto:${personalData.email}?subject=Project%20Inquiry%20-%20Saad%20Raja`}
                className="btn-primary !text-base !py-3.5 !px-7 w-full sm:w-auto justify-center"
              >
                <FiMail size={18} />
                <span>Email: {personalData.email}</span>
                <FiArrowRight size={16} />
              </Link>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/20 text-sm font-semibold transition-all w-full sm:w-auto cursor-pointer"
              >
                {copied ? <FiCheck size={16} className="text-green-400" /> : <FiCopy size={16} />}
                <span>{copied ? "Copied to Clipboard!" : "Copy Email"}</span>
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span>Typically responds within 24 hours · Direct engineer contact</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default ContactSection;