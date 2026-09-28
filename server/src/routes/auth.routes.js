import express from "express";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { Login, logout, me, refresh, register } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const authroutes = express.Router();

authroutes.post("/register",registerValidator,register);
authroutes.post("/login",loginValidator,Login);
authroutes.post("/refresh",refresh)
authroutes.get("/me",authenticate,me)
authroutes.post("/logout",authenticate,logout)

export default authroutes;
