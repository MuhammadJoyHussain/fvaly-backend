const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name con not be more than 50 character']
    },
    slug: String,
    location: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'verified', 'blocked'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

StoreSchema.pre('remove', async function (next) {
    await this.model('Product').deleteMany(({ store: this._id }));
    next();
});

StoreSchema.virtual('product', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'store',
    justOne: false
});

module.exports = mongoose.model('Store', StoreSchema);