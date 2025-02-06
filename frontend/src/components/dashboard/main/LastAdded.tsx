import React from "react";
import { getRecentProducts } from "@/app/api/product.api";
import clsx from "clsx";
import Link from "next/link";

const LastAdded = async () => {
  const { data: products } = await getRecentProducts();

  const stockText = (quantity: number, minimumQuantity: number) => {
    return quantity === 0
      ? "nulo"
      : quantity <= minimumQuantity
      ? "bajo"
      : "disponible";
  };

  const stockClass = (quantity: number, minimumQuantity: number) =>
    clsx(
      "font-semibold rounded text-xs w-1/2 h-fit p-1 inline-block text-center",
      {
        "text-red-800 bg-red-200": quantity === 0,
        "text-yellow-800 bg-yellow-200":
          quantity <= minimumQuantity && quantity > 0,
        "text-green-800 bg-green-200": quantity > minimumQuantity,
      }
    );

  return (
    <div className="mx-10 mb-10">
      <p className="text-primary font-bold my-3">Agregados recientemente</p>
      {products.length === 0 ? (
        <p className="text-center text-gray-500 font-semibold">
          No se han agregado productos
        </p>
      ) : (
        <>
          <li className="text-center rounded-t bg-primary gap-5 text-white sticky top-0 grid grid-cols-6 p-2 transition-colors">
            <span className="col-span-2 text-start">Producto</span>
            <span className="text-start col-span-2">Categoría</span>
            <span className="text-center">Cantidad</span>
            <span className="text-center hidden md:block">Estado</span>
          </li>
          {products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-6 p-2 border-b items-center"
            >
              <span className="col-span-2 truncate">{product.name}</span>
              <span className="col-span-2 truncate">
                {product.Category.name}
              </span>
              <span className="text-center">{product.quantity}</span>
              <span className="flex justify-center">
                <span
                  className={`hidden md:block ${stockClass(
                    product.quantity,
                    product.minimumQuantity
                  )}`}
                >
                  {stockText(product.quantity, product.minimumQuantity)}
                </span>
              </span>
            </div>
          ))}
          <div className="text-right">
            <Link href={"/dashboard/products"}>
              <button className="bg-primary px-4 mt-4 py-1 rounded-xl text-white">
                Ver más
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default LastAdded;
