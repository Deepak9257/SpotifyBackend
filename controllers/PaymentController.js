const paymentModel = require("../models/Payment")
const Razorpay = require('razorpay'); 

// This razorpayInstance will be used to
// access any resource from razorpay
const razorpayInstance = new Razorpay({

    // Replace with your key_id
    key_id: "rzp_test_wBx5t6uUqEzSp6",

    // Replace with your key_secret
    key_secret: "UeImrNgYY0zPdJD3dtzEV3jV"
});



const createPayment = async (req, res) => {
  
  const { userId, orderId, paymentId, status, amount, razorpay_signature } = req.body;

  const Exist = await  paymentModel.findOne({ paymentId, userId:req.user._id }) 

  if (Exist) {
    return res.json({ status: false, message: "Payment Exist" })
  }

  
  

  const Payment = new paymentModel({
    userId:req.user._id, orderId, paymentId, status:(razorpay_signature)? "completed":status, amount, razorpay_signature

  })
  
  Payment.save();
  return res.json({ status: true, message: "Payment success" })

}


const createOrder = async(req,res)=>{
//Inside app.js
const {amount}  = req.body;      
      
  // STEP 2:    
  razorpayInstance.orders.create({amount, currency:"INR" }, 
      (err, order)=>{
      
        //STEP 3 & 4: 
        if(!err)
          res.json(order)
        else
          res.send(err);
      })
  

}

module.exports = {  createPayment, createOrder };