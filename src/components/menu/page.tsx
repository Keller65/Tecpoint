"use client"

import Image from "next/image";

function NavbarMenu() {
  const url = "https://wikirock.net/wp-content/uploads/2023/06/Lana-Del-Rey.jpg"
  return (
    <nav className="flex items-center justify-between w-full px-8 py-4">
      <Image alt="Tecpoint Logo" src="/logo.png" width={180} height={80} />
      <p>Welcome to Tecpoint website</p>

      <Image
        className="h-[80px] w-[80px] rounded-full aspect-square object-cover"
        alt="User profile photo"
        src={url}
        width={80} height={80}
        loading="lazy"
      />
    </nav>
  )
}

export default NavbarMenu