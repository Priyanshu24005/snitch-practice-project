import { body, validationResult ,param} from "express-validator";

export const productValidator = [
  body("title")
    .exists()
    .withMessage("title is required")
    .bail()
    .isString()
    .withMessage("title must be in String")
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("title must be between 2 and 100 characters")
    .bail()
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("title must contain only alphabets")
    .bail(),

  body("description")
    .exists()
    .withMessage("description is required")
    .isString("description must be in String")
    .trim()
    .isLength({ min: 20, max: 500 })
    .withMessage("description must be between 20 to 500 characters")
    .bail(),

    body("price.amount")
    .exists("amount is required").bail()
    .isInt().withMessage("amount must be an integer value").bail(),

    body("price.currency")
    .exists().withMessage("currency is required").bail()
    .isIn(["USD","INR"]).bail(),

    body("sizes.*.size")
    .exists().withMessage("size is required").bail()
    .isIn(["XS","S","M","L","XL"]).bail(),

    body("sizes.*.stock")
    .exists().withMessage("stock is required").bail()
    .isInt().withMessage("stock must be an Integer Value"),
    (req,res,next)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"Invalid Request",
                errors:errors.array()
            })
        }
        next()
    }
];

export const unlistValidator = [
    param("id")
    .exists().withMessage("id is required")
    .isMongoId().withMessage("Product must have valid mongoid"),
    (req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty){
            return res.status(400).json({
                message:"Invalid data",
                errors:errors.array()
            })
        }
        next()
    }
]

export const listValidator = [
    param("id")
    .exists().withMessage("id is required")
    .isMongoId().withMessage("Product must have valid mongoid"),
    (req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty){
            return res.status(400).json({
                message:"Invalid data",
                errors:errors.array()
            })
        }
        next()
    }
]