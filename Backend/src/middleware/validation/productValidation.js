import { body } from 'express-validator';

export const validateProduct = [
  body('name').notEmpty().withMessage('El nombre del producto es requerido'),
  body('description')
    .notEmpty()
    .withMessage('La descripción del producto es requerida'),
  body('sku').notEmpty().withMessage('El SKU del producto es requerido'),
  body('quantity')
    .isInt({ min: 0 })
    .withMessage('La cantidad debe ser un entero positivo'),
  body('finalPrice')
    .isFloat({ gt: 0 })
    .withMessage('El precio final debe ser un numero positivo'),
  body('costPrice')
    .isFloat({ gt: 0 })
    .withMessage('El precio de costo debe ser un numero positivo'),
  body('expirationDate')
    .optional({ checkFalsy: true })
    .isDate()
    .withMessage('El vencimiento debe ser una valor de fecha válido'),
  body('minimumQuantity')
    .isInt({ min: 0 })
    .withMessage('La cantidad mínima debe ser un número entero positivo'),
];

export const validateProductUpdate = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('El nombre del producto es requerido'),
  body('description')
    .optional()
    .notEmpty()
    .withMessage('La descripción del producto es requerida'),
  body('sku')
    .optional()
    .notEmpty()
    .withMessage('El SKU del producto es requerido'),
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad debe ser un entero positivo'),
  body('finalPrice')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('El precio final debe ser un numero positivo'),
  body('costPrice')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('El precio de costo debe ser un numero positivo'),
  body('expirationDate')
    .optional({ checkFalsy: true })
    .isDate()
    .withMessage('El vencimiento debe ser una valor de fecha válido'),
  body('minimumQuantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La cantidad mínima debe ser un número entero positivo'),
];
