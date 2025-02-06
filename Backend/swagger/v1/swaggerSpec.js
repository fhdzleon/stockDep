// swagger/swaggerSpec.js

import info from './info.js';
import servers from './servers.js';

// User
import User from './components/schemas/user/User.js';
import UserLogin from './components/schemas/user/UserLogin.js';
import UserRegister from './components/schemas/user/UserRegister.js';
import UserLoginP from './paths/user/loginUser.js';
import UserRegisterP from './paths/user/registerUser.js';
import getAllUsers from './paths/user/getAllUsers.js';
import getUserById from './paths/user/getUserById.js';
import updateUser from './paths/user/updateUser.js';
import deleteUser from './paths/user/deleteUser.js';
import restoreUser from './paths/user/restoreUser.js';
import logoutUser from './paths/user/logoutUser.js';

// Category
import CategoryDelete from './components/schemas/categories/CategoryDelete.js';
import CategoryInput from './components/schemas/categories/CategoryInput.js';
import CategoryOutput from './components/schemas/categories/CategoryOutput.js';
import CategoryUpdate from './components/schemas/categories/CategoryUpdate.js';
import createCategory from './paths/categories/createCategory.js';
import getAllCategories from './paths/categories/getAllCategories.js';
import getCategoryById from './paths/categories/getCategoryById.js';
import updateCategory from './paths/categories/updateCategory.js';
import deleteCategory from './paths/categories/deleteCategory.js';
import bulkCreateCategories from './paths/categories/bulkCreateCategories.js';
import createDefaultCategories from './paths/categories/createDefaultCategories.js';

// Product
import ProductInput from './components/schemas/products/ProductInput.js';
import ProductOutput from './components/schemas/products/ProductOutput.js';
import ProductUpdate from './components/schemas/products/ProductUpdate.js';
import createProduct from './paths/products/createProduct.js';
import getAllProducts from './paths/products/getAllProducts.js';
import getProductById from './paths/products/getProductById.js';
import updateProduct from './paths/products/updateProduct.js';
import deleteProduct from './paths/products/deleteProduct.js';
import restoreProduct from './paths/products/restoreProduct.js';
import queryProducts from './paths/products/queryProducts.js';

// Movement
import createMovement from './paths/movement/createMovement.js';
import getAllMovement from './paths/movement/getAllMovement.js';
import getIdMovement from './paths/movement/getIdMovement.js';
import updateMovement from './paths/movement/updateMovement.js';
import deleteMovement from './paths/movement/deleteMovement.js';
import getProductMovement from './paths/movement/getProductMovement.js';
import getFilteredProducts from './paths/movement/getFilteredProducts.js';
import MovementInput from './components/schemas/movement/MovementInput.js';
import MovementCreate from './components/schemas/movement/MovementCreate.js';
import MovementUpdate from './components/schemas/movement/MovementUpdate.js';

const swaggerSpec = {
  openapi: '3.0.0',
  info,
  servers,
  paths: {
    // Users
    '/users/register': UserRegisterP,
    '/users/login': UserLoginP,
    '/users/logout': logoutUser,
    '/users': getAllUsers,
    '/users/{id}': getUserById,
    '/users/update/{id}': updateUser,
    '/users/delete/{id}': deleteUser,
    '/users/restore/{id}': restoreUser,
    // Categories
    '/categories': createCategory,
    '/categories/bulk': bulkCreateCategories,
    '/categories/defaults': createDefaultCategories,
    '/categories/all': getAllCategories,
    '/categories/{id}': getCategoryById,
    '/categories/update/{id}': updateCategory,
    '/categories/delete/{id}': deleteCategory,
    // Products
    '/products': createProduct,
    '/products/all': getAllProducts,
    '/products/{id}': getProductById,
    '/products/update/{id}': updateProduct,
    '/products/delete/{id}': deleteProduct,
    '/products/restore/{id}': restoreProduct,
    '/product/query': queryProducts,
    // Movement
    '/movements': createMovement,
    '/movement/query': getFilteredProducts,
    '/movements/all': getAllMovement,
    '/movements/{id}': getIdMovement,
    '/movements/update/{id}': updateMovement,
    '/movements/delete/{id}': deleteMovement,
    '/movements/product/{productId}': getProductMovement,
  },
  components: {
    schemas: {
      // User
      User,
      UserLogin,
      UserRegister,
      // Category
      CategoryInput,
      CategoryOutput,
      CategoryUpdate,
      CategoryDelete,
      // Product
      ProductInput,
      ProductOutput,
      ProductUpdate,
      // Movement
      MovementInput,
      MovementCreate,
      MovementUpdate,
    },
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

export default swaggerSpec;
