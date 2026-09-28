import { uploadFile } from "../services/auth.service.js";
import { productModel } from "../models/product.model.js";

export const createProduct = async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  const filesUrl = [];

  for (let i = 0; i < req.files.length; i++) {
    const response = await uploadFile({
      buffer: req.files[i].buffer,
      fileName: req.files[i].originalname,
    });

    filesUrl.push(response.url);
  }

  const product = await productModel.create({
    title: req.body.title,
    description: req.body.description,

    price: {
      amount: req.body.price.amount,
      currency: req.body.price.currency,
    },

    size: req.body.size,

    images: filesUrl,

    seller: req.user.userId,
  });

  return res.status(201).json({
    message: "Product created successfully",
    data: {
      product,
    },
  });
};

export const getAllListedProducts = async (req, res) => {
  const products = await productModel.find({
    published: true,
  });

  return res.status(200).json({
    message: "Products fetched successfully",
    data: {
      products,
    },
  });
};

export const getAllProductsforSeller = async (req, res) => {
  const products = await productModel.find({
    seller: req.user.userId,
  });

  return res.status(200).json({
    message: "Products fetched successfully",
    data: {
      products,
    },
  });
};

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  return res.status(200).json({
    message: "Product fetched successfully",
    data: {
      product,
    },
  });
};

export const unlist = async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  product.published = false;
  await product.save();

  return res.status(200).json({
    message: "Product unlisted successfully",
  });
};

export const list = async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  product.published = true;
  await product.save();

  return res.status(200).json({
    message: "Product listed successfully",
  });
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  await productModel.findByIdAndDelete(id);

  return res.status(200).json({
    message: "Product deleted successfully",
  });
};