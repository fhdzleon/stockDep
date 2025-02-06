import express from 'express';
import {
    createMovementController,
    getMovementController,
    getIdMovementController,
    updateMovementController,
    deleteMovementController,
    productMovementController,
    getFilteredProductsController
} from '../controllers/movementController.js';
import { validateMovement } from '../middleware/validation/movementValidation.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { handleValidationErrors } from '../middleware/handleValidationErrors.js';

const router = express.Router();

router.post('/movements', validateMovement, authenticateToken,handleValidationErrors, createMovementController);
router.get('/movements/all', authenticateToken, handleValidationErrors, getMovementController);
router.get('/movements/:id', authenticateToken, getIdMovementController);
router.put('/movements/update/:id', validateMovement,authenticateToken, handleValidationErrors, updateMovementController);
router.delete('/movements/delete/:id', authenticateToken, deleteMovementController);
router.get('/movements/product/:productId', authenticateToken, productMovementController);
router.get('/movement/query', authenticateToken, getFilteredProductsController);

export default router;
