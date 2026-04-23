"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full bg-[#ffffff] min-h-[50vh] flex items-center pt-[200px]">
      <div className="max-w-[1200px] mx-auto w-full px-6 grid grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[72px] font-bold leading-[90px] tracking-[-2px]"
          >
            Venture Capital <br />
            For Commerce <br />
            Tech<span className="text-yellow-400">.</span>
          </motion.h1>

          {/* Button */}
          <button
            onClick={() => setOpen(true)}
            className="mt-12 px-10 py-5 border border-yellow-400 rounded-full flex items-center gap-6 text-[14px] tracking-[2px] uppercase hover:bg-yellow-400 transition"
          >
            Watch the Video
            <span className="text-[20px]">➝</span>
          </button>
        </div>

        {/* RIGHT SIDE (VIDEO) */}
        <div className="flex justify-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-[600px] object-contain"
          >
            <source src="/vids/helicopter.mp4" type="video/mp4" />
          </video>
        </div>
      </div>



      {/* VIDEO MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative w-[80%] max-w-[800px]">

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 text-white text-xl"
            >
              ✕
            </button>

            <video controls autoPlay className="w-full rounded-lg">
              <source src="/vids/main-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
