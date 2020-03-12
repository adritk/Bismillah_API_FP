const express = require('express');
const { productController } = require('../controller');
const router = express.Router();

router.get('/getpackage', productController.getAllPackage)
router.get('/getpackagedomestik', productController.getTourDomestik)
router.get('/getpackagebyid/:id', productController.getPackageById)
router.get('/gettiketattraction', productController.getTiketAttraction)
router.get('/getwaterpark', productController.getWaterPark)
router.get('/getthemepark', productController.getThemePark)

router.post('/addpackage', productController.addPackage)
router.put('/editpackage/:id', productController.editPackage)
router.delete('/deletepackage/:id', productController.deletePakage)

module.exports = router;