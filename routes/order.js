const express = require('express');
const { getOrders, getOrderById, createOrder, deleteOrder } = require('../controllers/orderController');
const accessControl = require('../accessControl');

const router = express.Router();

const { protect } = require('../middleweres/auth');

router
	.route('/')
	.post(
		protect,
		accessControl.grantAccess('createOwn', 'order'),
		createOrder
	)
	.get(getOrders);

router
	.route('/:id')
	.get(getOrderById)
	.delete(
		protect,
		accessControl.grantAccess('deleteOwn', 'order'),
		deleteOrder
	);

module.exports = router;