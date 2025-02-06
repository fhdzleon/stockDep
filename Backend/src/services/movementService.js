import { Movement, Product } from '../models/index.js';
import { Sequelize } from 'sequelize';

// Servicio para crear un movimiento
export const createMovementService = async (data) => {
  const { sku, name, type, motive, movQuantity, userId, productId } = data;

  const product = await Product.findOne({ where: { id: productId, userId } });
  if (!product) {
    throw new Error('Producto no encontrado o no pertenece al usuario.');
  }

  // Ajustar el quantity según el tipo de movimiento
  if (type === 'Salida') {
    if (product.quantity >= movQuantity) {
      product.quantity -= movQuantity;
    } else {
      throw new Error('La cantidad de salida excede el inventario disponible.');
    }
  } else if (type === 'Entrada') {
    product.quantity += movQuantity;
  }

  // Guardar el cambio en el producto
  await product.save();

  return await Movement.create({ sku, name, type, motive, movQuantity, userId, productId });
};

// Servicio para obtener todos los movimientos
export const getMovementService = async (userId) => {
  try {
    const movements = await Movement.findAll({
      where: { userId }, include: [
        {
          model: Product,
          attributes: ['name'],
        },
      ],
    });
    return movements;
  } catch (error) {
    throw new Error(`Error al obtener movimientos: ${error.message}`);
  }
};

// Obtener un movimiento por ID
export const getIdMovementService = async (id, userId) => {
  try {
    const movement = await Movement.findOne({ where: { id, userId } });
    return movement;
  } catch (error) {
    throw new Error(`Error al obtener el movimiento: ${error.message}`);
  }
};

// Actualizar un movimiento
export const updateMovementService = async (id, movementData, userId) => {
  try {
    const movement = await Movement.findOne({ where: { id, userId } });
    if (!movement) {
      throw new Error('Movimiento no encontrado.');
    }

    const product = await Product.findOne({ where: { id: movement.productId, userId } });
    if (!product) {
      throw new Error('Producto no encontrado o no pertenece al usuario.');
    }

    const { type, motive, movQuantity } = movementData;

    // Restaurar el quantity original antes de aplicar el nuevo movimiento
    if (movement.type === 'Salida') {
      product.quantity += movement.movQuantity;
    } else if (movement.type === 'Entrada') {
      product.quantity -= movement.movQuantity;
    }

    // Aplicar el nuevo movimiento
    if (type === 'Salida') {
      if (product.quantity >= movQuantity) {
        product.quantity -= movQuantity;
      } else {
        throw new Error('La cantidad de salida excede el inventario disponible.');
      }
    } else if (type === 'Entrada') {
      product.quantity += movQuantity;
    }

    // Guardar el cambio en el producto
    await product.save();

    // Actualizar el movimiento
    await movement.update({ type, motive, movQuantity });

    return movement;
  } catch (error) {
    throw new Error(`Error al actualizar el movimiento: ${error.message}`);
  }
};

// Eliminar un movimiento
export const deleteMovementService = async (id, userId) => {
  try {
    const movement = await Movement.findOne({ where: { id, userId } });
    if (!movement) {
      throw new Error('Movimiento no encontrado.');
    }

    const product = await Product.findByPk(movement.productId);
    if (!product) {
      throw new Error('Producto no encontrado.');
    }

    // Restaurar el quantity según el tipo de movimiento
    if (movement.type === 'Salida') {
      product.quantity += movement.movQuantity;
    } else if (movement.type === 'Entrada') {
      product.quantity -= movement.movQuantity;
    }

    // Guardar el cambio en el producto
    await product.save();

    // Eliminar el movimiento
    await movement.destroy();
  } catch (error) {
    throw new Error(`Error al eliminar el movimiento: ${error.message}`);
  }
};

// Obtener los movimientos por producto
export const productMovementService = async (productId, userId) => {
  try {
    const movements = await Movement.findAll({ where: { productId, userId } });
    return movements;
  } catch (error) {
    throw new Error(`Error al obtener movimientos para el producto: ${error.message}`);
  }
};

// Servicio para obtener los productos filtrados por tipo y motivo del usuario autenticado, incluyendo el nombre del producto
export const getFilteredProducts = async (userId, type, motive) => {
  try {
    //console.log(`Ejecutando consulta para obtener los productos filtrados del usuario: ${userId} con tipo: ${type} y motivo: ${motive}`); // Depuración
    const filteredProducts = await Movement.findAll({
      attributes: [
        'productId',
        [Sequelize.fn('SUM', Sequelize.col('movQuantity')), 'total_quantity'],
        [Sequelize.col('Product.name'), 'product_name'] // Incluir el nombre del producto
      ],
      where: {
        type: type,
        motive: motive,
        userId: userId
      },
      include: [{
        model: Product,
        attributes: [] // No necesitamos atributos adicionales del modelo Product
      }],
      group: ['productId', 'Product.name'],
      order: [[Sequelize.literal('total_quantity'), 'DESC']],
      limit: 10
    });

    //console.log(`Productos filtrados: ${JSON.stringify(filteredProducts)}`); // Depuración
    return filteredProducts;
  } catch (error) {
    //console.error(`Error al obtener los productos filtrados: ${error.message}`); // Depuración
    throw new Error(`Error al obtener los productos filtrados: ${error.message}`);
  }
};
