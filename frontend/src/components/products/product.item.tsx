"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useRef, useState } from "react";
import ProductEdit from "./product.edit";
import ProductDelete from "./product.delete";
import { MouseEvent } from "react";
import { ProductoProps } from "@/types/product.types";
import formatDate from "@/utils/formatDate.util";

const ProductItem: FC<ProductoProps> = ({
  data,
  isActive,
  openModal,
  closeModal,
}) => {
  const statusClass = clsx(
    "text-center grid grid-cols-9 gap-5 h-14 items-center p-2 cursor-pointer transition-colors",
    {
      "bg-blue-50": isActive,
      "hover:bg-blue-50": !isActive,
    }
  );
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

  const stockClass = clsx("font-semibold rounded text-xs w-full h-fit p-1", {
    "text-red-800 bg-red-200": data.quantity === 0,
    "text-yellow-800 bg-yellow-200":
      data.quantity <= data.minimumQuantity && data.quantity > 0,
    "text-green-800 bg-green-200": data.quantity > data.minimumQuantity,
  });

  const [axis, setAxis] = useState({
    x: 0,
    y: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const handleOptions = (e: MouseEvent<HTMLDivElement>) => {
    if (isActive) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setAxis({ x, y });
    openModal();
  };

  return (
    <div className="relative">
      <div ref={containerRef} onClick={handleOptions} className={statusClass}>
        <span
          title={data.name}
          className="col-span-2 text-start max-w-40 w-full truncate whitespace-nowrap line-clamp-2"
        >
          {data.name}
        </span>
        <span className="text-start truncate text-ellipsis col-span-2">
          {data.Category.name}
        </span>
        <span>{caducidadText}</span>
        <span>{data.costPrice}</span>
        <span>{data.finalPrice}</span>
        <span>{data.quantity}</span>
        <span className={stockClass}>{stockText()}</span>
      </div>
      <AnimatePresence>
        {isActive && (
          <motion.div
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
            className="absolute top-0 rounded text-xs border w-28 border-primary z-10 bg-white shadow-sm"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductItem;
