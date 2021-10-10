const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    image: {
        type: String,
        required: [true, 'Please add an image']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    store: {
        type: mongoose.Schema.ObjectId,
        ref: 'Store',
        required: true,
    },
}, { timestamp: true });

module.exports = mongoose.model('Product', ProductSchema);