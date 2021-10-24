const express = require('express');
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/userController');

const User = require('../models/User');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleweres/advancedResults');
const { protect, authorize } = require('../middleweres/auth');

router.use(protect);
// router.use(authorize('admin'));

router.
    route('/')
    .get(authorize('admin'), advancedResults(User), getUsers)
    .post(authorize('admin'), createUser);

router.
    route('/:id')
    .get(authorize('admin', 'merchant'), getUser)
    .put(authorize('admin'), updateUser)
    .delete(authorize('admin'), deleteUser);

module.exports = router;