import express from "express";
import { addtocartValidator } from "../validators/cart.validator.js";
import { addTocart, getCart } from "../controllers/cart.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const cartRoutes = express.Router();

cartRoutes.post(
  "/",
  authenticate,
  addtocartValidator,
  addTocart
);

cartRoutes.get(
  "/",
  authenticate,
  getCart
);

export default cartRoutes;