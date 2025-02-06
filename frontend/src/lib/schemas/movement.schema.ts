import { z } from 'zod';


export enum MovementType {
  Entrada = "Entrada",
  Salida = "Salida",
}

export enum SaleMotive {
  venta = "venta",
  caducidad = "caducidad",
  dañado = "dañado",
}

export enum IncomeMotive {
  devolución = "devolución",
  reabastecimiento = "reabastecimiento",
}

export const MovementSchema = z.object({
  sku: z.string().trim().optional(),
  name: z.string({ message: "Requerido" })
    .trim()
    .min(3, { message: "Mín. 3 caracteres" })
    .max(100, { message: "Máx. 100 caracteres" }),
  type: z.nativeEnum(MovementType, { message: "Tipo inválido" }),
  motive: z.union([
    z.nativeEnum(SaleMotive, { message: "Motivo invalido" }),
    z.nativeEnum(IncomeMotive, { message: "Motivo invalido" }),
  ]),
  movQuantity: z.string()
    .nonempty("Cantidad Requerida")
    .transform((value) => parseFloat(value))
    .refine((value) => !isNaN(value) && value > 0, {
      message: "Debe ser mayor a 0",
    }),
  userIdValidation: z.string().uuid().optional(),
  productId: z.string().uuid({ message: "producto invalido" }),
});


export type MovementSchema = z.infer<typeof MovementSchema>