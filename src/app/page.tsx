"use client";

import NavbarMenu from "@/components/menu/page";
import LogosImages from "./logos/logos.json";
import { useState, useEffect } from "react";

export default function Home() {
  const [logos] = useState(LogosImages);

  return (
    <main className="2xl:max-w-[1536px] m-auto">
      <NavbarMenu />

      <section className="w-full h-[65vh] bg-[#FFF7EF] flex flex-wrap items-center justify-center">
        <img alt="banner" src="/banner.svg" className="h-full w-auto" />
      </section>

      <div className="relative overflow-hidden w-full py-4">
        <div className="marquee">
          <div className="marquee-inner flex">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="bg-[#fafafa] hover:bg-[#f3f3f3] md:w-[260px] md:h-[70px] w-auto 2xl:h-[80px] rounded-[8px] grid place-content-center grayscale hover:grayscale-0 cursor-pointer transition-all mx-4"
              >
                <img
                  src={logo.logo}
                  alt={`Logo ${index}`}
                  className="w-auto h-[30px] md:h-[25px] select-none"
                />
              </div>
            ))}

            {/* Duplicamos las imágenes para crear el efecto infinito */}
            {logos.map((logo, index) => (
              <div
                key={`duplicate-${index}`}
                className="bg-[#fafafa] hover:bg-[#f3f3f3] md:w-[260px] md:h-[70px] w-auto 2xl:h-[80px] rounded-[8px] grid place-content-center grayscale hover:grayscale-0 cursor-pointer transition-all mx-4"
              >
                <img
                  src={logo.logo}
                  alt={`Logo Duplicate ${index}`}
                  className="w-auto h-[30px] md:h-[25px] select-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
