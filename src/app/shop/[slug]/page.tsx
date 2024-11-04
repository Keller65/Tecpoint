import { getProductBySlug, Product } from "@/lib/WooCommerce";
import NavbarMenu from "@/components/menu/page";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Metadata } from "next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import Image from "next/image";

export const revalidate = 30;

interface ProductDetailProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductDetailProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  return {
    title: product?.name || "Producto no Encontrado",
    description: `${product?.name} - ¡Encuentra el accesorio perfecto hoy! y obtén la mejor manera de conectar, y cargar tus dispositivos.` || "Descripción y detalles del producto no encontrados.",
    openGraph: {
      title: product?.name,
      description: product?.name || "Descripción no disponible",
    },
  };
}

function getWholesalePrice(product: Product): string | undefined {
  const wholesaleMeta = product.meta_data?.find((meta) => meta.key === 'wholesale_price');
  return wholesaleMeta ? wholesaleMeta.value : undefined;
}

function getBrandImageUrl(product: Product): string | undefined {
  const brandImageMeta = product.meta_data?.find((meta) => meta.key === 'brand_image');
  return brandImageMeta ? brandImageMeta.value : undefined;
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const product: Product | null = await getProductBySlug(params.slug);

  console.log(product);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const wholesalePrice = getWholesalePrice(product);
  const brandImageUrl = getBrandImageUrl(product) || "/default-brand-image.jpg";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: product.description || "Descripción no disponible",
    image: product.images?.map((img) => img.src) || [],
    brand: {
      "@type": "Brand",
      name: product.brands?.[0]?.name || "Marca no disponible",
    },
    offers: {
      "@type": "Offer",
      url: product.permalink || "#",
      priceCurrency: product.currency || "L",
      price: parseFloat(product.price || "0"),
      availability:
        product.stock_status === "instock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <main className="2xl:max-w-[1536px] md:w-[1300px] m-auto h-[90vh]">
      <NavbarMenu />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <article className="flex h-full flex-1 justify-center items-center gap-x-28">
        <Carousel>
          <CarouselContent className="size-[300px] md:size-[480px]">
            {product.images?.map((img, index) => (
              <CarouselItem key={index}>
                <Image
                  quality={100}
                  priority
                  src={img.src || "/default-image.jpg"}
                  alt={product.name || `Imagen ${index + 1}`}
                  className="size-[300px] md:size-[480px] object-contain"
                  width={300}
                  height={300}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="flex flex-col gap-y-4">
          <div className="flex items-center gap-x-2">
            <Image quality={100} priority src={brandImageUrl} alt="Logo de la marca" height={30} width={30} className="rounded-full" />
            <h2 className="text-[18px]">{product.brands?.[0]?.name || "Marca no disponible"}</h2>
          </div>

          <h1 className="text-3xl font-bold w-[440px] md:w-[640px] text-start text-wrap">{product.name}</h1>
          <hr />

          <p className="text-[#ff4e1d] font-bold">
            {product.price ? `${product.price}` : "Precio no disponible"}
          </p>

          <div className="flex flex-col gap-y-1">
            <p className="text-[#161616] font-bold">SKU: {product.sku}</p>
            <p className="text-[#161616] font-bold">
              Precio Mayoreo: {wholesalePrice ? `${wholesalePrice}` : "No disponible"}
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Especificaciones</AccordionTrigger>

              <AccordionContent className="flex-1">
                <div
                  className="product-description mt-2"
                  dangerouslySetInnerHTML={{ __html: product.description || "" }}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <button className=" flex gap-x-4 relative h-fit w-fit overflow-hidden rounded bg-neutral-950 px-6 py-3 text-white transition-all duration-200 hover:bg-neutral-800 hover:ring-offset-2 active:ring-2 active:ring-neutral-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            agregar al carrito
          </button>
        </div>
      </article>
    </main>
  );
}