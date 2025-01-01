const express = require("express")
const router = express.Router();
const PricingPlanController = require("../controllers/PricingPlanController")



// Routes to Get API Data //
router.get('/getAll', PricingPlanController.getPlans)



module.exports = PricingPlanRoute = router