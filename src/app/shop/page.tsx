import NavbarMenu from "@/components/menu/page";
import { getAllProducts, Product } from "@/lib/WooCommerce";
import Image from "next/image";
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

  const productsPerPage = 28;
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
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    pagesToShow.push(...Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index));
  }

  return (
    <main className="2xl:max-w-[1536px] m-auto mb-24 md:w-[1300px]">
      <NavbarMenu />

      <h1 className="text-center text-2xl font-bold mt-8">Bienvenido a la tienda Tecpoint</h1>

      <Pagination className="mt-10">
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

      <div className="flex flex-wrap justify-center gap-6 mt-4">
        {paginatedProducts.map(product => (
          <div key={product.id} className="flex flex-col cursor-pointer relative border p-3 h-fit w-[300px]">
            <Link href={`/shop/${product.slug}`} className="flex flex-col gap-4">
              <Image
                src={product.images[0]?.src}
                alt={product.name || ""}
                className="w-[200px] h-[200px] aspect-[200/200] object-contain m-auto"
                loading="lazy"
                height={200}
                width={200}
              />
              <div className="flex flex-1 flex-col items-center justify-between gap-y-6">
                <h2 className="text-md font-semibold mt-2 text-center leading-4">{product.name}</h2>
                {/* <p className="text-[#ff4e1d] font-bold">{product.price} {product.currency}</p> */}

                <Link href={`/shop/${product.slug}`} className="w-full grid place-content-center bg-black text-white px-6 py-3">ver producto</Link>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
