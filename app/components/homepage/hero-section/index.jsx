"use client";

import Link from "next/link";
import Reveal from "../../reveal";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

function HeroSection() {
  return (
    <header className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Background subtle radial glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-accent/5 blur-[120px] -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="wrap">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-tint border border-accent-border text-accent text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Outcome First Engineering
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-[4.2rem] font-extrabold leading-[1.08] tracking-tight text-ink max-w-[860px]">
            You bring the problem.
            <br />
            I bring the{" "}
            <span className="text-accent underline decoration-accent/30 decoration-wavy decoration-2 underline-offset-8">
              working product.
            </span>
          </h1>

          <p className="text-lg sm:text-xl leading-relaxed text-muted max-w-[620px] mt-7 font-normal">
            I build and ship web applications end to end — no half-finished
            handoffs, no &ldquo;it works on my machine.&rdquo; You describe what
            you need; I turn it into something live, tested, and actively used.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="#contact" className="btn-primary">
              <span>Tell me about your project</span>
              <FiArrowRight size={16} />
            </Link>
            <Link href="#work" className="btn-secondary">
              <span>See what I&apos;ve built</span>
            </Link>
          </div>
        </Reveal>

        {/* Proof metrics grid */}
        <Reveal delay={0.15}>
          <div className="mt-16 pt-8 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-bg-soft/60 border border-line/60">
              <div className="p-2 rounded-lg bg-accent/10 text-accent mt-0.5">
                <FiCheckCircle size={16} />
              </div>
              <div>
                <div className="text-sm font-bold text-ink">
                  3+ Years Shipping
                </div>
                <div className="text-xs text-muted mt-0.5">
                  Production web &amp; cloud systems
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-bg-soft/60 border border-line/60">
              <div className="p-2 rounded-lg bg-accent/10 text-accent mt-0.5">
                <FiCheckCircle size={16} />
              </div>
              <div>
                <div className="text-sm font-bold text-ink">
                  Global Experience
                </div>
                <div className="text-xs text-muted mt-0.5">
                  UAE, UK &amp; Pakistan client projects
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-bg-soft/60 border border-line/60">
              <div className="p-2 rounded-lg bg-accent/10 text-accent mt-0.5">
                <FiCheckCircle size={16} />
              </div>
              <div>
                <div className="text-sm font-bold text-ink">
                  Full-Stack Ownership
                </div>
                <div className="text-xs text-muted mt-0.5">
                  Blank repo to deployed architecture
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </header>
  );
}

export default HeroSection;