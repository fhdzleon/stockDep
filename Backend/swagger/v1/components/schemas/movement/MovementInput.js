const MovementInput = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
      description: 'ID único del movimiento',
      example: 'a3f20d4e-7c5b-4d89-b3e6-9a1b8a3cde3e'
    },
    sku: {
      type: 'string',
      description: 'SKU del producto relacionado con el movimiento',
      example: 'SKU-034'
    },
    name: {
      type: 'string',
      description: 'Descripción ampliada del movimiento (opcional)',
      example: 'Descripción del movimiento',
      nullable: true
    },
    type: {
      type: 'string',
      enum: ['Entrada', 'Salida'],
      description: 'Tipo de movimiento (Entrada o Salida)',
      example: 'Entrada'
    },
    motive: {
      type: 'string',
      enum: ['devolución', 'reabastecimiento', 'venta', 'caducidad', 'dañado'],
      description: 'Motivo del movimiento',
      example: 'reabastecimiento'
    },
    movQuantity: {
      type: 'integer',
      description: 'Cantidad del movimiento',
      example: 10
    },
    userId: {
      type: 'string',
      format: 'uuid',
      description: 'ID del usuario que realizó el movimiento',
      example: '3e5c1a48-12f6-4a3d-91de-6f3b62e8c82f'
    },
    productId: {
      type: 'string',
      format: 'uuid',
      description: 'ID del producto relacionado con el movimiento',
      example: '5b67c9d0-9d2b-4e1f-8a71-91a92f5c8a9e'
    },
    date: {
      type: 'string',
      format: 'date-time',
      description: 'Fecha en que se realizó el movimiento',
      example: '2024-02-01T14:30:00Z'
    }
  },
  required: ['type', 'motive', 'movQuantity', 'userId', 'productId']
};

export default MovementInput;
