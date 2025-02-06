import {
  createMovementService,
  getMovementService,
  deleteMovementService,
  getIdMovementService,
  productMovementService,
  updateMovementService,
  getFilteredProducts
} from '../services/movementService.js';

// Crear un movimiento
export const createMovementController = async (req, res) => {
  try {
    const userId = req.userId;
    const { sku, name, type, motive, movQuantity, productId } = req.body;
    const newMovement = await createMovementService({
      sku,
      name,
      type,
      motive,
      movQuantity,
      userId,
      productId,
    });
    res.status(201).json(newMovement);
  } catch (error) { 
    res.status(500).json({ message: 'Error creando el movimiento', error });
  }
};

// Obtener todos los movimientos
export const getMovementController = async (req, res) => {
  try {
    const userId = req.userId;
    const movements = await getMovementService(userId);
    res.status(200).json({ success: true, data: movements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtener un movimiento por ID
export const getIdMovementController = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const movement = await getIdMovementService(id, userId);
    if (!movement) {
      return res.status(404).json({ success: false, message: 'Movimiento no encontrado' });
    }
    res.status(200).json({ success: true, data: movement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Actualizar un movimiento
export const updateMovementController = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const movementData = req.body;
    const updatedMovement = await updateMovementService(id, movementData, userId);
    if (!updatedMovement) {
      return res.status(404).json({ success: false, message: 'Movimiento no encontrado' });
    }
    res.status(200).json({ success: true, message: 'Movimiento actualizado correctamente', data: updatedMovement });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Eliminar un movimiento
export const deleteMovementController = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    await deleteMovementService(id, userId);
    res.status(200).json({ success: true, message: 'Movimiento eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Obtener los movimientos por producto
export const productMovementController = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;
    const movements = await productMovementService(productId, userId);
    res.status(200).json({ success: true, data: movements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtener los productos filtrados por tipo y motivo
export const getFilteredProductsController = async (req, res) => {
  try {
    const userId = req.userId; // Obtener el userId del token de autenticación
    const { type, motive } = req.query; // Obtener el tipo y motivo de la consulta
    //console.log(`Obteniendo productos filtrados para el usuario: ${userId} con tipo: ${type} y motivo: ${motive}`); // Depuración
    const filteredProducts = await getFilteredProducts(userId, type, motive);
    res.status(200).json({ success: true, data: filteredProducts });
  } catch (error) {
    //console.error(`Error en el controlador: ${error.message}`); // Depuración
    res.status(500).json({ success: false, message: error.message });
  }
};
