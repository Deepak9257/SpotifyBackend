const jwt = require("jsonwebtoken");
const reply = require("../helpers/Reply");
const userModel = require("../models/User");
const SendMail = require("../services/mail");

const bcrypt = require("bcryptjs");


const AuthController = {

    async validateEmail(req, res) {

        const { email } = req.body;

        const exist = await userModel.findOne({ email });

        if (exist) {
            return res.json({ status: false, message: 'Already registered' })
        }

        return res.json({ status: true, message: 'Email validated' })

    },


    async login(req, res) {
        const { email, password } = req.body;

        const userExist = await userModel.findOne({ email });

        if (!userExist) {
            return res.json(reply.failed("User Not Exist"));
        }

        const hashPassword = await bcrypt.compare(password, userExist.password)

        if (!hashPassword) {
            return res.json(reply.failed("User Not Exist"));
        }

        const token = generateJWT(userExist)

        return res.json(reply.success("Login Sucessfully", { token, email, password }));


    },

    async forgotPassword(req, res) {
        const { email } = req.body;

        const userExist = await userModel.findOne({ email });
        if (!userExist) {
            return res.json(reply.failed("User Not Exist"));
        }

        const token = generateJWT(userExist)
        const msg = `Your reset password link : <a href="http://localhost:5173/resetpassword/${token}">Click to reset</a>`;
        SendMail(userExist.email, "Reset Password", msg);
        return res.json(reply.success("Reset Password link sent on email Sucessfully", { token }));


    },

    async resetPassword(req, res) {
        const { password, token } = req.body;

        const user = jwt.verify(token, 'apikey');

        await userModel.findOneAndUpdate({ _id: user._id }, { password });
        const msg = `Your password updated`;
        SendMail(user.email, "Password Changed", msg);
        return res.json(reply.success(" Password Reset Sucessfully"));


    },

    async register(req, res) {

        const { uname, email, password } = req.body;

        const userExist = await userModel.findOne({ email });


        if (userExist) {
            return res.json(reply.failed("Already Exist"));
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        
        const user = new userModel({
            email, name: uname, password: hashPassword
        })

        user.save();
        return res.json(reply.success("Sucessfully registered", user));

    },

    async getUser(req, res) {


        const { token } = req.body;

        const decoded = jwt.verify(token, 'apikey')
        const Exist = await userModel.findOne({ _id: decoded._id }).select('-password');

        if (!Exist) {
            return res.json({ status: false, message: "Session Expired!" })
        }

        return res.json({ status: true, message: "getUser details", data: Exist })

    }


}


module.exports = AuthController;