"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { teamData } from "@/data/our-team";

const members = teamData.filter((m) => m.role !== "ADVISOR");
const advisors = teamData.filter((m) => m.role === "ADVISOR");

function AdvisorCard({ advisor, index }: { advisor: (typeof advisors)[0]; index: number }) {
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
      className="flex flex-col items-center gap-8 w-[220px] transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="relative w-full rounded-[40px] overflow-hidden">
        <Image
          src={advisor.image}
          alt={advisor.name}
          width={220}
          height={260}
          className="w-full h-[260px] object-cover"
        />
        <div className="absolute inset-0 bg-[#6f8fa3]/10" />
        <div className="absolute bottom-5 left-6 right-6">
          <h3
            className="text-yellow-400 text-[26px] font-bold leading-[32px] transition-all duration-500 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transitionDelay: `${index * 150 + 200}ms`,
            }}
          >
            {advisor.name}
          </h3>
          <p
            className="text-white text-[12px] tracking-[1.5px] mt-2 uppercase transition-all duration-500 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transitionDelay: `${index * 150 + 320}ms`,
            }}
          >
            {advisor.role}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {advisor.companies.map((logo, i) => (
          <Image
            key={i}
            src={logo}
            alt="company"
            width={200}
            height={100}
            className="object-contain opacity-90 w-[200px] h-[100px]"
          />
        ))}
      </div>
    </div>
  );
}

function MemberCard({ member, index }: { member: (typeof members)[0]; index: number }) {
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

  const bg = index % 2 === 0 ? "#6f8fa3" : "#829faf";

  return (
    <div ref={ref} style={{ backgroundColor: bg }} className="w-full py-[80px]">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center gap-10">

        {/* SOCIAL ICONS */}
        <div className="flex flex-col gap-4 items-center shrink-0 w-[40px]">
          {member.twitter && (
            <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-white font-bold text-[22px]">
              𝕏
            </a>
          )}
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-white font-bold text-[22px]">
              in
            </a>
          )}
        </div>

        {/* IMAGE */}
        <div className="rounded-[40px] overflow-hidden shrink-0">
          <Image
            src={member.image}
            alt={member.name}
            width={300}
            height={340}
            className="object-cover w-[300px] h-[340px]"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="pl-10 pr-20 flex-1">
          <h2
            className="text-yellow-400 text-[36px] font-bold mb-2 transition-all duration-700 ease-out"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(60px)", transitionDelay: "0ms" }}
          >
            {member.name}
          </h2>
          <p
            className="text-white text-[12px] tracking-[3px] uppercase mb-6 transition-all duration-700 ease-out"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(60px)", transitionDelay: "150ms" }}
          >
            {member.role}
          </p>
          <p
            className="text-white/90 leading-[30px] mb-8 transition-all duration-700 ease-out"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(60px)", transitionDelay: "300ms" }}
          >
            {member.description}
          </p>
          <div
            className="flex items-center gap-6 flex-wrap transition-all duration-700 ease-out"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(60px)", transitionDelay: "450ms" }}
          >
            {member.companies.map((logo, i) => (
              <Image
                key={i}
                src={logo}
                alt="company"
                width={80}
                height={50}
                className="object-contain opacity-90 w-[130px] h-[70px]"
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function OurTeamPage() {
  return (
    <section className="w-full pb-0 pt-[200px] bg-[#6f8fa3]">

      {/* TEAM MEMBERS — alternating rows */}
      <div className="flex flex-col">
        {members.map((member, index) => (
          <MemberCard key={index} member={member} index={index} />
        ))}
      </div>

      {/* ADVISORS SECTION */}
      <div className="max-w-[1200px] mx-auto px-6 py-[120px]">
        <h2 className="text-center text-white text-[30px] tracking-[6px] mb-16">
          ADVISORS
        </h2>
        <div className="flex justify-center gap-16">
          {advisors.map((advisor, index) => (
            <AdvisorCard key={index} advisor={advisor} index={index} />
          ))}
        </div>
      </div>

      {/* REACH OUT SECTION */}
      <div className="w-full bg-[#f0f2f4] py-[100px] flex flex-col items-center gap-10">
        <h2 className="text-[#2d2d2d] text-[28px] font-bold text-center">
          Build the future of commerce with us.
        </h2>
        <a
          href="/contact"
          className="px-16 py-5 border border-yellow-400 rounded-full text-[#2d2d2d] text-[14px] tracking-[3px] uppercase hover:bg-yellow-400 transition hover:text-black"
        >
          Reach Out
        </a>
      </div>

    </section>
  );
}
