import {body,validationResult} from "express-validator"

export const addtocartValidator = [
    body("productId")
    .exists().withMessage("ProducId is required").bail()
    .isString().withMessage("ProductId must be in string").bail()
    .isMongoId().withMessage("ProductId must be a valid mongooseId").bail(),

    body("quantity")
    .exists().withMessage("quantity is required").bail()
    .isInt({min:1}).withMessage("quantity must be in integer").bail(),

    body("size")
    .exists().withMessage("size is required")
    .isIn(["XS","S","M","L","XL"]).withMessage("size must be XS S M L or XL").bail(),

    (req,res,next)=>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"Validation failed",
                errors:errors.array()
            })
        }
        next()
    }
]