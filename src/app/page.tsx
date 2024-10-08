import NavbarMenu from "@/components/menu/page";
import Image from "next/image";

export default function Home() {
  // const links = [
  //   "https://tecpoint.ws/wp-content/uploads/2023/07/416118574_338869329007263_1840575506564590506_n.jpg",
  //   "https://tecpoint.ws/wp-content/uploads/2023/07/Portada-Tecpoint-2-1.jpg"
  // ]

  return (
    <main className="2xl:max-w-[2800px] m-auto md:px-12">
      <NavbarMenu />

      <section className="w-full flex items-center justify-center">
        <div>
          <img
            width="auto"
            height="auto"
            src="https://tecpoint.ws/wp-content/uploads/2023/07/416118574_338869329007263_1840575506564590506_n.jpg"
            alt=""
          />
        </div>
      </section>
    </main>
  );
}