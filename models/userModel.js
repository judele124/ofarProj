const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require('dotenv').config();


const userSchema = mongoose.Schema({
    neme:String,
    email:String,
    password:String,
    role:{
        type:String , default:"user"
    }

},{timestamps:true})

exports.UserModel = mongoose.model("users", userSchema);


exports.validDateUser = (reqBody) => {
    const joiSchema = Joi.object({
        name:Joi.string().min(2).max(150).required(),
        email:Joi.string().min(2).max(150).email().required(),
        password:Joi.string().min(3).max(16).required()
    })
    return joiSchema.validate(reqBody);
}


exports.creatToken = (userId) => {
    const token = jwt.sign({_id:userId} , process.env.SECRT_KEY , {expiresIn:"600mins"});
    return token;
}


exports.validDateLogin = (reqBody) => {
    const joiSchema = Joi.object({
        email:Joi.string().min(2).max(150).email().required(),
        password:Joi.string().min(3).max(16).required()
    })
    return joiSchema.validate(reqBody);
}