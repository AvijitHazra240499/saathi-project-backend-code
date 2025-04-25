const express = require('express');
const router = express.Router();
const merchantController = require('../controller/merchantController');

router.post('/create', merchantController.createMerchant);
router.get('/list', merchantController.listMerchants);
router.get('/read/:id', merchantController.readMerchant);
router.put('/update/:id', merchantController.updateMerchant);
router.delete('/delete/:id', merchantController.deleteMerchant);

module.exports = router;