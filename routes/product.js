const express = require('express');
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const uploader = require('../lib/multer');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleweres/auth');

router
    .route('/')
    .get(getProducts)
    .post(
        protect,
        authorize('merchant', 'admin'),
        uploader.single('image'),
        createProduct);

router
    .route('/:id')
    .get(getProduct)
    .delete(
        protect,
        authorize('merchant', 'admin'),
        deleteProduct)
    .put(
        protect,
        authorize('merchant', 'admin'),
        updateProduct);

module.exports = router;