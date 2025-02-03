"use client";
import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProduct";
import ProductItem from "./product.item";
import { ProductItemSkeleton } from "./product.item.skeleton";
import { motion, Variants } from "framer-motion";

const listVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const itemVarians: Variants = {
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
    <div className="flex flex-col h-full justify-between gap-5 mb-5 mt-5 w-full">
      {
        <motion.ul
          variants={listVariant}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto h-full min-h-[600px] shadow-sm text-sm w-full"
        >
          <li className="text-center rounded-t bg-primary gap-5 text-white sticky top-0 grid grid-cols-9 p-2 transition-colors">
            <span className="col-span-2 text-start">Producto</span>
            <span className="text-start col-span-2">Categoria</span>
            <span>Caducidad</span>
            <span>P. Inicial</span>
            <span>P. Venta</span>
            <span>Cantidad</span>
            <span>Estado</span>
          </li>
          {isFetching && currentPage.length === 0 && <ProductItemSkeleton />}
          {error && (
            <div className="alert">
              <span
                className="icon-[iconamoon--sign-times-duotone]"
                role="img"
                aria-hidden="true"
              />
              <span>{error.message}</span>
            </div>
          )}
          {currentPage.length === 0 && !isFetching && (
            <div className="alert mt-5">
              <span
                className="icon-[iconamoon--sign-times-duotone]"
                role="img"
                aria-hidden="true"
              />
              <span>No hay productos</span>
            </div>
          )}
          {currentPage &&
            currentPage.map((product, index) => (
              <motion.li
                viewport={{ once: true }}
                custom={index}
                variants={itemVarians}
                key={product.id}
              >
                <ProductItem
                  data={product}
                  isActive={isVisible === product.id}
                  openModal={() => openModal(product.id)}
                  closeModal={closeModal}
                />
              </motion.li>
            ))}
        </motion.ul>
      }

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
  );
}

export default ProductList;
