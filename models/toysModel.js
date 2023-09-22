const mongoose = require("mongoose");
const Joi = require("joi");



const toysSchema = mongoose.Schema({
    name:String,
    info:String,
    category:String,
    img_url:String,
    price:Number,
    userId:String
},{timestamps:true})

exports.ToysModel = mongoose.model("toys" , toysSchema);


exports.validDataToys = (reqBody) => {
    const joiSchema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        info: Joi.string().min(2).max(400).required(),
        category: Joi.string().min(2).max(50).required(),
        img_url: Joi.string().min(2).max(200).allow(null,""),
        price: Joi.number().min(1).max(99999).required(), 
    })
    return joiSchema.validate(reqBody);
}