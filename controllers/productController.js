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
    try {
        const body = req.body;
        const upload = await cloudinary.uploader.upload(req.file.path);

        body.image = upload.public_id;
        const product = new Product(body);

        await product.save();
        return res.status(201).json({
            success: true,
            data: product
        });
    } catch (err) {
        return next(new ErrorResponse('Fild can not be blank'), 404);
    }
});