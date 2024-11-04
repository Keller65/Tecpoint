// AddToCartButton.tsx
"use client";

import { Product } from "@/lib/WooCommerce";

interface AddToCartButtonProps {
  product: Product;
}

function AddToCartButton({ product }: AddToCartButtonProps) {
  function handleAddToCart() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      sku: product.sku,
      image: product.images?.[0]?.src || "/default-image.jpg",
    };

    const productExists = cart.some((item: { id: number }) => item.id === product.id);

    if (!productExists) {
      cart.push(productToAdd);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Producto agregado al carrito");
    } else {
      alert("El producto ya está en el carrito");
    }
  }

  return (
    <button
      className="flex gap-x-4 relative h-fit w-fit overflow-hidden rounded bg-neutral-950 px-6 py-3 text-white transition-all duration-200 hover:bg-neutral-800 hover:ring-offset-2 active:ring-2 active:ring-neutral-800"
      onClick={handleAddToCart}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
      agregar al carrito
    </button>
  );
}

export default AddToCartButton;
