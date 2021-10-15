const accessControl = require('../accesscontrol');
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
        accessControl.grantAccess('deleteOwn', 'product'),
        deleteProduct)
    .put(
        protect,
        accessControl.grantAccess('updateAny', 'product'),
        updateProduct);

module.exports = router;