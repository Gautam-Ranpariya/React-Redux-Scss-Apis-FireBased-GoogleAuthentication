const {model,Schema} = require("mongoose")

const userSchema = new Schema({
    username : {
        type : String,
        default:null,
    },
    email : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required: true,
    },
    token : {
        type:  String ,
        default : null
    },
    profile :{
        type : String,
        default: null
    },
    phonenumber : {
        type :String,
        default: null
    }
},{versionKey : false,timestamps : true})


const userModel = model("user",userSchema,"user")

module.exports = userModel