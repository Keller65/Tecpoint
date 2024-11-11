"use client"

import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import NavbarMenu from "@/components/menu/page";
import Image from "next/image";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Shop = () => {
  const { products = [], fetchProducts } = useContext(AuthContext)!;

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products, fetchProducts]);

  return (
    <main className="m-auto mb-24">
      <NavbarMenu />

      <h1 className="text-center text-2xl font-bold mt-8">Bienvenido a la tienda Tecpoint</h1>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Audio">Audio</SelectItem>
          <SelectItem value="Adaptador">Adaptadores</SelectItem>
          <SelectItem value="Cargador">Cargadores</SelectItem>
          <SelectItem value="Cable">Cables</SelectItem>
          <SelectItem value="Cobertor">Cobertores</SelectItem>
          <SelectItem value="Memoria">Memorias</SelectItem>
          <SelectItem value="Power Bank">Power Banks</SelectItem>
        </SelectContent>
      </Select>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 p-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg w-[300px]">
              <Image
                src={product.imagenes?.imagen_01?.img || '/default-image.jpg'}
                alt={product.producto}
                width={250}
                height={250}
                className="object-cover"
                loading="lazy"
              />
              <h3 className="mt-4 text-md font-semibold">{product.producto}</h3>
              <Link
                href={`/shop/${product.slug}`}
                className="text-blue-500 hover:underline mt-4 block"
              >
                Ver más
              </Link>
            </div>
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
    </main>
  );
};

export default Shop;