const mongoose = require('mongoose');

const PricingPlanSchema = new mongoose.Schema({
    user_id : {
        type : String,
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    content:{
        type:String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    amount: {
        type: String,
        required:true
    },
    image: {
        type: String
    }
},{
    
timestamps:true

});

module.exports = PricingPlanModel = mongoose.model('pricing_plans', PricingPlanSchema);