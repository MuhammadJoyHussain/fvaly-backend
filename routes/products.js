const accessControl = require('../accesscontrol');
const express = require('express');
const { createProduct, getProducts } = require('../controllers/productController');
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

module.exports = router;