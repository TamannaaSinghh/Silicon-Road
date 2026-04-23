"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const closeModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) {
        video.pause();
        video.removeAttribute("autoplay");
      } else {
        video.play().catch(() => {});
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), video[controls]'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeModal]);

  useEffect(() => {
    if (!open) {
      triggerRef.current?.focus();
    }
  }, [open]);

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
            ref={triggerRef}
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="mt-12 px-10 py-5 border border-yellow-400 rounded-full flex items-center gap-6 text-[14px] tracking-[2px] uppercase hover:bg-yellow-400 transition"
          >
            Watch the Video
            <span aria-hidden="true" className="text-[20px]">➝</span>
          </button>
        </div>

        {/* RIGHT SIDE (VIDEO) */}
        <div className="flex justify-center">
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            className="w-[600px] object-contain"
          >
            <source src="/vids/helicopter.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* VIDEO MODAL */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="hero-video-dialog-title"
            className="relative w-[80%] max-w-[800px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="hero-video-dialog-title" className="sr-only">
              Silicon Road Ventures intro video
            </h2>

            {/* Close */}
            <button
              ref={closeRef}
              onClick={closeModal}
              aria-label="Close video dialog"
              className="absolute -top-10 right-0 text-white text-xl"
            >
              <span aria-hidden="true">✕</span>
            </button>

            <video controls autoPlay className="w-full rounded-lg">
              <source src="/vids/main-video.mp4" type="video/mp4" />
              <track
                kind="captions"
                src="/vids/main-video.en.vtt"
                srcLang="en"
                label="English"
                default
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
