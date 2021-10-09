const router = require('express').Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const accessControl = require('../accessControl');

const { protect } = require('../middleweres/auth');

router
	.route('/stats')
	.get(
		protect,
		accessControl.grantAccess('createOwn', 'category'),
		getDashboardStats
	);

module.exports = router;