const express = require('express');
const { getStores, getStoreById, createStore, deleteStore } = require('../controllers/storeController');
const accessControl = require('../accessControl');
const uploader = require('../lib/multer');

const router = express.Router();

const { protect } = require('../middleweres/auth');

router
	.route('/')
	.get(getStores)
	.post(
		protect,
		accessControl.grantAccess('createOwn', 'store'),
		uploader.single('image'),
		createStore
	);


router
	.route('/:id')
	.get(getStoreById)
	.delete(
		protect,
		accessControl.grantAccess('deleteOwn', 'store'),
		deleteStore
	);





module.exports = router;