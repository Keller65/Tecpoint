import { getProductBySlug, Product } from "@/lib/WooCommerce";
import NavbarMenu from "@/components/menu/page";

// Configuración de ISR: Revalidación cada hora
export const revalidate = 3600;

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const product: Product | null = await getProductBySlug(params.slug);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const metadata = {
    title: product.name || "Detalles del Producto",
    description: product.description || "Descripción y detalles del producto.",
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "sku": product.sku,
    "description": product.short_description || "Descripción no disponible",
    "image": product.images?.map((img) => img.src) || [],
    "brand": {
      "@type": "Brand",
      "name": product.brands?.[0]?.name || "Marca no disponible"
    },
    "offers": {
      "@type": "Offer",
      "url": product.permalink || "#",
      "priceCurrency": product.currency || "L",
      "price": parseFloat(product.price || "0"),
      "availability": product.stock_status === "instock" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  return (
    <>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      </head>
      <main className="2xl:max-w-[1536px] md:w-[1300px] m-auto h-[100dvh]">
        <NavbarMenu />

        <article className="flex h-full flex-1 justify-center items-center gap-x-8">
          <picture>
            <img
              src={product.images?.[0]?.src || "/default-image.jpg"}
              alt={product.name || "Imagen del producto"}
              className="size-[300px] md:size-[430px] object-contain"
              width={300}
              height={300}
            />
          </picture>

          <div>
            <div className="flex items-center gap-x-2">
              <div className="size-[32px] bg-[#09f] rounded-full"></div>
              <h2 className="text-[18px]">{product.brands?.[0]?.name || "Marca no disponible"}</h2>
            </div>

            <h1 className="text-center text-2xl font-bold">{product.name}</h1>
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
    </>
  );
}