const jwt = require("jsonwebtoken");
const userModel = require("../../models/User")
const { generateJWT } = require("../../services/jwt");


const AuthController = { 
    
    async login (req, res) {

    const { email, password } = req.body;

    const Exist = await userModel.findOne({ email, password, role: "admin" })

    if (!Exist) {

        return res.json({ status: false, message: "User Not Found" })
    }

    const token = generateJWT(Exist)

    return res.json({ status: true, message: "Login Succussfully", token })

}


}

module.exports = AuthController
