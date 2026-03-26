"use client";

export default function Portfolio() {
  return (
    <section id="portfolio" className="w-full bg-[#ffffff] py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 gap-0 items-center">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col items-center text-center">
          
          {/* Small Heading */}
          <p className="text-[25px] tracking-[6px] text-[#5c5c5c] mb-8">
            PORTFOLIO
          </p>

          {/* Main Text */}
          <h2 className="text-[40px] leading-[50px] font-bold text-[#7898ac]">
            We partner with <br />
            outstanding <br />
            founders who are <br />
            building the future <br />
            of commerce.
          </h2>
        </div>

        {/* RIGHT SIDE (CLICKABLE IMAGE) */}
        <a
          href="/portfolio"
          
          className="block"
        >
          <div className="rounded-[40px] overflow-hidden">
            <img
              src="/images/portfolio.png" // replace with your image
              alt="portfolio"
              className="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          </div>
        </a>

      </div>
    </section>
  );
}