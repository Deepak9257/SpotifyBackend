const jwt = require('jsonwebtoken')
const reply = require("../helpers/Reply")
require('dotenv').config()

//  generate token 
const generateJWT = (user) => {

    const token = jwt.sign(user.toObject(), process.env.JWT_SECRET_KEY);
    return token;

}

// verify token 

const verifyJWT = (req, res, next) => {

    if (!req.headers?.authorization) {
        return res.status(401).json(reply.failed("unauthrized"))
    }

    const token = req.headers?.authorization;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(401).json(reply.failed("unauthrized"))
        }
        req.user = decoded;

    }
    catch (err) {

        console.log(err)

        return res.status(401).json(reply.failed("unauthrized"))
    }


    next()



}


module.exports = { generateJWT, verifyJWT }