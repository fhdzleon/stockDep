"use client";

import { useMovements } from "@/hooks/useMovements";
import { motion, Variants } from "framer-motion";
import MovementAdd from "./MovementAdd";
import { TableListSkeleton } from "../TableListSkeleton";
import MovementItemx from "./MovementItem";

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

function MovementList() {
  const { movements, isFetchingMovement, movementError } = useMovements();

  return (
    <section className="mt-10 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-primary">
          Lista de movimientos
        </span>
        <MovementAdd />
      </div>
      <motion.table
        variants={listVariant}
        initial="hidden"
        animate="visible"
        className="table "
      >
        <thead className="bg-primary text-white">
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Movimiento</th>
            <th>Tipo</th>
            <th>Fecha</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((mov, index) => (
            <motion.tr custom={index} variants={itemVarians} key={mov.id}>
              <MovementItemx mov={mov} />
            </motion.tr>
          ))}
        </tbody>
      </motion.table>

      {isFetchingMovement && !movements && <TableListSkeleton />}
      {movementError && !movements && (
        <div role="alert" className="alert alert-error">
          <span
            className="icon-[simple-line-icons--close]"
            role="img"
            aria-hidden="true"
          />
          <span>{movementError.message}</span>
        </div>
      )}
    </section>
  );
}

export default MovementList;
