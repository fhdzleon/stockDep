"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { OptionalProductSchema } from "@/lib/schemas/products.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputGroup from "@/ui/input.group";
import { useUserStore } from "@/store/user.store";
import Swal from "sweetalert2";
import { useProducts } from "@/hooks/useProduct";
import { ProductsResponse } from "@/types/product.types";
/* import { useCategories } from "@/hooks/useCategories"; */
import { useCategoriesStore } from "@/store/product.store";

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
    reset,
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

  const { updateProduct, isUpdating, updateError } = useProducts();

  const handleSave: SubmitHandler<OptionalProductSchema> = async (data) => {
    const fulldata: ProductsResponse = {
      ...product,
      ...data,
      userId: userData?.id ?? "",
    };
    updateProduct(fulldata);
    if (updateError) {
      toggleVisible();
      reset();
      return Swal.fire({
        icon: "error",
        title: "Fallo edicion de producto",
        text: updateError.error,
      });
    }
    toggleVisible();
    closeModal();
    return Swal.fire({
      icon: "success",
      title: "Producto editado",
      text: "Producto editado correctamente",
    });
  };

  return (
    <>
      <button
        onClick={toggleVisible}
        className="btn-sm w-full btn btn-ghost rounded-none flex items-center justify-between"
      >
        <span>Editar</span>
        <span className="icon-[prime--pencil]" role="img" aria-hidden="true" />
      </button>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="z-10 fixed inset-0 grid place-content-center bg-black/50 backdrop-blur"
          >
            <form
              onSubmit={handleSubmit(handleSave)}
              className="bg-white relative items-center max-w-3xl min-w-96 w-full flex flex-col gap-3 p-10 border-2 border-primary rounded lg:grid grid-cols-8"
            >
              <span className="text-2xl font-semibold col-span-8 text-center mb-5">
                Editar Producto
              </span>
              <InputGroup
                {...register("name")}
                extendClass="col-span-4"
                id="Nombre"
                label="Nombre"
                errors={errors.name}
              />

              <div className="col-span-4 flex flex-col gap-2">
                <span className="font-semibold">Categoria</span>
                <select
                  {...register("categoryId")}
                  defaultValue={0}
                  className={`select select-bordered ${
                    errors.categoryId ? "select-error" : "select-primary"
                  }`}
                >
                  <option value={0} disabled>
                    Categoria
                  </option>
                  {data?.map((categoria, index) => (
                    <option value={categoria.id} key={index}>
                      {categoria.name}
                    </option>
                  ))}
                </select>
                <AnimatePresence>
                  <div className="h-6">
                    {errors.categoryId && (
                      <motion.small
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-error"
                      >
                        {errors.categoryId.message}
                      </motion.small>
                    )}
                  </div>
                </AnimatePresence>
              </div>
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
              <button
                onClick={toggleVisible}
                type="button"
                className="absolute size-6 rounded hover:bg-primary hover:text-white transition-colors grid place-content-center top-10 right-10"
              >
                <span
                  className="icon-[line-md--close]"
                  role="img"
                  aria-hidden="true"
                />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ProductEdit;
