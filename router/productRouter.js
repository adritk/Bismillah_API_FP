const express = require('express');
const { productController } = require('../controller');
const router = express.Router();

router.post('/addpackage', productController.addPackage)
router.put('/package/:id', productController.editPackage)
router.get('/getpackage', productController.getAllPackage)
// router.post('/addpackage', productController.addPackage)

module.exports = router;