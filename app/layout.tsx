import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Silicon Road",
  description: "Early-stage venture capital firm",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#ffffff] text-[#0a0a0a]">
        <Navbar/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
