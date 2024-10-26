import { getProductBySlug, Product } from "@/lib/WooCommerce";
import NavbarMenu from "@/components/menu/page";

export const metadata = {
  title: "Detalles del Producto",
  description: "Descripción y detalles del producto.",
};

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const product: Product | null = await getProductBySlug(params.slug);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <main className="2xl:max-w-[1536px] m-auto mb-24">
      <NavbarMenu />
      
      <h1 className="text-center text-2xl font-bold">{product.name}</h1>
      <img src={product.images[0]?.src} alt={product.name} className="w-[300px] h-[300px] object-contain mx-auto" />
      <p className="text-[#ff4e1d] font-bold">{product.price} {product.currency}</p>
      <div
        className="product-description mt-2"
        dangerouslySetInnerHTML={{ __html: product.description || '' }}
      />
    </main>
  );
}