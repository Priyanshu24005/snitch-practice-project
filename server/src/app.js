import express from "express";
import cors from "cors";

import { connectDb } from "./config/db.js";
import authroutes from "./routes/auth.routes.js";
import cookieparser from "cookie-parser";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";

await connectDb();

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieparser());

app.use("/api/auth", authroutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

export default app;