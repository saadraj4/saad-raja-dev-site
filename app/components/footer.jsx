import Link from "next/link";
import { personalData } from "@/utils/data/personal-data";
import { FiGithub, FiLinkedin, FiDownload, FiArrowUp } from "react-icons/fi";

function Footer() {
  return (
    <footer className="site-footer bg-white">
      <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-muted text-center sm:text-left">
          <span className="font-semibold text-ink">Saad Ahmed Raja</span> · Full Stack Software Engineer
          <div className="text-[11px] text-muted-2 mt-0.5">
            © {new Date().getFullYear()} All rights reserved · Rawalpindi, Pakistan
          </div>
        </div>

        <div className="flex items-center gap-5 text-xs font-semibold text-muted">
          <Link
            href={personalData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink transition-colors flex items-center gap-1"
          >
            <FiGithub size={13} />
            <span>GitHub</span>
          </Link>
          <Link
            href={personalData.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink transition-colors flex items-center gap-1"
          >
            <FiLinkedin size={13} />
            <span>LinkedIn</span>
          </Link>
          <Link
            href={personalData.resume}
            target="_blank"
            download
            className="hover:text-accent transition-colors flex items-center gap-1"
          >
            <FiDownload size={13} />
            <span>Resume</span>
          </Link>
          <a
            href="#"
            className="hover:text-ink transition-colors flex items-center gap-1 text-muted-2"
            title="Scroll to top"
          >
            <FiArrowUp size={13} />
            <span>Top</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;