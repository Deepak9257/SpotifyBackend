const PricingPlanModel = require("../../models/PricingPlan")

const createPlan = async (req, res) => {

    const { name, content, type, amount, duration, image, status } = req.body;
  
    const Exist = await PricingPlanModel.findOne({ name })
  
    if (Exist) {
      return res.json({ status: false, message: "Pricing Plan Exist" })
    }
  
    const pricingplan = new PricingPlanModel({
      user_id: req.user._id,
      name, content, type, duration, amount, image, isActive:status
  
    })
  
    pricingplan.save();
    return res.json({ status: true, message: "pricing plan Created successfully" })
  
  }


  const getPlans = async (req, res) => {

    const pricingplanData = await PricingPlanModel.find({});
  
    return res.json({
      status: true,
      message: "pricing plan fetch successfully",
      data: pricingplanData,
    });
  
  };

  module.exports = {createPlan, getPlans}