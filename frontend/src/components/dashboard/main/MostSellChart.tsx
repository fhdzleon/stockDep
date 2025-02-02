/* "use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect, useState } from "react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  ChartDataLabels
);

const productos = [
  { nombre: "1", unidades: 25 },
  { nombre: "2", unidades: 40 },
  { nombre: "3", unidades: 30 },
  { nombre: "4", unidades: 15 },
  { nombre: "5", unidades: 20 },
  { nombre: "6", unidades: 35 },
  { nombre: "7", unidades: 28 },
  { nombre: "8", unidades: 22 },
  { nombre: "9", unidades: 18 },
  { nombre: "10", unidades: 33 },
];

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export default function MostSellChart() {
  const [data, setData] = useState<ChartData | null>(null);

  useEffect(() => {
    const labels = productos.map((producto) => producto.nombre);
    const values = productos.map((producto) => producto.unidades);

    setData({
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            "#0066cc",
            "#0077cc",
            "#0088cc",
            "#0099cc",
            "#00aacc",
            "#00bbcc",
            "#00cccc",
            "#00ddcc",
            "#00eecc",
            "#00ffcc",
          ],
          borderColor: Array(10).fill("#ffffff"),
          borderWidth: 1,
        },
      ],
    });
  }, []);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        color: "#333333",
        formatter: (value: number, context: any) => {
          return context.chart.data.labels[context.dataIndex];
        },
        font: {
          size: 11,
          weight: "bold" as const,
        },
        anchor: "end" as const,
        align: "end" as const,
        offset: 8,
        textAlign: "center" as const,
        listeners: {
          enter: (context: any) => {
            if (context.chart) {
              context.chart.tooltip.setActiveElements(
                [{ datasetIndex: context.datasetIndex, index: context.index }],
                { x: context.element.x, y: context.element.y }
              );
              context.chart.update();
            }
          },
          leave: (context: any) => {
            if (context.chart) {
              context.chart.tooltip.setActiveElements([], { x: 0, y: 0 });
              context.chart.update();
            }
          },
        },
      },
    },
    cutout: "60%",
    radius: "90%",
  };

  if (!data) return <p className="text-center text-gray-500">Cargando...</p>;

  return (
    <div className="w-80 h-80 mx-auto p-4 bg-white rounded-2xl">
      <p className="text-lg font-semibold mb-4">Productos más vendidos</p>
      <Doughnut data={data} options={options} />
    </div>
  );
}
 */

//!

import React from "react";

const MostSellChart = () => {
  return (
    <div>
      <p>Grafico</p>
    </div>
  );
};

export default MostSellChart;
