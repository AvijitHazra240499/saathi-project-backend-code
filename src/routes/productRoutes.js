const express = require('express');
const router = express.Router();
const productController = require('../controller/merchantProductController');

router.post('/create', productController.createProduct);
router.get('/list', productController.listProducts);
router.get('/read/:id', productController.readProduct);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;