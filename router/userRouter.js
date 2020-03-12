const express = require('express')
const {userController} = require('../controller')
const router = express.Router()
const {auth} = require('../helpers/auth')

router.get('/getall', userController.getUsers)
router.get('/getbyid/:id', userController.getUserById)
router.post('/register', userController.register)
router.post('/emailverification', userController.emailVerification)
router.post('/login', userController.login)
// router.post('/keeplogin', auth, userController.keepLogin)
router.delete('/delete/:id', userController.deleteUsers)
module.exports = router