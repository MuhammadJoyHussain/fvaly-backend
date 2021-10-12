const express = require('express');
const uploader = require('../lib/multer');
const { getStores, getStoreById, createStore, deleteStore } = require('../controllers/storeController');
const Store = require('../models/Store');

const product = require('./product');

const router = express.Router();
const advancedResults = require('../middleweres/advancedResults');

router.use('/:storeId/product', product);

router
	.route('/')
	.get(advancedResults(Store, 'product'), getStores)
	.post(
		uploader.single('image'),
		createStore);

router
	.route('/:id')
	.get(getStoreById);





module.exports = router;