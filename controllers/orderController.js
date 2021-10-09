const Order = require('../models/Order');

module.exports.createOrder = async (req, res, next) => {

	try {
		const userId = req.user._id;
		const body = { ...req.body, userId };

		const order = new Order(body);
		await order.save();

		res.status(201).json({ success: true, order, message: 'Order placed successfully!' });
	} catch (err) {
		next(err);
	}
};

module.exports.deleteOrder = async (req, res, next) => {
	try {
		const { id } = req.params;
		const order = await Order.deleteOne({ _id: id });
		if (order.deletedCount) {
			return res.status(200).json({ success: true, message: 'Order Deleted successfully!' });
		}
		res.status(404).json({ success: true, message: 'No Order found with this Id!' });
	} catch (err) {
		next(err);
	}
};

module.exports.getOrderById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const order = await Order.findOne({ _id: id });
		if (!order) throw new Error('No order found with this id!');
		res.status(200).json({ success: true, data: order });
	} catch (err) {
		next(err);
	}
};

module.exports.getOrders = async (req, res, next) => {
	try {
		// if role === merchant , show his order only , if admin show all
		const query = req.query;
		const orders = await Order.find(query)
			.populate({
				path: 'products',
				populate: {
					path: 'store'
				}
			});

		res.status(200).json({ success: true, data: orders });
	} catch (err) {
		next(err);
	}
};
