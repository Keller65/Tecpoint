import { getProductBySlug, Product } from "@/lib/WooCommerce";
import NavbarMenu from "@/components/menu/page";

// Configuración de ISR: Revalidación cada hora
export const revalidate = 3600;

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const product: Product | null = await getProductBySlug(params.slug);

  console.log(product);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const metadata = {
    title: product.name || "Detalles del Producto",
    description: product.description || "Descripción y detalles del producto.",
  };

  return (
    <>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <main className="2xl:max-w-[1536px] md:w-[1300px] m-auto h-[100dvh]">
        <NavbarMenu />

        <article className="flex h-full flex-1 justify-center items-center gap-x-8">
          <picture>
            <img
              src={product.images[0]?.src}
              alt={product.name}
              className="size-[300px] md:size-[430px] object-contain"
            />
          </picture>

          <div>
            <div className="flex items-center gap-x-2">
              <div className="size-[32px] bg-[#09f] rounded-full"></div>
              <h2 className="text-[18px]">nombre Marca del producto</h2>
            </div>

            <h1 className="text-center text-2xl font-bold">{product.name}</h1>
            <p className="text-[#ff4e1d] font-bold">
              {product.price} {product.currency}
            </p>
            <p className="text-[#161616] font-bold">{product.sku}</p>

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