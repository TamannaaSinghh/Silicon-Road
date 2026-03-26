"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { portfolioLogos } from "@/data/portfolio-logos";

function PortfolioCard({ item }: { item: (typeof portfolioLogos)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-[#6f8fa3] rounded-[32px] flex flex-col items-center justify-center gap-5 px-6 py-10 min-h-[260px] group transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
      }}
    >
      <Image
        src={item.logo}
        alt={item.name}
        width={150}
        height={55}
        className="object-contain w-[150px] h-[55px]"
      />
      <p className="text-white text-[16px] font-bold text-center leading-snug group-hover:text-yellow-400 transition-colors duration-300">
        {item.tagline}
      </p>
    </div>
  );
}

const PortfolioPage = () => {
  return (
    <main className="w-full">

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[550px] w-full overflow-hidden">
        <Image src="/images/portfolio2.png" alt="portfolio" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#0b1f2a]/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-xl md:text-3xl tracking-[8px] font-light">
            MEET THE FUTURE OF COMMERCE.
          </h1>
        </div>
        <div className="absolute left-16 bottom-24">
          <div className="w-14 h-14 rounded-full border border-yellow-400 flex items-center justify-center cursor-pointer hover:scale-110 transition">
            <Plus className="text-white" />
          </div>
        </div>
        <div className="absolute right-16 bottom-24 flex flex-col gap-4 text-white">
          {/* X / Twitter */}
          <a href="https://x.com/SiliconRoadHQ" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform block">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/company/siliconroadusa/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform block">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </section>

      {/* ===== SECOND SECTION ===== */}
      <section className="relative h-[300px] w-full overflow-hidden">
        <Image src="/images/portfolio3.png" alt="portfolio" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <p className="tracking-[4px] text-xl mb-4">FEATURED STARTUP</p>
          <h2 className="text-5xl font-bold font-serif">knit</h2>
          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-6" />
        </div>
      </section>

      {/* ===== PORTFOLIO SECTION ===== */}
      <section className="w-full bg-white py-[80px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-center">
            {portfolioLogos.map((item, i) => (
              <a key={i} href="https://www.onestack.in" target="_blank" rel="noopener noreferrer" className="w-[280px]">
                <PortfolioCard item={item} />
              </a>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default PortfolioPage;
