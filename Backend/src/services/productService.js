/* eslint-disable prettier/prettier */
import { Product, Category } from '../models/index.js';
import { Op, Sequelize } from 'sequelize';

// Crear un nuevo producto
export const createProduct = async (productData) => {
  return await Product.create(productData);
};

// Obtener la lista de todos los productos
export const getAllProducts = async (userId) => {
  return await Product.findAll({ where: { userId, activated: true } });
};

// Obtener los detalles de un producto por su ID
export const getProductById = async (id) => {
  return await Product.findByPk(id);
};

// Actualizar la información de un producto existente
export const updateProduct = async (userId, id, productData) => {
  const product = await Product.findOne({ where: { id, userId } });
  if (!product || product.userId !== userId) {
    throw new Error('Producto no encontrado o no tienes permiso para actualizarlo');
  }
  return await product.update(productData);
};

// Eliminar un producto (soft delete)
export const deleteProduct = async (userId, id) => {
  const product = await Product.findOne({ where: { id, userId } });
  if (!product) {
    throw new Error('Producto no encontrado o no tienes permiso para eliminarlo');
  }
  return await product.update({ activated: false });
};

// Restaurar un producto eliminado
export const restoreProduct = async (userId, id) => {
  const product = await Product.findOne({ where: { id, userId } });
  if (!product) {
    throw new Error('Producto no encontrado o no tienes permiso para restaurarlo');
  }
  return await product.update({ activated: true });
};

// Nuevo servicio para consultas de filtrado y ordenamiento
export const queryProducts = async (userId, filter = {}, sort = {}, page = 1, limit = 10) => {
  const whereClause = { userId, activated: true };
  const orderClause = [];

  if (filter.minimumQuantity) {
    whereClause.quantity = {
      [Op.and]: [
        { [Op.lte]: Sequelize.col('minimumQuantity') },
        { [Op.ne]: 0 }, // Excluir productos con quantity igual a cero
      ],
    };
  }

  if (filter.zeroQuantity) {
    whereClause.quantity = { [Op.eq]: 0 };
  }

  // Condición adicional: productos cuya cantidad sea distinta de cero
  if (filter.nonZeroQuantity) {
    whereClause.quantity = { [Op.ne]: 0 };
  }

  if (filter.totalProducts) {
    delete whereClause.quantity; // Eliminar cualquier filtro de cantidad para incluir todos los productos activos
  }

  if (sort.by) {
    orderClause.push([sort.by, sort.order || 'ASC']);
  }

  // Calcular el offset y el límite para la paginación
  const offset = (page - 1) * limit;

  // Consulta para obtener el total de la cantidad de productos disponibles
  const totalAvailableQuantityResult = await Product.findAll({
    where: whereClause,
    attributes: [
      [
        Sequelize.fn('SUM', Sequelize.col('quantity')),
        'totalAvailableQuantity',
      ],
    ],
    raw: true,
  });

  const totalAvailableQuantity =
    totalAvailableQuantityResult[0].totalAvailableQuantity || 0;

  // Consulta para obtener el total de productos
  const totalItems = await Product.count({
    where: whereClause,
  });

  // Consulta para obtener los productos paginados y la cantidad total de la página actual
  const products = await Product.findAll({
    where: whereClause,
    order: orderClause,
    offset,
    limit,
    include: [{
      model: Category,
      attributes: ['name'], // Incluir el nombre de la categoría
    }],
  });

  const totalQuantity = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const totalPages = Math.ceil(totalItems / limit);

  return { products, totalQuantity, totalAvailableQuantity, totalItems, currentPage: page, totalPages };
};
