const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    orderId:{
        type: String,
    },
    amount: {
        type: String,
        required: true
    },
    paymentId:{
        type: String,
    },

    status: {
        type: String,
       
    }, 
    razorpay_signature: {
        type: String,
       
    }

},{
timestamps:true

});

const paymentModel = mongoose.model('payments', paymentSchema);

module.exports = paymentModel;