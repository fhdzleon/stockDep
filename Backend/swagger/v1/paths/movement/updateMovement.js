const updateMovement = {
  put: {
    tags: ['Movimientos'],
    summary: 'Actualizar un movimiento',
    description: 'Actualiza los detalles de un movimiento específico basado en su ID.',
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
        description: 'ID del movimiento a actualizar',
        schema: {
          type: 'string',
          format: 'uuid',
          example: '123e4567-e89b-12d3-a456-426614174001'
        }
      }
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
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
                example: 'Venta de herramienta',
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
              productId: {
                type: 'string',
                format: 'uuid',
                description: 'ID del producto relacionado con el movimiento',
                example: '077eff87-4076-4c01-938c-5623c91aedc2'
              }
            }
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Movimiento actualizado correctamente',
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
                  example: 15
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
      400: {
        description: 'Datos incorrectos o falta de parámetros requeridos'
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

export default updateMovement;
