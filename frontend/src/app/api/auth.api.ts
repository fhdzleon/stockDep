"use server";

import { API } from ".";
import { useUserStore } from "@/store/user.store";
import { ApiResponse, LoginProps, RegisterProps } from "./config";
import { AxiosError } from "axios";
import { useAuthStore } from "@/store/auth.store";
import { BasicUserInfo } from "@/types/user.type";

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  nameCompany: string;
  businessArea: string;
}

export interface ErrorResponse {
  message: string;
  statusCode?: number;
}

export const handleLogin = async ({
  email,
  password,
}: LoginProps): Promise<ApiResponse<BasicUserInfo>> => {
  try {
    const response = await API.post<{
      token: string;
      user: BasicUserInfo;
    }>("/users/login", {
      email,
      password,
    });

    const { token, user } = response.data;

    console.log("esto es lo que guardamos en zustand", token);

    useAuthStore.getState().setToken(token);
    useUserStore.getState().setData(user);

    return {
      wasValid: true,
      message: "¡Inicio de sesión exitoso!",
      data: { token, user },
    };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;

    console.error("Error al hacer la solicitud:", axiosError.response);

    return {
      wasValid: false,
      message:
        axiosError.response?.data?.message ||
        "Hubo un error al intentar iniciar sesión.",
    };
  }
};

export const handleRegister = async (
  dataRegister: RegisterProps
): Promise<ApiResponse> => {
  try {
    await API.post("/users/register", dataRegister);

    return {
      wasValid: true,
      message: "¡Usuario registrado exitosamente!",
    };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;

    if (axiosError.response?.status === 409) {
      return {
        wasValid: false,
        message: "Ya existe una cuenta con ese correo electrónico.",
      };
    }
    return {
      wasValid: false,
      message:
        axiosError.response?.data?.message ||
        "Hubo un error al registrar el usuario.",
    };
  }
};

export const handleLogout = async (): Promise<ApiResponse> => {
  try {
    await API.post("/users/logout");

    localStorage.removeItem("authToken");

    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    useUserStore.getState().delData();
    useAuthStore.getState().setToken(null);

    return {
      wasValid: true,
      message: "¡Sesión cerrada exitosamente!",
    };
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    return {
      wasValid: false,
      message:
        axiosError.response?.data?.message ||
        "Hubo un error al intentar cerrar la sesión.",
    };
  }
};
