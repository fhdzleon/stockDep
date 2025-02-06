"use client";

import { useProducts } from "@/hooks/useProduct";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { Toast } from "../toast";

interface DeleteProps {
  productID: string;
  productName: string;
  closeModal: () => void;
}

function ProductDelete({ productID, closeModal, productName }: DeleteProps) {
  const { deleteResponse, deleteProduct, isDeleting } = useProducts();

  const handleDelete = () => {
    Swal.fire({
      title: "Eliminar producto",
      html: `¿Estás seguro de eliminar el producto <b>${productName}</b>?`,
      icon: "warning",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "Si",
      confirmButtonColor: "var(--primary)",
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteProduct(productID);
      }
    });
  };

  useEffect(() => {
    if (!deleteResponse) return
    if (deleteResponse.success) {
      Toast.fire({
        title: "Producto Eliminado!",
        icon: "success",
      });
      closeModal()
    } else {
      Toast.fire({
        title: deleteResponse.error || "Error al eliminar producto",
        icon: "error",
      });
    }
  }, [closeModal, deleteResponse])

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="btn-sm w-full btn btn-ghost rounded-none flex items-center justify-between"
      >
        <span>Eliminar</span>
        <span className="icon-[prime--trash]" role="img" aria-hidden="true" />
      </button>
    </>
  );
}

export default ProductDelete;
