"use client";

export default function Newsletter() {
  return (
    <section className="w-full relative py-[70px]">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/newsletter-bg.png" // add your bg image
          alt="bg"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative max-w-[1200px] mx-auto px-6">
        
        {/* Small Heading */}
        <p className="text-[20px] tracking-[6px] text-[#6b7c85] mb-3">
          JOIN US
        </p>

        {/* Main Heading */}
        <h2 className="text-[46px] leading-[50px] font-bold text-[#4a4f55] mb-16">
          Subscribe to <br />
          our newsletter
        </h2>

        {/* Input */}
        <div className="max-w-[500px]">
          <p className="text-[12px] tracking-[2px] text-[#2d2e2f] mb-2 uppercase">
            Enter your e-mail
          </p>

          <div className="border-b-2 border-red-500 w-full mb-4"></div>

          {/* Thanks text */}
          {/* <p className="text-yellow-400 text-[18px] mb-10 flex justify-end">
            Thanks!
          </p> */}

          {/* Button */}
          <button className="px-12 py-5 border border-yellow-400 rounded-full text-[14px] tracking-[3px] uppercase hover:bg-yellow-400 transition">
            Sign Up
          </button>
        </div>

      </div>
    </section>
  );
}