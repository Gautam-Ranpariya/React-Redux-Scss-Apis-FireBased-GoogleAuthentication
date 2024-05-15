const jwt = require("jsonwebtoken");

const {userModel}=require("../models/index.model")

const auth = async (req,res,next)=>{
    try {
    let token = req.headers.authorization
    if (!token) {
        return res.json({
            msg :  "add token"
        })
    }
    token = token.split(' ')[1]
    console.log(token);

    const privateKey = process.env.JWT_SECRET_KEY

    const verified = jwt.verify(token, privateKey)
    console.log("🚀 ~ auth ~ verified:", verified)

    let user = await userModel.findById({ _id: verified._id })

    if (token != user.token) {
        return res.status(498).json({
            msg: 'token not velid'
        })
    }
    // find user add set req --> user
    req.user = user
   next()
} catch (error) {
    console.log("🚀 ~ auth ~ error:", error)
    return res.status(500).json({
        error: error.message
    })   
}
}

module.exports = auth                                       