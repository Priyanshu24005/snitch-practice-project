import { verifyAccessToken } from "../utils/tokens.js";

export const authenticate = (req,res,next) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];

    const decoded = verifyAccessToken(accessToken);

    req.user = decoded;
    
    
  } catch (error) {
    return res.status(400).json({
        message:"expired or invalid access Token"
    })
  }
  next();
};

export const authenticateSeller = (req,res,next)=>{
    if(req.user.role !=="seller"){
        return res.status(403).json({
            message:"Trying to access unauthorized request"
        })
    }
    next()
}
