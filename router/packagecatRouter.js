const express = require('express')
const { packagecatController }= require('../controller')
const router = express.Router()

router.get('/getallpackagecat', packagecatController.getAllPackagecat)
router.post('/addpackagecat', packagecatController.addPackagecat)
router.delete('/deletepackagecat/:id', packagecatController.deletePackagecat)

module.exports = router