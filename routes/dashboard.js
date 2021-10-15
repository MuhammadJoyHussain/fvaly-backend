const router = require('express').Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const accessControl = require('../accessControl');

const { protect, authorize } = require('../middleweres/auth');

router.get(
	'/stats',
	protect,
	authorize('mechant'),
	getDashboardStats
);

module.exports = router;