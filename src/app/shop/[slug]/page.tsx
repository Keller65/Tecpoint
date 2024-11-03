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

export const revalidate = 3600;

interface ProductDetailProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductDetailProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  return {
    title: product?.name || "Detalles del Producto",
    description: product?.description || "Descripción y detalles del producto.",
    openGraph: {
      title: product?.name,
      description: product?.description || "Descripción no disponible",
    },
  };
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const product: Product | null = await getProductBySlug(params.slug);

  console.log(product);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

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
    <main className="2xl:max-w-[1536px] md:w-[1300px] m-auto h-[100dvh]">
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
                <img
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

        <div>
          <div className="flex items-center gap-x-2">
            <div className="size-[32px] bg-[#09f] rounded-full"></div>
            <h2 className="text-[18px]">{product.brands?.[0]?.name || "Marca no disponible"}</h2>
          </div>

          <h1 className="text-3xl font-bold w-[440px] text-start text-wrap">{product.name}</h1>
          <p className="text-[#ff4e1d] font-bold">
            {product.price ? `${product.price} ${product.currency || "L"}` : "Precio no disponible"}
          </p>
          <p className="text-[#161616] font-bold">SKU: {product.sku}</p>
          <p className="text-[#161616] font-bold">Precio Mayoreo: {product.regular_price ? `${product.regular_price} L` : "No disponible"}</p>

          <div
            className="product-description mt-2"
            dangerouslySetInnerHTML={{ __html: product.description || "" }}
          />
        </div>
      </article>
    </main>
  );
}