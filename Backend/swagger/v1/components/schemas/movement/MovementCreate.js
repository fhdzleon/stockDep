const MovementCreate = {
  type: 'object',
  properties: {
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
      example: 'Salida'
    },
    motive: {
      type: 'string',
      enum: ['devolución', 'reabastecimiento', 'venta', 'caducidad', 'dañado'],
      description: 'Motivo del movimiento',
      example: 'venta'
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
      example: '8c69d6f5-9c23-4b97-8c99-7f8b3c4a12f1'
    },
    date: {
      type: 'string',
      format: 'date-time',
      description: 'Fecha en que se realizó el movimiento',
      example: '2024-02-02T10:15:00Z'
    }
  },
  required: ['type', 'motive', 'movQuantity', 'userId', 'productId']
};

export default MovementCreate;
