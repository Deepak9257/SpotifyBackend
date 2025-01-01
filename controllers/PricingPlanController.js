
const PricingPlanModel = require("../models/PricingPlan");



const getPlans = async (req, res) => {

  const pricingplanData = await PricingPlanModel.find({});

  return res.json({
    status: true,
    message: "pricing plan fetch successfully",
    data: pricingplanData,
  });

};



 
module.exports = { getPlans };