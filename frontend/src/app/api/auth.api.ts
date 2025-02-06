"use server";
import { cookies } from "next/headers";

import { API } from ".";
import { useUserStore } from "@/store/user.store";
import { ApiResponse, LoginProps, RegisterProps } from "./config";
import { AxiosError } from "axios";

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

export const handleLogin = async (
  dataLogin: LoginProps
): Promise<
  ApiResponse<{
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    nameCompany: string;
    businessArea: string;
    user: User;
    token: string;
  }>
> => {
  try {
    const { data } = await API.post<LoginResponse>("/users/login", dataLogin);
    const token = data.token;
    cookies().set("authToken", token, {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24,
      sameSite: false,
    });
    return {
      wasValid: true,
      message: data.message,
      data: {
        user: data.user,
        token: data.token,
        id: data.user.id,
        firstname: data.user.firstname,
        lastname: data.user.lastname,
        email: data.user.email,
        nameCompany: data.user.nameCompany,
        businessArea: data.user.businessArea,
      },
    };
  } catch (error) {
    const errorMessage = error
      ? "Error al iniciar sesión"
      : "Error al iniciar sesión";
    return {
      wasValid: false,
      message: errorMessage,
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

    const cookieStore = cookies();
    cookieStore.delete("authToken");

    const { delData } = useUserStore.getState();
    delData();

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
