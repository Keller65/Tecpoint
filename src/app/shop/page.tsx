import NavbarMenu from "@/components/menu/page";
import { getAllProducts, Product } from "@/lib/WooCommerce";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const metadata = {
  title: "Tienda | Todo en accesorios Tecnológicos",
  description: "Descubre nuestra tienda online con lo último en accesorios tecnológicos de la mejor calidad.",
};

export default async function Shop({ searchParams }: { searchParams: { page?: string } }) {
  const products: Product[] = await getAllProducts();

  const productsPerPage = 50;
  const currentPage = parseInt(searchParams.page || "1", 10);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + productsPerPage);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const pagesToShow = [];
  const maxVisiblePages = 12;

  if (totalPages <= maxVisiblePages) {
    pagesToShow.push(...Array.from({ length: totalPages }, (_, index) => index + 1));
  } else {
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    pagesToShow.push(...Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index));
  }

  return (
    <main className="2xl:max-w-[1536px] m-auto mb-24">
      <NavbarMenu />
      <h1 className="text-center text-2xl font-bold">Bienvenido a la tienda</h1>

      <Pagination>
        <PaginationContent>
          {currentPage > 1 ? (
            <PaginationItem>
              <PaginationPrevious href={`/shop?page=${currentPage - 1}`} />
            </PaginationItem>
          ) : (
            <span className="">
              <PaginationPrevious href={`/shop?page=${currentPage - 1}`} />
            </span>
          )}

          {pagesToShow.map(page => (
            <PaginationItem key={page}>
              <PaginationLink
                href={`/shop?page=${page}`}
                className={currentPage === page ? 'bg-black text-white' : ''}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {totalPages > maxVisiblePages && currentPage < totalPages - 1 && (
            <PaginationItem>
              <span className="mx-2">...</span>
            </PaginationItem>
          )}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext href={`/shop?page=${currentPage + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>

      <div className="product-list flex flex-wrap justify-center gap-6 mt-4">
        {paginatedProducts.map(product => (
          <div key={product.id} className="flex flex-col cursor-pointer relative border p-4 w-[300px]">
            <Link href={`/shop/${product.slug}`}>
              <img
                src={product.images[0]?.src}
                alt={product.name}
                className="w-[200px] h-[200px] aspect-[200/200] object-contain"
                loading="lazy"
                height={200}
                width={200}
              />
              <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
              <p className="text-[#ff4e1d] font-bold">{product.price} {product.currency}</p>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
