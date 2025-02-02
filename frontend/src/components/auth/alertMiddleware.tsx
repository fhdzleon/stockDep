"use client";
import { useCategoriesStore, useFilterProduct } from "@/store/product.store";
import { useUserStore } from "@/store/user.store";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function AlertMiddleware() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [, setErrorMessage] = useState<string | null>(null);
  const { setData } = useCategoriesStore();
  const { delData } = useUserStore();
  const { cleanFilter } = useFilterProduct();
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      const errorMap: Record<string, string> = {
        unauthenticated: "Debes iniciar sesión.",
        invalid: "Tu sesión no es válida.",
        expired: "Tu sesión ha expirado, por favor inicia sesión de nuevo.",
        server: "Error en el servidor. Intenta más tarde.",
      };

      const error = errorMap[errorParam] || "Ocurrió un error desconocido.";
      setErrorMessage(error);

      setData([]);
      delData();
      cleanFilter();

      localStorage.removeItem("categories-store");
      localStorage.removeItem("filter-product");
      localStorage.removeItem("user-store");

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error,
        confirmButtonColor: "var(--primary)",
      }).then(() => {
        setErrorMessage(null);
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.delete("error");
        router.replace(`${pathname}?${newParams.toString()}`);
      });
    }
  }, [searchParams, pathname, router]);

  return null;
}

export default AlertMiddleware;
