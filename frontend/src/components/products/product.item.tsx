"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useRef, useState } from "react";
import ProductEdit from "./product.edit";
import ProductDelete from "./product.delete";
import { MouseEvent } from "react";
import { ProductoProps } from "@/types/product.types";
import formatDate from "@/utils/formatDate.util";
import { itemVarians } from "./product.list";

const ProductItem: FC<ProductoProps> = ({
  data,
  isActive,
  openModal,
  closeModal,
  custom
}) => {

  const caducidadText = !data.expirationDate
    ? "N/A"
    : formatDate(data.expirationDate!);
  const stockText = () => {
    return data.quantity === 0
      ? "nulo"
      : data.quantity <= data.minimumQuantity
        ? "bajo"
        : "disponible";
  };

  const stockClass = clsx("font-semibold rounded-full h-fit px-2 flex items-center", {
    "text-red-800 bg-red-200": data.quantity === 0,
    "text-yellow-800 bg-yellow-200":
      data.quantity <= data.minimumQuantity && data.quantity > 0,
    "text-green-800 bg-green-200": data.quantity > data.minimumQuantity,
  });

  const [axis, setAxis] = useState({
    x: 0,
    y: 0,
  });
  const containerRef = useRef<HTMLTableRowElement>(null);
  const handleOptions = (e: MouseEvent<HTMLTableRowElement>) => {
    if (isActive) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setAxis({ x, y });
    openModal();
  };


  const iconState = clsx({
    "icon-[oui--token-null]": data.quantity === 0,
    "icon-[mdi--arrow-bottom-left-thick]":
      data.quantity <= data.minimumQuantity && data.quantity > 0,
    "icon-[mdi--arrow-top-right-thick]": data.quantity > data.minimumQuantity,
  })

  const trClass = clsx("relative cursor-pointer transition-colors", {
    "bg-blue-50": isActive,
    "hover:bg-blue-50": !isActive,
    "bg-rose-50 hover:bg-rose-100": data.quantity === 0
  })

  return (
    <motion.tr
      className={trClass}
      ref={containerRef}
      onClick={(handleOptions)}
      custom={custom}
      variants={itemVarians}
    >
      <td data-label="Producto">{data.name}</td>
      <td data-label="Categoria">{data.Category.name}</td>
      <td data-label="Caducidad">
        <div className="flex justify-end md:justify-start">
          <div className="flex items-center gap-1  border-zinc-500 border rounded-full px-2">
            <span className="icon-[lets-icons--date-range-light]" role="img" aria-hidden="true" />
            <span>{caducidadText}</span>
          </div>
        </div>
      </td>
      <td data-label="P. Inicial">$ {data.costPrice}</td>
      <td data-label="P. Venta">$ {data.finalPrice}</td>
      <td data-label="Cantidad">{data.quantity}</td>
      <td data-label="Estado">
        <div className="flex justify-end md:justify-start">
          <div className={stockClass}>
            <span className={iconState} role="img" aria-hidden="true" />
            <span>{stockText()}</span>
          </div>
        </div>
      </td>

      <AnimatePresence>
        {isActive && (
          <motion.td
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 20,
              duration: 0.3,
            }}
            style={{
              top: axis.y,
              left: axis.x,
            }}
            className="absolute top-0 rounded text-xs border w-36 p-0 border-primary z-10 bg-white shadow-sm"
          >
            <ProductEdit closeModal={closeModal} product={data} />
            <ProductDelete
              productID={data.id}
              productName={data.name}
              closeModal={closeModal}
            />
            <button
              onClick={closeModal}
              className="btn-sm w-full btn btn-ghost rounded-none flex items-center justify-between"
            >
              <span>Cancelar</span>
              <span
                className="icon-[iconamoon--sign-times-duotone]"
                role="img"
                aria-hidden="true"
              />
            </button>
          </motion.td>
        )}
      </AnimatePresence>
    </motion.tr>
  );
};

export default ProductItem;
