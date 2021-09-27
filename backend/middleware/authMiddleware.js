import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const authMiddleware = asyncHandler(async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      const valid = jwt.verify(token, process.env.JWT_SECRET);
      if (!valid) {
        res.status(401);
        throw new Error('Not authorized- token failed');
      }
      req.user = await User.findById(valid.id).select('-password');
      next();
    }
    if (!token) {
      res.status(401);
      throw new Error('Not authorized- no token provided');
    }
  } catch (err) {
    console.error(err.message);
    // res.status(401);
    // throw new Error('Not authorized- token failed');
    next(err);
  }
});

export default authMiddleware;
