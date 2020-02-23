const express = require('express')
const { categoryController }= require('../controller')
const router = express.Router()

router.get('/getallcategory', categoryController.getAllCategory)
router.get('/getcategoryleaf', categoryController.getCategoryLeaf)

module.exports = router