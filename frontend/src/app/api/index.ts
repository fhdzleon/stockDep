import axios from "axios";
import { getDatabaseConfig } from "./config";
import { cookies } from "next/headers";

export const getAuthToken = () => {
  const tokenFromCookies = cookies().get("authToken")?.value;
  const tokenFromLocalStorage =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  return tokenFromCookies || tokenFromLocalStorage;
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
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
