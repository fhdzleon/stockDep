"use server";

import { MovementSchema } from "@/lib/schemas/movement.schema";
import { API } from ".";
import {
  MutationMovementResponse,
  QuerieMovementResponse,
} from "@/types/movements.type";
import { AxiosError } from "axios";
import { QueryFilterTopSoldProductResponse } from "@/types/product.types";

interface axiosResponse {
  message?: string;
  errors?: Array<{
    msg: string;
  }>;
}
export const getAllMovements = async (): Promise<QuerieMovementResponse> => {
  try {
    const { data } = await API.get("/movements/all");
    return { data: data.data };
  } catch (error) {
    const axiosError = error as AxiosError<axiosResponse>;
    return {
      data: [],
      error:
        axiosError.response?.data.message ||
        axiosError.message ||
        "Error desconocido al cargar movimientos",
    };
  }
};

export const postOneMovement = async (
  movement: MovementSchema
): Promise<MutationMovementResponse> => {
  try {
    const { data } = await API.post("/movements", movement);
    return { data: data.data, success: true };
  } catch (error) {
    const axiosError = error as AxiosError<axiosResponse>;

    return {
      success: false,
      error:
        axiosError.response?.data.message ||
        axiosError.response?.data.errors?.[0].msg ||
        axiosError.message ||
        "Error desconocido al agregar movimiento",
    };
  }
};

export const getTopSoldProducts = async (): Promise<QueryFilterTopSoldProductResponse> => {
  try {
    const { data } = await API.get("/movement/query?type=Salida&motive=venta");
    return { data: data.data };
  } catch (error) {
    const axiosError = error as AxiosError<axiosResponse>;
    return {
      data: [],
      error:
        axiosError.response?.data.message ||
        axiosError.message ||
        "Error desconocido al cargar productos más vendidos",
    };
  }
};
