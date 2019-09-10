'use strict'

const router = require('express').Router();
const productController = require('../controllers/product')

router.post('/add', productController.addProduct);
router.put('/update', productController.updateProduct);
router.put('/update_by_pharmacy', productController.updateProductByPharmacy);
router.delete('/delete', productController.deleteProduct);
router.delete('/delete_by_pharmacy', productController.deleteProductByPharmacy);

module.exports = router;