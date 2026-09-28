import express from "express";
import multer from "multer";

import {
  createProduct,
  deleteProduct,
  getAllListedProducts,
  getAllProductsforSeller,
  getSingleProduct,
  list,
  unlist,
} from "../controllers/product.controller.js";

import {
  productValidator,
  listValidator,
  unlistValidator,
} from "../validators/product.validator.js";

import {
  authenticate,
  authenticateSeller,
} from "../middleware/auth.middleware.js";

const productRoutes = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 5,
  },
});

productRoutes.post(
  "/",
  authenticate,
  authenticateSeller,
  upload.array("images", 5),

  (req, res, next) => {
    req.body.price = JSON.parse(req.body.price);
    req.body.size = JSON.parse(req.body.size);
    next();
  },

  productValidator,
  createProduct,
);

productRoutes.get(
  "/sellerProducts",
  authenticate,
  authenticateSeller,
  getAllProductsforSeller,
);

productRoutes.get("/allproducts", authenticate, getAllListedProducts);

productRoutes.get("/:id", authenticate, getSingleProduct);

productRoutes.patch(
  "/unlist/:id",
  authenticate,
  authenticateSeller,
  unlistValidator,
  unlist,
);

productRoutes.patch(
  "/list/:id",
  authenticate,
  authenticateSeller,
  listValidator,
  list,
);

productRoutes.delete(
  "/:id",
  authenticate,
  authenticateSeller,
  deleteProduct
);

export default productRoutes;
