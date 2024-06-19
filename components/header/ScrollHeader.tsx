"use client";
import { useEffect, ReactNode } from "react";

interface ScrollHeaderProps {
  children: ReactNode;
}

export default function ScrollHeader({ children }: ScrollHeaderProps) {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("main-header");
      if (window.scrollY > 50) {
        header?.classList.add("bg-black");
        header?.classList.remove("bg-transparent");
      } else {
        header?.classList.add("bg-transparent");
        header?.classList.remove("bg-black");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      id="main-header"
      className="fixed w-full p-5 transition-all duration-200 bg-transparent z-50"
    >
      {children}
    </header>
  );
}
