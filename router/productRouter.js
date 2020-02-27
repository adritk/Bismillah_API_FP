const express = require('express');
const { productController } = require('../controller');
const router = express.Router();

router.post('/addpackage', productController.addPackage)
router.put('/editpackage/:id', productController.editPackage)
router.get('/getpackage', productController.getAllPackage)
router.get('/getpackagedomestik', productController.getTourDomestik)
router.get('/getpackagebyid/:id', productController.getPackageById)
router.get('/gettiketattraction', productController.getTiketAttraction)
router.delete('/deletepackage/:id', productController.deletePakage)

module.exports = router;