const Joi = require("joi")
const validate = require("../middelwaer/validate") 
//already user chek velidaton
const alreadyuser = Joi.object({
    email : Joi.string().email().required(),
})
//singup veliditon
const singup = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().required(),
    username : Joi.string(),
    otp : Joi.number(),
    phonenumber : Joi.number()
})
//login velidation
const loginvelidation = Joi.object({
    email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password : Joi.string().required()
})
//change password validation
const changePass = Joi.object({
    oldPassword : Joi.string().required(),
    newPassword : Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{6,16}$')).required(),

})
//forget password validation
const forgetPassword = Joi.object({
    email :  Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    otp : Joi.number().required(),
    newPassword : Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{6,16}$')).required(),
})
//profile upadate
const profileUpdate  = Joi.object({
    profile : Joi.string(),
    phoneNumber : Joi.number(),
    username : Joi.string()
})
module.exports = {
    alreadyuserValidaton : validate(alreadyuser),
    singupValidation : validate(singup),
    loginvelidation : validate(loginvelidation),
    changePassValidation : validate(changePass),
    forgetPasswordValidation : validate(forgetPassword),
    profileUpdateValidation : validate(profileUpdate)
}