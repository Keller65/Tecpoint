"use client";

import NavbarMenu from "@/components/menu/page";
import LogosImages from "./logos/logos.json";
import { useState, useEffect } from "react";

export default function Home() {
  const [logos] = useState(LogosImages);

  return (
    <main className="2xl:max-w-[1536px] m-auto mb-24">
      <NavbarMenu />

      <section className="w-full h-[70vh] 2xl:h-[65vh] bg-[#FFF7EF] flex flex-wrap items-center justify-center">
        <img alt="banner" src="/banner.svg" className="h-full w-auto" />
      </section>

      <div className="relative overflow-hidden md:w-[1300px] 2xl:w-full py-4 m-auto">
        <div className="bg-gradient-to-r from-white to-transparent h-full w-24 absolute top-0 left-0 z-10" />
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
        <div className="bg-gradient-to-r from-transparent to-white h-full w-24 absolute top-0 right-0 z-10" />
      </div>

      <article className="mt-10 flex flex-col gap-12 md:w-[1300px] m-auto">
        <h1 className="font-semibold text-4xl text-center tracking-[-2px]">Lo mas Nuevo en Tecpoint</h1>

        <div className="flex flex-col cursor-pointer relative">
          <span className="bg-[#09f] absolute top-4 left-4 rounded-full px-3 py-1">
            <p className="text-[12px] font-semibold text-white">Nuevo</p>
          </span>

          <div className="flex flex-col h-[490px] w-[500px] gap-[4px]">
            <div className="bg-[#f4f4f4] h-[340px] rounded-t-[20px] grid place-content-center">
              <img
                src="https://res.cloudinary.com/djmzn1jlt/image/upload/v1729203172/SmartWatch/HyperGear/Hypergear%20smartwatch%20active%208/zouevzhvl73fvagtwmf4.webp"
                alt="hypergear Smartwatch Active 8"
                width={300}
                height={300}
                className="2xl:size-[330px]"
              />
            </div>

            <div className="flex-1 bg-[#f4f4f4] rounded-b-[20px] grid place-content-center">
              <h2 className="text-xl text-center tracking-[-1.5px] leading-[22px] font-[540]"><span className="text-[#ff4e1d]">Hypergear</span> SmartWatch <br /> Active 8</h2>
            </div>
          </div>

        </div>
      </article>
    </main>
  );
}