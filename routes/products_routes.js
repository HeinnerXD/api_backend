'use strict'

const router = require('express').Router();
const productController = require('../controllers/product')

router.get('/get/one/:id?/:pharmacy?', productController.getProduct);
router.get('/get/all', productController.getAllProducts);
router.get('/get/by_pharmacy/:pharmacy?', productController.getProductsByPharmacy);
router.get('/get/by_id/:id?', productController.getProductsById);
router.post('/add', productController.addProduct);
router.put('/update', productController.updateProduct);
router.put('/update/by_pharmacy', productController.updateProductByPharmacy);
router.delete('/delete', productController.deleteProduct);
router.delete('/delete/by_pharmacy', productController.deleteProductByPharmacy);

module.exports = router;