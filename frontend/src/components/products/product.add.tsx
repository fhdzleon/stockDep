"use client";
import { ProductSchema } from "@/lib/schemas/products.schema";
import InputGroup from "@/ui/input.group";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUserStore } from "@/store/user.store";
import { useProducts } from "@/hooks/useProduct";
import { useCategories } from "@/hooks/useCategories";
import { useEffect, useState } from "react";
import { Toast } from "../toast";
import SelectGroup from "@/ui/SelectGroup";
import Modal from "../modal";


function ProductAdd() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: zodResolver(ProductSchema),
  });

  const { data: userData } = useUserStore();
  const { createProduct, isCreating, createResponse } = useProducts();
  const { categoriesData } = useCategories();


  const handleSave: SubmitHandler<ProductSchema> = async (data) => {
    await createProduct({ ...data, userId: userData?.id });
  };

  useEffect(() => {
    if (!createResponse) return;

    if (createResponse.success) {
      Toast.fire({
        title: "Producto Agregado!",
        icon: "success",
      });
      reset();
      closeAgg()
    } else {
      Toast.fire({
        title: createResponse.error || "Error al crear producto",
        icon: "error",
      });
    }
  }, [createResponse, reset]);

  const [agg, setAgg] = useState(false);
  const openAgg = () => setAgg(true);
  const closeAgg = () => setAgg(false);

  return (
    <>
      <button
        onClick={openAgg}
        className="btn btn-primary flex items-center gap-2"
      >
        <span>Agregar</span>
        <span
          className="icon-[si--add-to-library-duotone]"
          role="img"
          aria-hidden="true"
        />
      </button>
      <Modal
        close={closeAgg}
        show={agg}
      >
        <div className="bg-white flex flex-col items-center p-5 rounded gap-10">
          <span className="text-2xl text-primary font-semibold">Agregar Producto</span>

          <form
            onSubmit={handleSubmit(handleSave)}
            className="items-center max-w-3xl px-5 min-w-96 flex flex-col gap-3  lg:grid grid-cols-8"
          >
            <InputGroup
              {...register("name")}
              extendClass="col-span-4"
              id="Nombre"
              label="Nombre"
              errors={errors.name}
            />

            <SelectGroup {...register("categoryId")} data={categoriesData} label="Categoria" errors={errors.categoryId} extendClass="col-span-4" />

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
                disabled={isCreating}
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

export default ProductAdd;
