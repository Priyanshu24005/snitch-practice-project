import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 500,
  },
  images: {
    type: [
      {
        type: String,
      },
    ],
    validate: {
      validator: (images) => images.length <= 5,
      message: "A productcan have 5 images",
    },
  },
  price: {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      enum: ["INR", "USD"],
      default: "INR",
    },
  },
  size: [
    {
      size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL"],
        default: "M",
      },
      stock: {
        type: Number,
        required: true,
      },
    },
  ],

  seller: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  published:{
    type:Boolean,
    default:false
  }
});

export const productModel = mongoose.model("products", productSchema);
