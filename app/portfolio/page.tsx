"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Plus, X, ChevronDown } from "lucide-react";
import { categories, portfolioLogos, getPortfolioByCategory } from "@/data/portfolio-logos";

function PortfolioCard({ item, index }: { item: (typeof portfolioLogos)[0]; index: number }) {
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
        transitionDelay: `${(index % 4) * 100}ms`,
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

function CategoryDropdown({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const displayLabel = selected === "all" ? "All" : selected;

  return (
    <div ref={ref} className="relative w-[380px]">
      {/* Trigger */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between border border-yellow-400 rounded-full px-6 py-4 text-[15px] text-gray-800 bg-white focus:outline-none"
      >
        <span>{displayLabel}</span>
        <ChevronDown
          className={`text-gray-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          size={18}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <ul className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-yellow-400 rounded-[20px] overflow-hidden z-50 shadow-lg">
          {categories.map((cat) => {
            const label = cat === "all" ? "All" : cat;
            const isActive = cat === selected;
            return (
              <li
                key={cat}
                onClick={() => { onChange(cat); setOpen(false); }}
                className={`px-6 py-3 text-[14px] cursor-pointer transition-colors duration-200
                  ${isActive
                    ? "bg-[#6f8fa3] text-white font-semibold"
                    : "text-gray-700 hover:bg-yellow-400/20 hover:text-gray-900"
                  }`}
              >
                {label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const filtered = getPortfolioByCategory(selectedCategory);

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
          <X className="cursor-pointer hover:scale-110 transition" />
          <span className="font-bold text-xl cursor-pointer hover:scale-110 transition">in</span>
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

      {/* ===== FILTER + PORTFOLIO SECTION ===== */}
      <section className="w-full bg-white py-[80px] px-6">
        <div className="max-w-[1200px] mx-auto">

          {/* FILTER BY heading */}
          <p className="text-center text-[15px] tracking-[4px] text-gray-500 mb-8">
            FILTER BY
          </p>

          {/* Custom Dropdown */}
          <div className="flex flex-col items-center mb-4">
            <p className="text-[14px] font-semibold text-gray-500 mb-3 self-start ml-[calc(50%-190px)]">
              Category
            </p>
            <CategoryDropdown selected={selectedCategory} onChange={setSelectedCategory} />
          </div>

          {/* Reset filter */}
          {selectedCategory !== "all" && (
            <div className="flex justify-center mb-10 mt-3">
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-[13px] text-gray-400 underline underline-offset-2 hover:text-gray-700 transition"
              >
                reset filter
              </button>
            </div>
          )}

          {/* Cards grid — 4 per row */}
          <div className="grid grid-cols-4 gap-6 mt-10">
            {filtered.map((item, i) => (
              <PortfolioCard key={`${item.name}-${i}`} item={item} index={i} />
            ))}
          </div>

        </div>
      </section>

    </main>
  );
};

export default PortfolioPage;
