const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require('../lib/cloudinary');
const Product = require('../models/Product');
const Store = require('../models/Store');
const asyncHandler = require('../middleweres/async');


module.exports.getProducts = asyncHandler(async (req, res, next) => {
    let query;

    if (req.params.storeId) {
        query = Product.find({ store: req.params.storeId });
    } else {
        query = Product.find().populate('store');
    }

    const products = await query;

    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });
});

module.exports.createProduct = asyncHandler(async (req, res, next) => {
    req.body.store = req.params.storeId;

    const store = await Store.findById(req.params.storeId);

    if (!store) {
        return next(
            new ErrorResponse(`Store not found with id of ${req.params.storeId}`, 404)
        );
    }

    const body = req.body;
    const upload = await cloudinary.uploader.upload(req.file.path);

    body.image = upload.public_id;

    const product = await Product.create(req.body);


    return res.status(201).json({
        success: true,
        data: product
    });
});

module.exports.getProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id).populate({
        path: 'store',
        select: 'name location'
    });

    if (!product) {
        return next(
            new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
        );
    }
    res.status(200).json({
        success: true,
        data: product
    });
});

module.exports.updateProduct = asyncHandler(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(
            new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
        );
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        success: true,
        data: product
    });
});

module.exports.deleteProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(
            new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
        );
    }

    await product.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});