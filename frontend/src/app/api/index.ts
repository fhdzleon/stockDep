import axios from "axios";
import { getDatabaseConfig } from "./config";
import { useAuthStore } from "@/store/auth.store";

const { API_URL } = getDatabaseConfig;

export const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    console.log("token enviado", token);

    const requestUrl = config.url || "";

    if (requestUrl.includes("/login") || requestUrl.includes("/register")) {
      return config;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
