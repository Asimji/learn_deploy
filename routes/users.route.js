const express=require("express");

const bcrypt=require("bcrypt");
const userModel = require("../models/users.model");
const jwt=require("jsonwebtoken");
const blacklist = require("../blacklist");

const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,pass}=req.body;
    try {
        bcrypt.hash(pass, 2, async function(err, hash) {
            // Store hash in your password DB.
            if(err){
                res.status(200).json({error:err.message})
            }
            else if(hash){
                const user=new userModel({name,email,pass:hash})
                await user.save();
                res.status(200).json({msg:req.body})
            }
        });
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try {
        const user=await userModel.findOne({email})
       if(user){
        bcrypt.compare(pass, user.pass, function(err, result) {
            if(err){
                console.log(err)
                res.status(200).json({error:err.message});
            }
            else if(result){
                var token = jwt.sign({ userId:user.id,name:user.name}, process.env.privateKey);
                res.status(200).json({msg:"Login Successfull",token})
            }
        });
       }
       else{
        res.status(200).json({msg:"Incorrect Email"})
       }
    } catch (error) {
        res.status(400).json({error:error.message})
    }

})
userRouter.get("/logout",async(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1];
    try {
        if(token){
            blacklist.push(token);
            res.status(200).json({msg:"Logout Successfully"})
            console.log("blacklist",blacklist)
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

module.exports=userRouter