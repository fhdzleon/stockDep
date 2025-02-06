"use client";
import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProduct";
import ProductItem from "./product.item";
import { TableListSkeleton } from "../TableListSkeleton";
import { motion, Variants } from "framer-motion";
import ProductAdd from "./product.add";

const listVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export const itemVarians: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: index * 0.05,
    },
  }),
};

export function ProductList() {
  const [isVisible, setIsVisible] = useState<string | null>(null);
  const [, setHasMounted] = useState(false);
  const openModal = (code: string) => {
    setIsVisible(code);
  };
  const closeModal = () => setIsVisible(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const { products, error, hasNextPage, fetchNextPage, isFetching } =
    useProducts();

  const currentPage = products?.pages[currentPageIndex]?.data ?? [];

  const handleNextPage = () => {
    if (products) {
      if (currentPageIndex === products.pages.length - 1) {
        fetchNextPage();
      }
      setCurrentPageIndex((prev) => prev + 1);
    }
  };
  const handlePreviousPage = () => {
    setCurrentPageIndex((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);


  return (
    <section className="mt-10 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-primary">Lista de productos</span>
        <ProductAdd />
      </div>

      <div className="flex flex-col justify-between min-h-[700px]">
        <motion.table
          variants={listVariant}
          initial="hidden"
          animate="visible"
          className="table table-fixed w-full">
          <thead className="bg-primary text-white">
            <tr>
              <th className="w-1/4">Producto</th>
              <th className="w-1/4">Categoria</th>
              <th className="w-1/6">Caducidad</th>
              <th className="w-1/12">P. Inicial</th>
              <th className="w-1/12">P. Venta</th>
              <th className="w-1/12">Cantidad</th>
              <th className="w-1/6">Estado</th>
            </tr>
          </thead>
          <tbody>
            {currentPage &&
              currentPage.map((product, index) => (
                <ProductItem
                  key={product.id}
                  custom={index}
                  data={product}
                  isActive={isVisible === product.id}
                  openModal={() => openModal(product.id)}
                  closeModal={closeModal}
                />
              ))}
          </tbody>

        </motion.table>
        {isFetching && !currentPage && <TableListSkeleton />}
        {error && (
          <div role="alert" className="alert alert-error">
            <span className="icon-[simple-line-icons--close]" role="img" aria-hidden="true" />
            <span>{error.message}</span>
          </div>
        )}
        <div className="join self-center">
          <button
            onClick={() => handlePreviousPage()}
            disabled={currentPageIndex === 0 || isFetching}
            className="disabled:cursor-not-allowed join-item btn btn-primary btn-md"
          >
            <span className="icon-[ps--left]" role="img" aria-hidden="true" />
            <span>Anterior</span>
          </button>
          <button
            onClick={() => handleNextPage()}
            disabled={
              (!hasNextPage &&
                currentPageIndex === (products?.pages?.length ?? 0) - 1) ||
              isFetching
            }
            className="disabled:cursor-not-allowed join-item btn btn-primary btn-md"
          >
            <span>Siguiente</span>
            <span className="icon-[ps--right]" role="img" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductList;
