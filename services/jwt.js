const jwt = require('jsonwebtoken')
const reply = require("../helpers/Reply")

//  generate token 
const generateJWT = (user) => {

    const token = jwt.sign(user.toObject(), "apikey");
    return token;

}

// verify token 

const verifyJWT = (req, res, next) => {

    if (!req.headers?.authorization) {
        return res.status(401).json(reply.failed("unauthrized"))
    }

    const token = req.headers?.authorization;

    try {
        const decoded = jwt.verify(token, 'apikey');
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