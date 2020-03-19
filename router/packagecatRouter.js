const express = require('express')
const { packagecatController }= require('../controller')
const router = express.Router()

router.get('/getallpackagecat', packagecatController.getAllPackagecat)
router.post('/addpackagecat', packagecatController.addPackagecat)
router.delete('/deletepackagecat/:id', packagecatController.deletePackagecat)

// pagination
router.get('/getonetofive', packagecatController.getOneToFive)
router.get('/getfivetoten', packagecatController.getFiveToTen)

module.exports = router