"use client";

import React, { useState } from "react";
import { team } from "@/data/team";

export default function Team() {
  const [open, setOpen] = useState(false);
  
  return (
    <section
      id="team"
      className="w-full bg-[#6f8fa3] py-[80px]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Heading */}
        <h2 className="text-center text-white text-[30px] tracking-[6px] mb-16">
          OUR TEAM
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-4 gap-10">
          {team.map((member, i) => (
            <div
              key={i}
              className="relative rounded-[40px] overflow-hidden group"
            >
              {/* Image */}
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-[320px] object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-[#6f8fa3]/10"></div>

              {/* Text */}
              <div className="absolute bottom-3 left-6 right-6 ">
                <h3 className="text-yellow-400 text-[26px] font-semibold leading-[35px]">
                  {member.name}
                </h3>
                <p className="text-white text-[14px] tracking-[1px] mt-2 uppercase">
                  {member.role}
                </p>
              </div>
              
            </div>
          ))}

          {/* Button */}
          <div className="justify-center items-center text-center col-span-4 pt-[60px]">
         <a href="/our-team.tsx"  className="mt-10 px-8 py-5 border border-yellow-400 rounded-full text-center items-center text-[16px] text-[#ffffff] tracking-[2px] uppercase hover:bg-yellow-400 transition hover:text-black">
          get to know us
         </a>
         </div>
        </div>

      </div>
    </section>
  );
}
