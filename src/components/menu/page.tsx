"use client"

import { useAuth } from "@/context/useAuth";
import Image from "next/image";
import { DropdownMenuDemo } from "../dropdown/page";
import { Heart, Search } from "lucide-react";
import { NavigationMenuDemo } from "../NavigationMenu/page";
import Link from "next/link";

function NavbarMenu() {
  const url = "https://wikirock.net/wp-content/uploads/2023/06/Lana-Del-Rey.jpg";
  const { currentUser } = useAuth();

  return (
    <nav className="flex flex-col items-center justify-between w-full py-4 2xl:max-w-[1536px] m-auto">
      <section className="flex items-center justify-between w-full md:px-24 2xl:px-0">
        <div className="flex items-center justify-center gap-8">
          <Image alt="Tecpoint Logo" src="/logo.png" width={180} height={80} />

          <div className="flex items-center justify-center gap-12">
            <Link href="/" className="text-[14px] font-[500]">Inicio</Link>
            <Link href="/" className="text-[14px] font-[500]">Categorias</Link>
            <Link href="/shop" className="text-[14px] font-[500]">Lo mas Nuevo!</Link>
            <NavigationMenuDemo />
          </div>
        </div>

        <div className="flex items-center justify-center gap-x-8">
          <span className="flex items-center justify-center gap-x-6">
            <Search color="#000" strokeWidth={1.8} />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </span>

          <DropdownMenuDemo />
        </div>
      </section>
    </nav>
  )
}

export default NavbarMenu