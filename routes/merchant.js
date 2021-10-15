const express = require('express');
const { getProducts, getStats } = require('../controllers/merchantController');

const router = express.Router();

const { protect, authorize } = require('../middleweres/auth');

router
    .route
    ('/products')
    .get(
        protect,
        authorize('merchant'),
        getProducts
    );


module.exports = router;