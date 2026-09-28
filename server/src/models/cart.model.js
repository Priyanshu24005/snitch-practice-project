import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"products",
                required:true
            },
            quanity:{
                type:Number,
                min:1,
                default:1
            },
            size:{
                type:String,
                enum:["XS","S","M","L","XL"]
            }
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
})

export const cartModel = mongoose.model("cart",cartSchema)