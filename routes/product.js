const accessControl = require('../accesscontrol');
const express = require('express');
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const uploader = require('../lib/multer');

const router = express.Router();

const { protect } = require('../middleweres/auth');

router
    .route('/')
    .get(getProducts)
    .post(
        protect,
        accessControl.grantAccess('createOwn', 'product'),
        uploader.single('image'),
        createProduct);

router
    .route('/:id')
    .get(getProduct)
    .delete(
        protect,
        accessControl.grantAccess('deleteOwn', 'product'),
        deleteProduct
    )
    .put(
        protect,
        accessControl.grantAccess('updateAny', 'product'),
        updateProduct
    );

module.exports = router;