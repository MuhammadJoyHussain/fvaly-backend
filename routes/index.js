const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/product', require('./product'));
router.use('/store', require('./store'));
router.use('/users', require('./users'));
router.use('/order', require('./order'));
router.use('/dashboard', require('./dashboard'));
router.use('/merchant', require('./merchant'));

module.exports = router;
