import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

export const addTocart = async (req, res) => {
  const { productId, quantity, size } = req.body;

  const product = await productModel.findById(productId);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const selectedSize = product.size.find(
    (s) => s.size === size
  );

  if (!selectedSize) {
    return res.status(400).json({
      message: "Size not available",
    });
  }

  if (selectedSize.stock < quantity) {
    return res.status(400).json({
      message: "Out of stock",
    });
  }

  const cart =
    (await cartModel.findOne({
      user: req.user.userId,
    })) ??
    (await cartModel.create({
      user: req.user.userId,
      products: [],
    }));

  const productExists = cart.products.find(
    (p) =>
      p.product.toString() === productId &&
      p.size === size
  );

  if (productExists) {
    await cartModel.updateOne(
      {
        user: req.user.userId,
        "products.product": productId,
        "products.size": size,
      },
      {
        $inc: {
          "products.$.quantity": quantity,
        },
      }
    );

    return res.status(200).json({
      message: "Quantity updated in cart successfully",
    });
  }

  await cartModel.findOneAndUpdate(
    {
      user: req.user.userId,
    },
    {
      $push: {
        products: {
          product: productId,
          quantity: quantity,
          size: size,
        },
      },
    }
  );

  return res.status(200).json({
    message: "Cart item created successfully",
  });
};

export const getCart = async (req, res) => {
  const cart =
    (await cartModel.findOne({
      user: req.user.userId,
    })) ??
    (await cartModel.create({
      user: req.user.userId,
      products: [],
    }));

  return res.status(200).json({
    message: "Cart fetched successfully",
    data: {
      cart,
    },
  });
};