const express = require('express');
const { checkoutController } = require('../controller');
const router = express.Router();

router.get('/getcheckoutbyid', checkoutController.getCheckoutById)
// router.get('/gettransaction', checkoutController.getTransaksi)
router.post('/checkoutuser', checkoutController.postTransaksi)

module.exports = router;