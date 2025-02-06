"use server";
import { ProductSchema } from "@/lib/schemas/products.schema";
import { API } from ".";
import { randomUUID } from "crypto";
import {
  MutationResponse,
  ProductsResponse,
  QueriesResponse
} from "@/types/product.types";
import { AxiosError } from "axios";

interface ProductErrorResponse {
  message?: string;
  errors?: Array<{
    msg: string;
  }>;
}

export const getAllProducts = async (
  pageParam: number
): Promise<QueriesResponse> => {
  try {
    const { data } = await API.get(
      `/product/query?filter[totalProducts]=true&limit=10&page=${pageParam}`
    );
    return {
      data: data.products,
      pagination: {
        currentPage: data.currentPage,
        totalPages: data.totalPages,
      },
    };
  } catch (error) {
    const axiosError = error as AxiosError<ProductErrorResponse>;
    return {
      data: [],
      pagination: null,
      error: axiosError.response?.data?.message || axiosError.message,
    };
  }
};


export const AllProductsEndpoint = async (): Promise<QueriesResponse> => {
  try {
    const { data } = await API.get("/products/all");
    return { data }
  } catch (error) {
    const axiosError = error as AxiosError<ProductErrorResponse>;
    return {
      data: [],
      pagination: null,
      error: axiosError.response?.data?.message || axiosError.message,
    };
  }
}

export const postProduct = async (
  product: ProductSchema
): Promise<MutationResponse> => {

  const ed = product.expirationDate === '' ? null : product.expirationDate
  const newProduct = {
    ...product,
    sku: randomUUID(),
    expirationDate: ed,
  };
  try {
    const { data } = await API.post("/products", newProduct);
    return { success: true, data };
  } catch (error) {
    const axiosError = error as AxiosError<ProductErrorResponse>;
    return {
      success: false,
      error: axiosError.response?.data.message || axiosError.message,
    };
  }
};

export const deleteProduct = async (id: string): Promise<MutationResponse> => {
  try {
    const { data } = await API.delete(`/products/delete/${id}`);
    return { success: true, data };
  } catch (error) {
    const axiosError = error as AxiosError<ProductErrorResponse>;
    return {
      success: false,
      error: axiosError.response?.data?.errors?.[0]?.msg || axiosError.message,
    };
  }
};

export const putProduct = async (
  product: ProductsResponse
): Promise<MutationResponse> => {
  const newData = {
    ...product,
    expirationDate: product.expirationDate === '' ? null : product.expirationDate
  }
  try {
    const { data } = await API.put(`/products/update/` + product.id, newData);
    return { success: true, data };
  } catch (error) {
    const axiosError = error as AxiosError<ProductErrorResponse>;
    return {
      success: false,
      error: axiosError.response?.data?.errors?.[0]?.msg || axiosError.message,
    };
  }
};

const fetchProductsByFilter = async (filter: string) => {
  try {
    const totalResponse = await API.get(`/product/query?filter[${filter}]=all`);

    const total = totalResponse.data.totalItems || 0;

    const limitedResponse = await API.get(
      `/product/query?filter[${filter}]=10`
    );
    const products = limitedResponse.data.products || [];

    return { total, products };
  } catch (error) {
    throw error;
  }
};

export const handleStock = async () => fetchProductsByFilter("nonZeroQuantity");
export const handleLowStock = async () =>
  fetchProductsByFilter("minimumQuantity");
export const handleZeroStock = async () =>
  fetchProductsByFilter("zeroQuantity");

export const getRecentProducts = async (): Promise<QueriesResponse> => {
  try {
    const { data } = await API.get(
      `/product/query?sort={"createdAt":-1}&limit=3&page=1`
    );
    return {
      data: data.products,
      pagination: {
        currentPage: data.currentPage,
        totalPages: data.totalPages,
      },
    };
  } catch (error) {
    const axiosError = error as AxiosError<ProductErrorResponse>;
    return {
      data: [],
      pagination: null,
      error: axiosError.response?.data?.message || axiosError.message,
    };
  }
};