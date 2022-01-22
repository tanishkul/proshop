import express from 'express';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from '../controllers/productController.js';
import auth from '../middleware/authMiddleware.js';
import admin from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(auth, admin, createProduct);
router.route('/:id/reviews').post(auth, createProductReview);
router.get('/top', getTopProducts);

router
  .route('/:id')
  .get(getProductById)
  .delete(auth, admin, deleteProduct)
  .put(auth, admin, updateProduct);

export default router;
