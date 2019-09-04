'use strict'

const router = require('express').Router();
const user_controller = require('../../controllers/users/add');

router.post('/add', user_controller.add_user);

module.exports = router;