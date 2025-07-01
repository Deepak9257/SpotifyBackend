const userModel = require("../../models/User")
const { generateJWT } = require("../../services/jwt");
const bcrypt = require('bcryptjs')

const AuthController = { 
    
    async login (req, res) {

    const { email, password } = req.body;

    const Exist = await userModel.findOne({ email, role: "admin" })

    if (!Exist) {
        return res.json({ status: false, message: "User Not Found" })
    }

    var hashPassword = bcrypt.compareSync(password, Exist.password)
    if(!hashPassword){
        return res.json({ status: false, message: "User Not Found" })
    }

    const token = generateJWT(Exist)

    return res.json({ status: true, message: "Login Succussfully", token, email })

}


}

module.exports = AuthController
