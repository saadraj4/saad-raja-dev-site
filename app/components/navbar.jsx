"use client";

import Link from "next/link";
import { personalData } from "@/utils/data/personal-data";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";

function Navbar() {
  return (
    <nav className="site-nav">
      <div className="nav-container">
        <div className="flex items-center gap-3">
          <Link href="/" className="nav-logo">
            <span className="font-extrabold text-[17px] tracking-tight">
              Saad Raja
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
          <Link href="#solve" className="nav-link">
            What I Solve
          </Link>
          <Link href="#stack" className="nav-link">
            Stack
          </Link>
          <Link href="#work" className="nav-link">
            Production Work
          </Link>
          <Link href="#experience" className="nav-link">
            Experience
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={personalData.resume}
            target="_blank"
            download
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg border border-line hover:border-ink transition-colors text-ink"
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