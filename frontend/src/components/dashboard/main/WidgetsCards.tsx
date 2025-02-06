import React from "react";
import WidgetCard from "../../../ui/dashboard/WidgetCard";
import {
  handleLowStock,
  handleZeroStock,
  handleStock,
} from "@/app/api/product.api";

const WidgetsCards = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center">
      <WidgetCard
        title="Productos Disponibles"
        bg="bg-success"
        action={handleStock}
      />

      <WidgetCard
        title="Productos con bajo stock"
        bg="bg-warning"
        action={handleLowStock}
      />

      <WidgetCard
        title="Productos sin stock"
        bg="bg-alert"
        action={handleZeroStock}
      />
    </div>
  );
};

export default WidgetsCards;
