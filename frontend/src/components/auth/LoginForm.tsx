"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginSchemaType } from "@/lib/schemas/auth.schema";
import Link from "next/link";
import { handleLogin } from "@/app/api/auth.api";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUserStore } from "@/store/user.store";
import { BasicUserInfo } from "@/types/user.type";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { setData } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (LoginData: LoginSchemaType) => {
    const response = await handleLogin(LoginData);
    console.log("respuesta back", response);

    if (!response.wasValid) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.message,
        confirmButtonColor: "var(--primary)",
      });
    }

    if (!response.data) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se recibieron datos del usuario",
        confirmButtonColor: "var(--primary)",
      });
    }

    const userData: BasicUserInfo = response.data;

    Swal.fire({
      icon: "success",
      title: "Bienvenido",
      text: response.message,
      confirmButtonColor: "var(--primary)",
    });

    setData(userData);

    router.push("/dashboard");
  };

  return (
    <div className="mt-16">
      <p className="text-2xl font-semibold text-primary text-center ">
        Inicar sesión
      </p>
      <form
        className="space-y-8 w-[400px]  mt-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <input
            className=" border-[1px] h-12 border-primary  rounded-xl p-2 "
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="relative flex flex-col">
          <input
            className="border-[1px] h-12 rounded-xl border-primary p-2 pr-10"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            {...register("password")}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <Image
              src={showPassword ? "/eye-off.svg" : "/eye.svg"}
              alt="Toggle password visibility"
              width={24}
              height={24}
            />
          </button>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button className="btn btn-neutral w-full" type="submit">
          Ingresar
        </button>
      </form>
      <p className="text-center mt-7">
        ¿No tienes una cuenta?
        <Link
          className="btn text-primary no-underline btn-link"
          href={"/auth/signup"}
        >
          Registrate
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
