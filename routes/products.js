const accessControl = require('../accesscontrol');
const express = require('express');
const { createProduct, getProducts, getProduct, deleteProduct } = require('../controllers/productController');
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
        accessControl.grantAccess('deleteAny', 'product'),
        deleteProduct
    );

module.exports = router;