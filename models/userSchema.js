const mongoose = require("mongoose");

//defining schema of our collection
const userSchema = new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        age:{
            type:Number,
            required:true
        },
        phone:{
            type:Number,
            required:true,
            unique:true
        },
        department:{
             type:String,
            required:true
        },
        location:{ 
            type:String,
            required:true
        },
        salary:{
             type:Number,
            required:true
        }
})

const users = new mongoose.model("users",userSchema)
module.exports = users;