const router = require('express').Router();
const { getDashboardStats } = require('../controllers/dashboardController');

const { protect, authorize } = require('../middleweres/auth');

router.get(
	'/stats',
	protect,
	authorize('mechant'),
	getDashboardStats
);

module.exports = router;