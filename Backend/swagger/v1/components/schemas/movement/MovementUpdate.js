const MovementUpdate = {
  type: 'object',
  properties: {
    sku: {
      type: 'string',
      description: 'SKU del producto relacionado con el movimiento (opcional)',
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
      description: 'Tipo de movimiento (opcional)',
      example: 'Salida'
    },
    motive: {
      type: 'string',
      enum: ['devolución', 'reabastecimiento', 'venta', 'caducidad', 'dañado'],
      description: 'Motivo del movimiento (opcional)',
      example: 'venta'
    },
    movQuantity: {
      type: 'integer',
      description: 'Cantidad del movimiento (opcional)',
      example: 15
    },
    date: {
      type: 'string',
      format: 'date-time',
      description: 'Fecha del movimiento (opcional)',
      example: '2024-02-03T08:45:00Z'
    },
    categoryId: {
      type: 'string',
      format: 'uuid',
      description: 'Nueva categoría del movimiento (opcional)',
      example: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6'
    }
  }
};

export default MovementUpdate;
