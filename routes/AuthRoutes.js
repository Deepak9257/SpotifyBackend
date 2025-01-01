const express = require("express")
const router = express.Router();
const AuthController = require("../controllers/AuthController")


router.post('/validateEmail', AuthController.validateEmail)
router.post('/getUser', AuthController.getUser)
router.post('/login',AuthController.login)
router.post('/register',AuthController.register)
router.post('/forgot',AuthController.forgotPassword)
router.post('/resetpassword',AuthController.resetPassword)

module.exports = AuthRoutes = router