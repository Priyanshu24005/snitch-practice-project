import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    role:{
        type:String,
        enum:["user","seller"],
        default:"user"
    },
    refreshToken:{
        type:String
    }
    
})

export const userModel = mongoose.model("users",userSchema); 