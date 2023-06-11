const express=require("express");
const auth = require("../middleware/auth.middleware");
const itemModel = require("../models/items.model");

const itemRouter=express.Router();

itemRouter.use(auth)

itemRouter.post("/add",async(req,res)=>{

    try {
        const item=new itemModel(req.body);
        await item.save();
        res.status(200).json({msg:req.body})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

itemRouter.get("/",async(req,res)=>{
    try {
        const item=await itemModel.find();
        res.status(200).json({msg:item})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

itemRouter.patch("/update/:id",async(req,res)=>{
    const userIdinUserDoc=req.body.userId;
    const {id}=req.params;
    try {
        const item=await itemModel.findOne({_id:id});
        if(userIdinUserDoc===item.userId){
          await itemModel.findByIdAndUpdate({_id:id},req.body);
          res.status(200).json({msg:`${item.title} updated Successfully`})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

itemRouter.delete("/delete/:id",async(req,res)=>{
    const userIdinUserDoc=req.body.userId;
    const {id}=req.params;
    try {
        const item=await itemModel.findOne({_id:id});
        if(userIdinUserDoc===item.userId){
          await itemModel.findByIdAndDelete({_id:id});
          res.status(200).json({msg:`${item.title} Delted Successfully`})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})
module.exports=itemRouter