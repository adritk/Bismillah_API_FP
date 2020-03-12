const express = require('express');
const { cartController } = require('../controller');
const router = express.Router();
const {auth} = require('../helpers/auth')

router.get('/getallcartbyid/:id', cartController.getCart)
router.get('/getallcart', cartController.getAllCart)
router.post('/addtocart', auth, cartController.postAddToCart)
router.post('/history', auth, cartController.historyCart)
router.delete('/deletecart/:id', cartController.deleteCart)


module.exports = router;