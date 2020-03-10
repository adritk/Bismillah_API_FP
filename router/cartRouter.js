const express = require('express');
const { cartController } = require('../controller');
const router = express.Router();
const {auth} = require('../helpers/auth')

router.get('/getallcart/:id', cartController.getCart)
router.post('/addtocart', auth, cartController.postAddToCart)
router.delete('/deletecart/:id', cartController.deleteCart)
// router.post('/addtocart', cartController.addToCart)

module.exports = router;