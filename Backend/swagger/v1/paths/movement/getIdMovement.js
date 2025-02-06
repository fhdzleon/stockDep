const getIdMovement = {
  get: {
    tags: ['Movimientos'],
    summary: 'Obtener un movimiento por ID',
    description: 'Devuelve los detalles de un movimiento específico basado en su ID.',
    security: [
      {
        BearerAuth: []
      }
    ],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        description: 'ID del movimiento a obtener',
        schema: {
          type: 'string',
          format: 'uuid',
          example: '123e4567-e89b-12d3-a456-426614174001'
        }
      }
    ],
    responses: {
      200: {
        description: 'Detalles del movimiento obtenidos correctamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'ID del movimiento',
                  example: '123e4567-e89b-12d3-a456-426614174001'
                },
                sku: {
                  type: 'string',
                  description: 'SKU del movimiento',
                  example: 'SKU-034'
                },
                name: {
                  type: 'string',
                  description: 'Descripción ampliada del movimiento',
                  example: 'Venta de herramienta',
                  nullable: true
                },
                type: {
                  type: 'string',
                  description: 'Tipo de movimiento',
                  enum: ['Entrada', 'Salida'],
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
                  example: '123e4567-e89b-12d3-a456-426614174000'
                },
                productId: {
                  type: 'string',
                  format: 'uuid',
                  description: 'ID del producto relacionado con el movimiento',
                  example: '077eff87-4076-4c01-938c-5623c91aedc2'
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Fecha de creación del movimiento'
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Fecha de actualización del movimiento'
                }
              }
            }
          }
        }
      },
      404: {
        description: 'Movimiento no encontrado'
      },
      500: {
        description: 'Error interno del servidor'
      }
    }
  }
};

export default getIdMovement;
