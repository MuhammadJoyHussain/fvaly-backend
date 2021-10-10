const router = require('express').Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const accessControl = require('../accessControl');

const { protect } = require('../middleweres/auth');

router.get(
	'/stats',
	protect,
	accessControl.grantAccess('createOwn', 'category'),
	getDashboardStats
);

module.exports = router;