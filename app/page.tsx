"use client";

import { ColorContrast } from "@/components/color-contrast";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />

      <section id="colorContrast" className="h-auto bg-blue-200 py-10">
        <div className=" w-7/12 mx-auto bg-white p-6 rounded-lg shadow-lg">
          <ColorContrast />
        </div>
      </section>

      <Footer />
    </>
  );
}
