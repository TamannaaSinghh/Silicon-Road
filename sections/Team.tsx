"use client";

import React, { useEffect, useRef, useState } from "react";
import { team } from "@/data/team";

function TeamCard({ member, index }: { member: (typeof team)[0]; index: number }) {
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
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative rounded-[40px] overflow-hidden group transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Image */}
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-[320px] object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#6f8fa3]/10" />

      {/* Text */}
      <div className="absolute bottom-3 left-6 right-6">
        <h3
          className="text-yellow-400 text-[26px] font-semibold leading-[35px] transition-all duration-500 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: `${index * 150 + 200}ms`,
          }}
        >
          {member.name}
        </h3>
        <p
          className="text-white text-[14px] tracking-[1px] mt-2 uppercase transition-all duration-500 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: `${index * 150 + 320}ms`,
          }}
        >
          {member.role}
        </p>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="w-full bg-[#507490] py-[80px]">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Heading */}
        <h2 className="text-center text-white text-[30px] tracking-[6px] mb-16">
          OUR TEAM
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-4 gap-10">
          {team.map((member, i) => (
            <TeamCard key={i} member={member} index={i} />
          ))}

          {/* Button */}
          <div className="justify-center items-center text-center col-span-4 pt-[60px]">
            <a
              href="/our-team"
              className="mt-10 px-8 py-5 border border-yellow-400 rounded-full text-center items-center text-[16px] text-[#ffffff] tracking-[2px] uppercase bg-[#4e6472] hover:bg-yellow-400 transition hover:text-black"
            >
              get to know us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
