const express = require("express");
const bcrypt = require("bcrypt")
const router = express.Router();
const {UserModel , validDateUser , validDateLogin , creatToken} = require("../models/userModel")

router.get("/", async(req,res) => {
  res.json({msg:"express work!"})
})



router.post("/" , async(req ,res) => {
    const validDate = validDateUser(req.body);
    if(validDate.error){
        return res.status(400).json(validDate.error.details);
    }
    try{
        const user = new UserModel(req.body)
        user.password = await bcrypt.hash(user.password,10);
        await user.save();
        user.password = "****";
        res.status(201).json(user);
    }
    catch(err){
        if(err.code == 11000){
            return res.status(400).json({err:"Email exsist in dataBais ",code:11000})
        }
        console.log(err);
        res.status(502).json({err})
    }
})



router.post("/login" , async(req ,res) => {
    const validBody = validDateLogin(req.body)
    if(validBody.error){
      return res.status(400).json(validBody.error.details);
    }
    try{
        const user = await UserModel.findOne({email: req.body.email})
        if(!user){
            return res.status(401).json({error:"email not faund"});
        }
        const chackPass = await bcrypt.compare(req.body.password , user.password);
        if(!chackPass){
            return res.status(401).json({error:"password not compare"}); 
        }
        const token = creatToken(user.id);
        res.json({token});
    }
    catch(err){
        console.log(err);
        res.status(502).json({err})
    }
})
module.exports = router;