const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require('../lib/cloudinary');
const Product = require('../models/Product');
const asyncHandler = require('../middleweres/async');


module.exports.getProducts = asyncHandler(async (req, res, next) => {
    try {
        const query = req.query;
        const products = await Product.find(query);
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (err) {
        return next(new ErrorResponse('Products not found'), 404);
    }
});

module.exports.createProduct = asyncHandler(async (req, res, next) => {


    const body = req.body;
    const upload = await cloudinary.uploader.upload(req.file.path);

    body.image = upload.public_id;

    const product = new Product(body);

    const createProduct = await product.save();

    return res.status(201).json({
        success: true,
        data: createProduct
    });
});

module.exports.getProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

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