"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { OptionalProductSchema } from "@/lib/schemas/products.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputGroup from "@/ui/input.group";
import { useUserStore } from "@/store/user.store";
import { useProducts } from "@/hooks/useProduct";
import { ProductsResponse } from "@/types/product.types";
import { useCategoriesStore } from "@/store/product.store";
import { Toast } from "../toast";
import SelectGroup from "@/ui/SelectGroup";
import Modal from "../modal";

interface EditProps {
  product: ProductsResponse;
  closeModal: () => void;
}

function ProductEdit({ product, closeModal }: EditProps) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisible = () => setIsVisible(!isVisible);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<OptionalProductSchema>({
    defaultValues: {
      name: product.name,
      description: product.description,
      costPrice: product.costPrice,
      finalPrice: product.finalPrice,
      quantity: product.quantity,
      minimumQuantity: product.minimumQuantity,
      categoryId: product.categoryId,

      expirationDate: product.expirationDate?.split("T")[0] ?? "",
    },
    resolver: zodResolver(OptionalProductSchema),
  });

  const { data } = useCategoriesStore();
  const { data: userData } = useUserStore();

  const { updateProduct, isUpdating, updateResponse } = useProducts();

  const handleSave: SubmitHandler<OptionalProductSchema> = async (data) => {
    const fulldata: ProductsResponse = {
      ...product,
      ...data,
      userId: userData?.id ?? "",
    };
    await updateProduct(fulldata);
  };

  useEffect(() => {
    if (!updateResponse) return;

    if (updateResponse.success) {
      Toast.fire({
        title: "Producto Actulizado!",
        icon: "success",
      });
      closeModal();
    } else {
      Toast.fire({
        title: updateResponse.error || "Error al editar producto",
        icon: "error",
      });
    }
  }, [updateResponse, closeModal]);

  return (
    <>
      <button
        onClick={toggleVisible}
        className="btn-sm w-full btn btn-ghost rounded-none flex items-center justify-between"
      >
        <span>Editar</span>
        <span className="icon-[prime--pencil]" role="img" aria-hidden="true" />
      </button>
      <Modal show={isVisible} close={toggleVisible}>
        <div className="bg-white flex flex-col items-center p-5 rounded gap-10">
          <span className="text-2xl text-primary font-semibold">
            Editar Producto
          </span>
          <form
            onSubmit={handleSubmit(handleSave)}
            className="items-center px-5 max-w-3xl min-w-96 flex flex-col gap-3  lg:grid grid-cols-8"
          >
            <InputGroup
              {...register("name")}
              extendClass="col-span-4"
              id="Nombre"
              label="Nombre"
              errors={errors.name}
            />

            <SelectGroup
              {...register("categoryId")}
              data={data}
              label="Categoria"
              errors={errors.categoryId}
              extendClass="col-span-4"
            />

            <InputGroup
              {...register("description")}
              extendClass="col-span-5"
              id="Descripción"
              label="Descripción"
              errors={errors.description}
            />
            <InputGroup
              errors={errors.expirationDate}
              {...register("expirationDate")}
              type="date"
              extendClass="col-span-3"
              id="Fecha de Caducidad"
              label="Fecha de Caducidad"
            />
            <InputGroup
              type="number"
              errors={errors.costPrice}
              {...register("costPrice")}
              extendClass="col-span-2"
              id="Precio Inicial"
              label="Precio Inicial"
            />
            <InputGroup
              type="number"
              errors={errors.finalPrice}
              {...register("finalPrice")}
              extendClass="col-span-2"
              id="Precio de Venta"
              label="Precio de Venta"
            />
            <InputGroup
              type="number"
              errors={errors.quantity}
              {...register("quantity")}
              extendClass="col-span-2"
              id="Cantidad"
              label="Cantidad"
            />
            <InputGroup
              type="number"
              errors={errors.minimumQuantity}
              {...register("minimumQuantity")}
              extendClass="col-span-2"
              id="Cantidad min"
              label="Cantidad min"
            />
            <div className="col-span-8 mt-5 mx-auto grid border place-content-center">
              <button
                disabled={isUpdating}
                type="submit"
                className="btn btn-primary"
              >
                <span>Guardar</span>
                <span
                  className="icon-[lets-icons--save-duotone]"
                  role="img"
                  aria-hidden="true"
                />
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default ProductEdit;
