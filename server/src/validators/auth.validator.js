import {body,validationResult} from "express-validator"

export const registerValidator = [
   body("name")
   .exists().withMessage("Name is required").bail()
   .isString().withMessage("Name must be in String").bail()
   .trim()
   .isAlpha("en-US",{ignore:" "}).withMessage("Name must be in alphabet").bail(),

   body("email")
   .exists().withMessage("email is required").bail()
   .trim()
   .isEmail().withMessage("Invalid email").bail(),

   body("password")
   .exists().withMessage("password is required")
   .isLength({min:6}).withMessage("minimum 6 characters required"),

   body("confirmpassword")
   .exists().withMessage("confirmpassword is required")
   .isLength({min:6}).withMessage("minimum 6 characters required"),
   (req,res,next)=>{
    const errros = validationResult(req)

    if(!errros.isEmpty()){
        return res.status(400).json({
            message:"Invalid request",
            errros:errros.array()
        })
    }
    next();
   }
]

export const loginValidator = [ 
    body("email")
    .exists().withMessage("email is required").bail()
    .trim()
    .isEmail().withMessage("Invalid email").bail(),

    body("password")
    .exists().withMessage("password is required").bail()
    .trim()
    .isLength({min:6}).withMessage("password must be 6 characters long").bail(),
    (req,res,next)=>{
        const errors = validationResult(req)
        
        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"invalid request",
                errors:errors.array()
            })
        }
        next()
    }
]