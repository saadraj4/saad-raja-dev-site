"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const DEFAULT_BTN_CLS =
  "fixed bottom-8 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-ink text-white shadow-md hover:bg-accent transition-all duration-200 ease-out";
const SCROLL_THRESHOLD = 200;

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll, { passive: true });
    };
  }, []);

  const onClickBtn = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  return (
    <button
      aria-label="Scroll to top"
      className={DEFAULT_BTN_CLS}
      onClick={onClickBtn}
    >
      <FaArrowUp size={14} />
    </button>
  );
};

export default ScrollToTop;
