const ErrorResponse = require('../utils/errorResponse');
const Store = require('../models/Store');
const cloudinary = require('../lib/cloudinary');

module.exports.createStore = async (req, res, next) => {
	req.body.owner = req.user.id;

	const body = req.body;
	const upload = await cloudinary.uploader.upload(req.file.path);

	body.image = upload.public_id;

	const store = await Store.create(body);

	res.status(201).json({
		success: true,
		data: store
	});
};

module.exports.deleteStore = async (req, res, next) => {
	try {
		const { id } = req.params;
		const store = await Store.deleteOne({ _id: id });
		if (store.deletedCount) {
			return res.status(200).json({ data: null, message: 'Store Deleted successfully!' });
		}
		res.status(404).json({ data: null, message: 'No Store found with this Id!' });
	} catch (err) {
		next(err);
	}
};

module.exports.getStoreById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const store = await Store.findOne({ _id: id });
		if (!store) throw new Error('No store found with this id!');
		res.status(200).json({ success: true, data: store });
	} catch (err) {
		next(err);
	}
};

module.exports.getStores = async (req, res, next) => {
	try {
		const query = req.query;
		const store = await Store.find(query);
		return res.json({ success: true, data: store });
	} catch (err) {
		next(err);
	}
};

