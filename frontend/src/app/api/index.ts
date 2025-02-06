"use server";
import axios from "axios";
import { getDatabaseConfig } from "./config";
import { cookies } from "next/headers";

const { API_URL } = getDatabaseConfig;

export const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  async (config) => {
    const excludedRoutes = ["/login", "/register"];

    if (!excludedRoutes.some((route) => config.url?.includes(route))) {
      const token = cookies().get("authToken");
      if (token?.value) {
        config.headers.Authorization = `Bearer ${token.value}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
