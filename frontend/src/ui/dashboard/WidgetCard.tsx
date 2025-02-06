/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductListModal from "./ProductListModal";
import { ProductModal } from "./ProductListModal";

type ActionResponse =
  | { total: number; products: ProductModal[] }
  | ProductModal[];

interface WidgetCardProps {
  title: string;
  bg: string;
  action: () => Promise<ActionResponse>;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ title, bg, action }) => {
  const [response, setResponse] = useState<string | number>("Cargando...");
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState<ProductModal[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await action();
        setResponse("total" in result ? result.total : "Error");
      } catch (error) {
        setResponse("Error");
      }
    };

    fetchData();
  }, [action]);

  const handleOpenModal = async () => {
    setShowModal(true);
    try {
      const result = await action();
      setProducts("products" in result ? result.products : result);
    } catch (error) {
      setProducts([]);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="px-3 py-2 space-y-4 md:mx-2 mt-5 md:mt-14 flex flex-col border-[1px] mx-auto w-3/4 md:w-1/4 border-primary rounded-lg">
      <p className="text-base text-center font-bold">{title}</p>
      <div className="flex items-center space-x-4 justify-center">
        <div
          className={`${bg} rounded-lg h-16 py-2 px-1 flex justify-center items-center w-16`}
        >
          <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-10"
          >
            <path
              d="M24.5 36.1385L16.6925 28.331L18.8 26.223L24.5 31.923L35.8385 20.5845L37.946 22.6925L24.5 36.1385ZM34.5 17H31.5V7.61549C31.5 7.46149 31.4358 7.32049 31.3075 7.19249C31.1795 7.06416 31.0385 6.99999 30.8845 6.99999H26.5V12.2305H8.5V6.99999H4.1155C3.9615 6.99999 3.8205 7.06416 3.6925 7.19249C3.56417 7.32049 3.5 7.46149 3.5 7.61549V34.3845C3.5 34.5385 3.56417 34.6795 3.6925 34.8075C3.8205 34.9358 3.9615 35 4.1155 35H15.5V38H4.1155C3.11817 38 2.26617 37.6468 1.5595 36.9405C0.853167 36.2338 0.5 35.3818 0.5 34.3845V7.61549C0.5 6.61816 0.853167 5.76616 1.5595 5.05949C2.26617 4.35316 3.11817 3.99999 4.1155 3.99999H12.927C13.204 3.02566 13.77 2.21799 14.625 1.57699C15.48 0.935993 16.4383 0.615494 17.5 0.615494C18.6027 0.615494 19.5763 0.935993 20.421 1.57699C21.266 2.21799 21.827 3.02566 22.104 3.99999H30.8845C31.8818 3.99999 32.7338 4.35316 33.4405 5.05949C34.1468 5.76616 34.5 6.61816 34.5 7.61549V17ZM17.5 7.23099C18.0153 7.23099 18.4455 7.0585 18.7905 6.7135C19.1352 6.3685 19.3075 5.93833 19.3075 5.423C19.3075 4.90766 19.1352 4.4775 18.7905 4.1325C18.4455 3.78783 18.0153 3.61549 17.5 3.61549C16.9847 3.61549 16.5545 3.78783 16.2095 4.1325C15.8648 4.4775 15.6925 4.90766 15.6925 5.423C15.6925 5.93833 15.8648 6.3685 16.2095 6.7135C16.5545 7.0585 16.9847 7.23099 17.5 7.23099Z"
              fill="#E8EAED"
            />
          </svg>
        </div>
        <p className="text-2xl font-bold">{response}</p>
      </div>
      <p
        className="flex justify-end text-base font-bold text-primary cursor-pointer"
        onClick={handleOpenModal}
      >
        Ver más
      </p>
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black backdrop-blur bg-opacity-50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg p-6 w-1/2 max-h-[80vh] overflow-y-auto"
            >
              <ProductListModal
                close={handleCloseModal}
                products={products}
                title={title}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WidgetCard;
