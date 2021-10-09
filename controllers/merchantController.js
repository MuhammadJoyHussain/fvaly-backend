const Store = require('../models/Store');
const Product = require('../models/Product');
const Order = require('../models/Order');
const asyncHandler = require('../middleweres/async');

module.exports.getProducts = asyncHandler(async (req, res, next) => {
    try {
        const query = req.query;
        const store = await Store.findOne({ owner: req.user.id });
        const products = await Product.find({ ...query, store: store.id });
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (err) {
        next(err);
    }
});

module.exports.getStats = asyncHandler(async (req, res, next) => {
    try {
        const query = req.query;
        const store = await Store.findOne({ owner: req.user._id });
        const totalProduct = await Product.countDocuments({ ...query, store: store._id });
        const totalOrder = await Order.countDocuments();

        res.status(200).json({ success: true, totalProduct, totalOrder });
    } catch (err) {
        next(err);
    }
});
