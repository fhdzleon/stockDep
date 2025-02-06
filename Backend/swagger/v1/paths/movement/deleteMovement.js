const deleteMovement = {
  delete: {
    tags: ['Movimientos'],
    summary: 'Eliminar un movimiento',
    description: 'Elimina un movimiento del sistema y restaura las cantidades afectadas del producto.',
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
        description: 'ID del movimiento a eliminar',
        schema: {
          type: 'string',
          format: 'uuid',
          example: '123e4567-e89b-12d3-a456-426614174001'
        }
      }
    ],
    responses: {
      200: {
        description: 'Movimiento eliminado correctamente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true
                },
                message: {
                  type: 'string',
                  example: 'Movimiento eliminado correctamente'
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

export default deleteMovement;
