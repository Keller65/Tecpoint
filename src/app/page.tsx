"use client";

import NavbarMenu from "@/components/menu/page";
import LogosImages from "./logos/logos.json";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [logos, setLogos] = useState(LogosImages);

  return (
    <main className="2xl:max-w-[1536px] m-auto">
      <NavbarMenu />

      <section className="w-full h-[65vh] bg-[#FFF7EF] flex flex-wrap items-center justify-center">
        <img
          alt="banner"
          src="/banner.svg"
          className="h-full w-auto"
        />
      </section>

      <div className="flex gap-8 overflow-hidden flex-wrap py-4 m-auto justify-center">
        {logos.map((logo) => (
          <div key={logo.key} className="bg-gray-100 w-[260px] h-[80px] rounded-[8px] grid place-content-center grayscale hover:grayscale-0 cursor-pointer transition-all">
            <img src={logo.logo} alt={`Logo ${logo.key}`} className="w-auto h-[30px]" />
          </div>
        ))}
      </div>
    </main>
  );
}