'use strict'

const router = require('express').Router();
const productController = require('../controllers/product')

router.post('/add', productController.addProduct);
router.put('/update', productController.updateProduct);
router.delete('/delete', productController.deleteProduct);

module.exports = router;