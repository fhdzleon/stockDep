import axios from "axios";
import { getDatabaseConfig } from "./config";
import { cookies } from "next/headers";

export const getAuthToken = () => {
  if (typeof window === "undefined") {
    return cookies().get("authToken")?.value;
  }

  return document.cookie.includes("authToken=")
    ? cookies().get("authToken")?.value
    : localStorage.getItem("authToken");
};

const { API_URL } = getDatabaseConfig;

export const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        document.cookie =
          "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
