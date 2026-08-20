"use client";

import Link from "next/link";
import { personalData } from "@/utils/data/personal-data";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";

function Navbar() {
  return (
    <nav className="site-nav shadow-sm">
      <div className="nav-container">
        <div className="flex items-center gap-3">
          <Link href="/" className="nav-logo group">
            <span className="font-extrabold text-[17px] tracking-tight relative">
              Saad Raja
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </span>
          </Link>
          <div className="hidden sm:flex items-center">
            <span className="status-badge">
              <span className="status-dot"></span>
              Available for new projects
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-[13.5px] font-medium text-muted">
          <Link href="#solve" className="nav-link relative group">
            What I Solve
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="#stack" className="nav-link relative group">
            Stack
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="#work" className="nav-link relative group">
            Production Work
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="#experience" className="nav-link relative group">
            Experience
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={personalData.resume}
            target="_blank"
            download
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg border border-line hover:border-accent hover:text-accent transition-all hover:shadow-sm bg-white/80 backdrop-blur-sm"
          >
            <FiDownload size={13} />
            <span>Resume</span>
          </Link>
          <Link href="#contact" className="nav-btn">
            <span>Get in Touch</span>
            <FiArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;