const express = require('express')
const router = express.Router()
const PaymentController = require("../controllers/PaymentController")
const { verifyJWT } = require('../services/jwt')

router.post('/create', verifyJWT, PaymentController.createPayment )
//Inside app.js
router.post('/createOrder', verifyJWT, PaymentController.createOrder)



module.exports = PaymentRoute = router