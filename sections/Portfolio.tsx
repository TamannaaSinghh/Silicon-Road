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
          <div className="relative rounded-[40px] overflow-hidden">
            <img
              src="/images/portfolio3.png" // replace with your image
              alt="portfolio"
              className="w-full h-[300px] object-cover hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/images/portfolio-logos/onestack.png"
                alt="OneStack"
                className="w-40 object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </a>

      </div>
    </section>
  );
}