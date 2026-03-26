"use client";

import Image from "next/image";

const ContactPage = () => {
  return (
    <main className="w-full min-h-screen relative pt-[200px]">

      {/* ===== BACKGROUND IMAGE ===== */}
      <Image
        src="/images/contact-img.png"
        alt="contact bg"
        fill
        className="object-cover"
        priority
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-[#1f2a33]/20" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-16 py-24 text-white">

        {/* CONTACT HEADER */}
        <p className="tracking-[8px] text-[26px] text-gray-300 mb-4">
          CONTACT US
        </p>

        <p className="text-lg text-gray-200">
          Send us a note at
        </p>

        <a
          href="mailto:info@siliconroad.vc"
          className="text-yellow-400 text-xl font-semibold underline mt-1 inline-block"
        >
          info@siliconroad.vc
        </a>

        {/* ADDRESS + MAP */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold mb-4">Silicon Road Ventures</h2>
          <p className="text-gray-300 leading-relaxed mb-8">
            One World Center <br />
            Suite 625 <br />
            Mumbai, India 400013
          </p>
          <div className="rounded-[20px] overflow-hidden" style={{ filter: "invert(90%) hue-rotate(180deg)" }}>
            <iframe
              src="https://www.google.com/maps?q=One+World+Center,+Mumbai,+India+400013&output=embed"
              className="w-full h-[340px] border-0"
              loading="lazy"
            />
          </div>
        </div>

        {/* SOCIAL ICONS */}
        <div className="absolute right-10 top-[30%] -translate-y-1/2 flex flex-col gap-4 text-white">
          <a href="https://x.com/SiliconRoadHQ" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform block">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/siliconroadusa/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform block">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>

      </div>

      {/* NEWSLETTER SECTION */}
      <div className="relative z-10 w-full bg-[#44494f] px-16 py-24 flex flex-col items-center text-center">
        <p className="text-[13px] tracking-[4px] text-gray-400 mb-4">JOIN US</p>
        <h2 className="text-white text-[36px] font-bold leading-tight mb-8">
          Subscribe to <br /> our newsletter
        </h2>
        <input
          type="email"
          placeholder=""
          className="block w-[340px] bg-white text-gray-800 px-4 py-3 mb-3 focus:outline-none"
        />
        <button className="bg-[#777777] hover:bg-[#6b7280] text-white text-[14px] px-6 py-3 transition rounded-md">
          Subscribe
        </button>
      </div>

    </main>
  );
};

export default ContactPage;
