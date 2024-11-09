import NavbarMenu from "@/components/menu/page";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const metadata = {
  title: "Tienda | Todo en accesorios Tecnológicos",
  description: "Descubre nuestra tienda online con lo último en accesorios tecnológicos de la mejor calidad.",
};

export const revalidate = 60;

export default async function Shop({ searchParams }: { searchParams: { page?: string } }) {


  return (
    <main className="2xl:max-w-[1536px] m-auto mb-24 md:w-[1300px]">
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

    </main>
  );
}