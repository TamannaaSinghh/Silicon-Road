"use client";

import Image from "next/image";
import { teamData } from "@/data/our-team";

export default function OurTeamPage() {
  return (
    <section className="w-full bg-[#6f8fa3] py-[120px] pt-[200px]">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-[120px]">
        {teamData.map((member, index) => (
          <div key={index} className="grid grid-cols-2 gap-16 items-center">
            {/* LEFT IMAGE */}
            <div className="relative pl-20">
              <div className="rounded-[40px] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={350}
                  height={400}
                  className="object-cover"
                />
              </div>

              {/* LinkedIn placeholder */}
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute font-bold left-[-10px] top-1/2 -translate-y-1/2 text-white text-xl"
              >
                in
              </a>
            </div>

            {/* RIGHT CONTENT */}
            <div>
              {/* Name */}
              <h2 className="text-yellow-400 text-[36px] font-bold mb-2">
                {member.name}
              </h2>

              {/* Role */}
              <p className="text-white text-[12px] tracking-[3px] uppercase mb-6">
                {member.role}
              </p>

              {/* Description */}
              <p className="text-white/90 leading-[30px] mb-6">
                {member.description}
              </p>

              {/* Companies */}
              <div className="flex items-center gap-4 flex-wrap">
                {member.companies.map((logo, i) => (
                  <Image
                    key={i}
                    src={logo}
                    alt="company"
                    width={120}
                    height={40}
                    className="object-contain opacity-90"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
