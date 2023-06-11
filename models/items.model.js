const mongoose=require("mongoose");

const itemSchema=mongoose.Schema({
    name:String,
    userId:String,
    title:String,
    desc:String,
    status:Boolean
},
{
    versionKey:false
})

const itemModel=mongoose.model("items",itemSchema);

module.exports=itemModel