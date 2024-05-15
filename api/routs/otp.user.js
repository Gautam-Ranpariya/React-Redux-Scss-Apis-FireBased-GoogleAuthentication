const express = require("express")
const routs = express.Router()

const otpController =  require("../controllers/otp.conto")
const {sendOtpvalidation,varifiedvalidation}=require("../validation/otpSchema.velidation")

//otp gen
routs.post('/send',sendOtpvalidation,otpController.sendOtp)
routs.post('/varified',varifiedvalidation,otpController.verified)



module.exports = routs