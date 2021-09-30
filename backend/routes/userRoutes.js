import express from 'express';
import {
  authUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';
import admin from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(auth, admin, getUsers);
router.route('/login').post(authUser);
router.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile);

export default router;
