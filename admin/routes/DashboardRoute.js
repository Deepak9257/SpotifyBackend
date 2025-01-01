const express = require("express")
const router = express.Router();;
const DashboardController = require("../controllers/DashboardController");
const { verifyJWT } = require("../../services/jwt");



router.get('/getAllCount', verifyJWT, DashboardController.getAllCount)



module.exports = DashboardRoutes = router