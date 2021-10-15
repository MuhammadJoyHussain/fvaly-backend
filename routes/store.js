const express = require('express');
const uploader = require('../lib/multer');
const { getStores, getStoreById, createStore, deleteStore } = require('../controllers/storeController');
const Store = require('../models/Store');

const product = require('./product');

const router = express.Router();
const advancedResults = require('../middleweres/advancedResults');
const { protect, authorize } = require('../middleweres/auth');

router.use('/:storeId/product', product);

router
	.route('/')
	.get(advancedResults(Store, 'product'), getStores)
	.post(
		protect,
		authorize('merchant', 'admin'),
		uploader.single('image'),
		createStore);

router
	.route('/:id')
	.get(getStoreById);





module.exports = router;