import { useCategoriesStore } from "@/store/product.store";
import { z } from "zod";

const { data } = useCategoriesStore.getState();

const validIds = data.map((item) => item.id);


export const ProductSchema = z
  .object({
    name: z.string().nonempty("Nombre requerido"),
    description: z.string().nonempty("Descripción requerida"),
    categoryId: z.string(),
    expirationDate: z
      .string()
      .optional()
      .refine(
        (dateString) => {
          if (!dateString) return true;
          const date = new Date(dateString);
          if (isNaN(date.getTime())) return false;
          const sixMonthsFromNow = new Date();
          sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
          return date > sixMonthsFromNow;
        },
        {
          message: "Fecha al menos 6 meses mayor a hoy",
        }
      ),
    costPrice: z
      .string()
      .nonempty("Precio compra requerido")
      .transform((value) => parseFloat(value))
      .refine((value) => !isNaN(value) && value > 0, {
        message: "Precio compra debe ser un número mayor a 0",
      }),
    finalPrice: z
      .string()
      .nonempty("Precio venta requerido")
      .transform((value) => parseFloat(value))
      .refine((value) => !isNaN(value) && value > 0, {
        message: "Precio venta debe ser un número mayor a 0",
      }),
    quantity: z
      .string()
      .nonempty("Cantidad requerida")
      .transform((value) => parseInt(value, 10))
      .refine((value) => !isNaN(value) && value > 0, {
        message: "Cantidad debe ser un número entero mayor a 0",
      }),
    minimumQuantity: z
      .string()
      .nonempty("Cantidad mínima requerida")
      .transform((value) => parseInt(value, 10))
      .refine((value) => !isNaN(value) && value > 0, {
        message: "Cantidad mínima debe ser un número entero mayor a 0",
      }),
    userId: z.string().optional(),
  })
  .refine((data) => data.finalPrice > data.costPrice, {
    message: "Precio de venta muy bajo",
    path: ["finalPrice"],
  });

export type ProductSchema = z.infer<typeof ProductSchema>;

export const OptionalProductSchema = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    categoryId: z
      .string()
      .optional()
      .refine((val) => !val || validIds.includes(val), {
        message: "Categoría no válida",
      }),
    expirationDate: z
      .string()
      .optional()
      .refine(
        (dateString) => {
          if (!dateString) return true;
          const date = new Date(dateString);
          if (isNaN(date.getTime())) return false;
          const sixMonthsFromNow = new Date();
          sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
          return date > sixMonthsFromNow;
        },
        {
          message: "Fecha al menos 6 meses mayor a hoy",
        }
      ),
    costPrice: z
      .union([z.string().transform((value) => parseFloat(value)), z.number()])
      .optional(),
    finalPrice: z
      .union([z.string().transform((value) => parseFloat(value)), z.number()])
      .optional(),
    quantity: z
      .union([z.string().transform((value) => parseFloat(value)), z.number()])
      .optional(),
    minimumQuantity: z
      .union([z.string().transform((value) => parseFloat(value)), z.number()])
      .optional(),
  })
  .refine(
    (data) => {
      if (data.finalPrice !== undefined && data.costPrice !== undefined) {
        return data.finalPrice > data.costPrice;
      }
      return true;
    },
    {
      message: "Precio de venta muy bajo",
      path: ["finalPrice"],
    }
  );

export type OptionalProductSchema = z.infer<typeof OptionalProductSchema>;
