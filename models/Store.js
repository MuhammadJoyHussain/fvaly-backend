const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
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
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		status: {
			type: String,
			default: 'pending',
			enum: ['pending', 'verified', 'blocked'],
		},
	},
	{ timestamp: true }
);

module.exports = mongoose.model('Store', StoreSchema);
