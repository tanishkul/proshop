import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(auth, addOrderItems);
router.route('/:id').get(auth, getOrderById);
router.route('/:id/pay').get(auth, updateOrderToPaid);

export default router;
