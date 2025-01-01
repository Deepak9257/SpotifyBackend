const { verifyJWT } = require("../../services/jwt");
const PrincingPlanController = require("../controllers/PricingPlanController")
const express = require("express")
const router = express.Router();

router.post('/create',verifyJWT, PrincingPlanController.createPlan)
router.get('/getAll',verifyJWT, PrincingPlanController.getPlans)

module.exports= PrincingPlanRoute = router