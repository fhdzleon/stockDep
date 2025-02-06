"use client";

import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { getTopSoldProducts } from "@/app/api/movements.api";
import { TopSoldProduct } from "@/types/product.types";

ChartJS.register(ArcElement, Tooltip, Legend);


export default function MostSoldProductsChart() {
  const [chartData, setChartData] = useState<ChartData<"doughnut"> | null>(
    null
  );
  const [productList, setProductList] = useState<TopSoldProduct[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getTopSoldProducts();

      if (error) {
        setError(error);
        return;
      }
      if (data) {
        setProductList(data);
        const labels = data.map(
          (product: TopSoldProduct) => product.product_name
        );
        const values = data.map((product: TopSoldProduct) =>
          Number.parseInt(product.total_quantity, 10)
        );

        setChartData({
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
              ].slice(0, data.length),
              borderColor: Array(data.length).fill("#ffffff"),
              borderWidth: 1,
            },
          ],
        });
      }
    };
    fetchData();
  }, []);

  const options: ChartOptions<"doughnut"> = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.formattedValue;
            return `${label}: ${value}`;
          },
        },
      },
    },
    cutout: "60%",
    radius: "90%",
  };

  if (error) {
    return (
      <div className="alert alert-error">
        Error al cargar los datos: {error}
      </div>
    );
  }

  if (!chartData) {
    return <div className="alert alert-info mt-10 mx-5">Cargando datos...</div>;
  }

  return (
    <div className="card w-full  bg-base-100">
      <div className="card-body">
        <p className="text-primary font-bold my-3">Productos más vendidos</p>

        {productList.length === 0 ? (
          <p className="text-center text-gray-500 font-semibold">
            No se han registrado ventas
          </p>
        ) : (
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-4 md:mb-0 flex items-center justify-center">
              <div className="w-60 h-60">
                <Doughnut data={chartData} options={options} />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="grid grid-cols-2 gap-2 overflow-auto">
                {[0, 1].map((columnIndex) => (
                  <table key={columnIndex} className="table table-zebra w-full">
                    <thead className="sticky top-0 bg-base-100 z-10">
                      <tr>
                        <th className="text-primary text-lg font-bold">
                          Producto
                        </th>
                        <th className="text-primary text-lg font-bold">
                          Vendidos
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array(5)
                        .fill(null)
                        .map((_, index) => {
                          const product = productList[columnIndex * 5 + index];
                          return (
                            <tr key={index}>
                              <td>{product ? product.product_name : ""}</td>
                              <td className="text-center">
                                {product ? product.total_quantity : ""}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
