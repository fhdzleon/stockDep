const getFilteredProducts = {
  get: {
    tags: ['Movimientos'],
    summary: 'Obtener productos filtrados por tipo y motivo',
    description: 'Devuelve una lista de productos filtrados basados en el tipo y motivo especificado. Solo se consideran los productos del usuario autenticado.',
    security: [
      {
        BearerAuth: []
      }
    ],
    parameters: [
      {
        name: 'type',
        in: 'query',
        required: true,
        description: 'Tipo de movimiento para filtrar los productos',
        schema: {
          type: 'string',
          enum: ['Entrada', 'Salida'],
          example: 'Salida'
        }
      },
      {
        name: 'motive',
        in: 'query',
        required: true,
        description: 'Motivo del movimiento para filtrar los productos',
        schema: {
          type: 'string',
          enum: ['devolución', 'reabastecimiento', 'venta', 'caducidad', 'dañado'],
          example: 'venta'
        }
      }
    ],
    responses: {
      200: {
        description: 'Lista de productos filtrados obtenida correctamente',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: {
                    type: 'string',
                    description: 'ID del producto',
                    example: '077eff87-4076-4c01-938c-5623c91aedc2'
                  },
                  product_name: {
                    type: 'string',
                    description: 'Nombre del producto',
                    example: 'Nombre del Producto'
                  },
                  total_quantity: {
                    type: 'integer',
                    description: 'Total de cantidad del producto',
                    example: 100
                  }
                }
              }
            }
          }
        }
      },
      400: {
        description: 'Tipo o motivo no especificado o inválido'
      },
      500: {
        description: 'Error interno del servidor'
      }
    }
  }
};

export default getFilteredProducts;
