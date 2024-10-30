import NavbarMenu from "@/components/menu/page";
import LogosImages from "./logos/logos.json";
import { getWooCommerceProducts, Product } from "@/lib/WooCommerce";

export default async function Home() {
  const products: Product[] = await getWooCommerceProducts();

  return (
    <main className="2xl:max-w-[1536px] m-auto mb-24 md:w-[1300px]">
      <NavbarMenu />

      <section className="w-full h-[70vh] 2xl:h-[65vh] bg-[#FFF7EF] flex flex-wrap items-center justify-center">
        <img alt="banner" src="/banner.svg" className="h-full w-auto" />
      </section>

      <div className="relative overflow-hidden w-full md:w-full py-4 m-auto">
        <div className="bg-gradient-to-r from-white to-transparent h-full w-24 absolute top-0 left-0 z-10" />
        <div className="marquee">
          <div className="marquee-inner flex">
            {LogosImages.map((logo, index) => (
              <div
                key={index}
                className="bg-[#fafafa] hover:bg-[#f3f3f3] w-[260px] h-[70px] 2xl:h-[80px] rounded-[8px] grid place-content-center grayscale hover:grayscale-0 cursor-pointer transition-all mx-4"
              >
                <img
                  height={30}
                  width="auto"
                  src={logo.logo}
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
        <h1 className="font-semibold 2xl:text-4xl text-center tracking-[-2px]">Lo más Nuevo en Tecpoint</h1>

        <div className="flex justify-center flex-wrap gap-6">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col cursor-pointer relative">
              <span className="bg-[#09f] absolute top-4 left-4 rounded-full px-3 py-1">
                <p className="text-[12px] font-semibold text-white">Nuevo</p>
              </span>

              <div className="flex flex-col md:w-[320px] md:h-[350px] 2xl:h-[440px] 2xl:w-[360px] gap-[4px]">
                <div className="bg-[#fff] rounded-t-[20px] grid place-content-center border">
                  <img
                    src={product.images[0]?.src || ''}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="2xl:size-[290px] 2xl:aspect-square md:size-[280px] object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1 bg-[#f4f4f4] rounded-b-[20px] grid place-content-center px-6 gap-y-3">
                  <h2 className="md:text-lg text-center tracking-[-1.5px] leading-3 md:leading-[20px] font-[540]">
                    {product.name}
                  </h2>
                  <p className="text-center text-[#ff4e1d] font-bold">
                    {product.price ? parseFloat(product.price).toFixed(0) : 'Precio no disponible'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>
    </main>
  );
}