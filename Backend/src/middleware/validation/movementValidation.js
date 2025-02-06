import { body } from 'express-validator';

// Validación para el SKU (opcional, pero si se envía, debe ser un UUID válido)
export const skuValidation = body('sku')
  .optional({nullable: true, checkFalsy: true})
  .isString()
  .notEmpty()
  .withMessage('El SKU debe ser una cadena no vacía.');

// Validación para el nombre del movimiento (ahora opcional)
export const nameValidation = body('name')
  .optional({checkFalsy: true})
  .isLength({ min: 3, max: 100 })
  .withMessage('El nombre del movimiento debe tener entre 3 y 100 caracteres.');

// Validación para el tipo de movimiento
export const typeValidation = body('type')
  .notEmpty()
  .withMessage('El tipo de movimiento es obligatorio.')
  .isIn(['Entrada', 'Salida'])
  .withMessage('El tipo de movimiento no es válido. Los valores permitidos son: Entrada, Salida.');

// Validación para el motivo del movimiento
export const motiveValidation = body('motive')
  .notEmpty()
  .withMessage('El motivo del movimiento es obligatorio.')
  .custom((value, { req }) => {
    const validMotives = {
      Entrada: ['devolución', 'reabastecimiento'],
      Salida: ['venta', 'caducidad', 'dañado'],
    };
    if (!validMotives[req.body.type].includes(value)) {
      throw new Error(`El motivo ${value} no es válido para el tipo ${req.body.type}`);
    }
    return true;
  });

// Validación para la cantidad del movimiento
export const movQuantityValidation = body('movQuantity')
  .notEmpty()
  .withMessage('La cantidad del movimiento es obligatoria.')
  .isInt({ min: 1 })
  .withMessage('La cantidad del movimiento debe ser un número entero positivo.');

// Validación para el ID del usuario
export const userIdValidation = body('userId')
  .notEmpty()
  .withMessage('El ID del usuario es obligatorio.')
  .isUUID()
  .withMessage('El ID del usuario debe ser un UUID válido.');

// Validación para el ID del producto
export const productIdValidation = body('productId')
  .notEmpty()
  .withMessage('El ID del producto es obligatorio.')
  .isUUID()
  .withMessage('El ID del producto debe ser un UUID válido.');

// Middleware combinado para validar un movimiento
export const validateMovement = [
  skuValidation,
  nameValidation,
  typeValidation,
  motiveValidation,
  movQuantityValidation,
  userIdValidation,
  productIdValidation,
];
