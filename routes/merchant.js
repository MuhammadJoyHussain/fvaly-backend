const accessControl = require('../accessControl');
const express = require('express');
const { getProducts, getStats } = require('../controllers/merchantController');

const router = express.Router();

const { protect } = require('../middleweres/auth');

router
    .route
    ('/products')
    .get(
        protect,
        accessControl.grantAccess('createOwn', 'product'),
        getProducts
    );

router
    .route('/stats')
    .get(
        protect,
        accessControl.grantAccess('createOwn', 'product'),
        getStats
    );

module.exports = router;