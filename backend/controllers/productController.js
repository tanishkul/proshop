import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const { keyword, pageNumber } = req.query;

  const pageSize = 10;
  const page = Number(pageNumber) || 1;

  const filterObj = keyword ? {
    name: {
      $regex: keyword,
      $options: 'i'
    },
  } : {};

  const count = await Product.count(filterObj);
  const products = await Product.find(filterObj).limit(pageSize).skip(pageSize * (page - 1));

  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Public/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.status(200).json({ message: 'Product removed!' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products/
// @access  Public/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample product',
    description: 'Sample product',
    image: '/images/sample.jpg',
    price: 0,
    numReviews: 0,
    countInStock: 0,
    user: req.user.id,
    brand: 'Sample brand',
    category: 'Sample category',
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    image,
    price,
    numReviews,
    countInStock,
    user,
    brand,
    category,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const productFields = {};
    if (name) productFields.name = name;
    if (description) productFields.description = description;
    if (image) productFields.image = image;
    if (price) productFields.price = price;
    if (numReviews) productFields.numReviews = numReviews;
    if (countInStock) productFields.countInStock = countInStock;
    if (user) productFields.user = user;
    if (brand) productFields.brand = brand;
    if (category) productFields.category = category;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { $set: productFields },
      { new: true }
    );
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get top products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

// @desc    Create a product review
// @route   POST /api/products/:id/reviews
// @access  Public/Admin
const createProductReview = asyncHandler(async (req, res) => {
  const {
    rating, comment,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed!');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    // average of all the ratings in reviews
    product.rating = product.reviews.reduce((acc, ele) => ele.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added!' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
