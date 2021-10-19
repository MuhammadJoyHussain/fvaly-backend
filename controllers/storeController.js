const ErrorResponse = require('../utils/errorResponse');
const Store = require('../models/Store');
const cloudinary = require('../lib/cloudinary');

module.exports.createStore = async (req, res, next) => {
	req.body.owner = req.user.id;

	const body = req.body;
	const upload = await cloudinary.uploader.upload(req.file.path);

	body.image = upload.public_id;

	const store = await Store.create(req.body);

	res.status(201).json({
		success: true,
		data: store
	});
};

module.exports.getStores = async (req, res, next) => {

	res.status(200).json(res.advancedResults);
};

module.exports.getStoreById = async (req, res, next) => {
	const store = await Store.findById(req.params.id);

	res.status(200).json({ success: true, data: store });
};

module.exports.deleteStore = async (req, res, next) => {
	const store = await Store.findById(req.params.id);

	if (!store) {
		return next(new ErrorResponse(`Store not found with id of ${req.params.id}`, 404));
	}

	store.remove();

	res.status(200).json({ data: {}, success: true });
};




