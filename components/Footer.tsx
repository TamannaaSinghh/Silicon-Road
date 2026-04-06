"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#5a5a5a] text-white py-[70px]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Top Section */}
        <div className="grid grid-cols-4 gap-16 items-start">
          
          {/* Logo */}
          <div>
            <Link href="/">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={150}
              height={150}
              className="object-contain"
            />
            </Link>
          </div>

          {/* Address 2 */}
          <div>
            <p className="font-bold mb-4">
              Silicon Road Ventures
            </p>
            <p className="text-sm text-white/80 leading-7">
              One World Center <br />
              Suite 625 <br />
              Mumbai, India 400013
            </p>
          </div>

          {/* Address 1 */}
          <div>
            <p className="font-bold mb-4">
              Silicon Road Ventures
            </p>
            <p className="text-sm text-white/80 leading-7">
              1447 Peachtree St NE <br />
              Suite 700 <br />
              Atlanta, GA 30309
            </p>
          </div>

          

          {/* Social */}
          <div>
            <p className="font-bold mb-6">
              Follow us
            </p>

            <div className="flex gap-4">
              
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/siliconroadusa/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black"
              >
                <FaLinkedinIn />
              </a>

              {/* Twitter */}
              <a
                href="https://x.com/siliconroadhq?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black"
              >
                <FaTwitter />
              </a>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-20 text-right text-sm text-white/80">
          © 2025 Silicon Road Ventures. All rights reserved
        </div>

      </div>
    </footer>
  );
}