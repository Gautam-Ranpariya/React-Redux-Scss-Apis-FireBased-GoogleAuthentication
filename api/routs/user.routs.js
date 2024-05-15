const express = require("express")
const routs = express.Router()

const auth = require("../middelwaer/auth")
const {upload}=require("../untils/index")

const usercontroller = require("../controllers/user.controller")
const {alreadyuserValidaton,singupValidation,loginvelidation,changePassValidation,forgetPasswordValidation,profileUpdateValidation} = require("../validation/userSchema.velidation")

//all user 
routs.get('/getAllUsers',usercontroller.getAllUsers)
//post
routs.post('/already-user',alreadyuserValidaton,usercontroller.alreadyuser)
routs.post('/singup',singupValidation,usercontroller.singupUser)
routs.post('/login',loginvelidation,usercontroller.loginUser)

routs.put('/change-password',changePassValidation,auth,usercontroller.changePassword)
routs.put('/forget-password',forgetPasswordValidation,usercontroller.forgetPassword)
//  

routs.put('/profile-update',upload.single('profile'),auth,profileUpdateValidation,usercontroller.profileUpdate)






module.exports = routs