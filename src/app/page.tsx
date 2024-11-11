import NavbarMenu from "@/components/menu/page";
import LogosImages from "./logos/logos.json";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;

export default async function Home() {

  return (
    <main className="m-auto mb-24">
      <NavbarMenu />

      <section className="w-full h-[70vh] 2xl:h-[65vh] bg-[#FFF7EF] flex flex-wrap items-center justify-center">
        <Image priority alt="banner" src="/banner.svg" className="h-full w-auto" width={1300} height={500} />
      </section>

      <nav className="flex justify-center gap-6 mt-8">
        <Link href="/shop">
          Tienda
        </Link>
        <Link href="/my-account">
          Mi Cuenta
        </Link>
      </nav>

      <div className="relative overflow-hidden w-full md:w-full py-4 m-auto">
        <div className="bg-gradient-to-r from-white to-transparent h-full w-24 absolute top-0 left-0 z-10" />
        <div className="marquee">
          <div className="marquee-inner flex">
            {LogosImages.map((logo, index) => (
              <div
                key={index}
                className="bg-[#fafafa] hover:bg-[#f3f3f3] w-[260px] h-[70px] 2xl:h-[80px] rounded-[8px] grid place-content-center grayscale hover:grayscale-0 cursor-pointer transition-all mx-4"
              >
                <Image
                  height={30}
                  width={180}
                  quality={87}
                  src={logo.logo || ""}
                  alt={`Logo ${index}`}
                  className="w-auto h-[30px] select-none"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-r from-transparent to-white h-full w-24 absolute top-0 right-0 z-10" />
      </div>

      <article className="mt-10 flex flex-col gap-12 m-auto md:p-6">
        <h1 className="font-semibold text-[32px] 2xl:text-4xl text-center tracking-[-2px]">Lo más Nuevo en Tecpoint</h1>


      </article>
    </main>
  );
}
