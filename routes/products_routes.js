'use strict'

const router = require('express').Router();
const productController = require('../controllers/product')

router.post('/add', productController.addProduct);

module.exports = router;