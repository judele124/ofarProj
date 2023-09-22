const express = require("express");
const router = express.Router();
const {ToysModel,validDataToys} = require("../models/toysModel")
const {auth} = require('../middleWare/auth')

router.get("/", async(req,res) => {
    try{
        const limit =  10;
        const page = req.query.page - 1 || 0;
        const sort = req.query.sort || "price";
    
        let filteFind = {};
        if(req.query.s){  
          const searchExp = new RegExp(req.query.s,"i");
          filteFind = {$or:[{title:searchExp},{info:searchExp},{category:searchExp}]}
        }
        if(req.query.cat){  
          const searchExp = new RegExp(req.query.cat,"i");
          filteFind = {category:searchExp};
        }
        const data = await ToysModel
        .find(filteFind)
        .limit(limit)
        .skip(page * limit)
        .sort({[sort]:1})
        res.json(data);
      }
      catch(err){
        console.log(err);
        res.status(502).json({err})
      }
})


router.get("/single/:id" , async(req ,res) => {
  try{
    const id = req.params.id;
    const data = await ToysModel.findOne({_id:id});
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
} )


router.post("/", auth , async(req , res) => {
    const validBody = validDataToys(req.body);
    if(validBody.error){
      return res.status(400).json(validBody.error.details)
    }
    try{
      const toys = new ToysModel(req.body);
      toys.userId = req.tokenData._id;
      await toys.save();
      res.status(201).json(toys);
    }
    catch(err){
      console.log(err);
      res.status(502).json({err})
    }
})


router.put("/:id" , auth , async(req ,res) => {
        const validBody = validateGame(req.body);
    if(validBody.error){
      return res.status(400).json(validBody.error.details)
    }
    try{
      const id = req.params.id;
      const toisData = await ToysModel.updateOne({_id:id , userId:req.tokenData._id},req.body);
      res.json(toisData);
    }
    catch(err){
      console.log(err);
      res.status(502).json({err})
    }
})


router.delete("/:id", auth , async(req,res) => {
  try{
    const id = req.params.id;
    const data = await ToysModel.deleteOne({_id:id , userId:req.tokenData._id});
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(502).json({err})
  }
})







module.exports = router;