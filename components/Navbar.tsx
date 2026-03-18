"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Blur effect after slight scroll
      if (currentScrollY > 20) {
        setBlur(true);
      } else {
        setBlur(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY) {
        setShow(false); // scrolling down
      } else {
        setShow(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 
      ${show ? "translate-y-0" : "-translate-y-full"} 
      ${blur ? "backdrop-blur-md bg-white/80" : "bg-white"}`}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-6">
        
        {/* Logo Section */}
        <div className="flex flex-col items-start">
          <Link href="/">
          <Image
          
            src="/images/logo.png"
            
            alt="logo"
            width={150}
            height={150}
            className="object-contain"
          />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-[60px] text-[16px] tracking-[2px] uppercase">
          <a href="https://www.onestack.in/" className="hover:opacity-70 transition">
            Portfolio
          </a>
          <a href="/our-team" className="hover:opacity-70 transition">
            Our Team
          </a>
          <a href="/blog" className="hover:opacity-70 transition">
            News & Blog
          </a>
          <a href="#contact" className="hover:opacity-70 transition">
            Contact Us
          </a>
        </nav>

      </div>
    </header>
  );
}