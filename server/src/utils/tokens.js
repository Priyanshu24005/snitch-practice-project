import jwt from "jsonwebtoken"
import { config } from "../config/config.js"

export const generateToken = ({userId,role}) => {
    const accessToken = jwt.sign({userId,role},config.ACCESS_TOKEN_SECRET,{expiresIn:"15M"})
    const refreshToken = jwt.sign({userId,role},config.REFRESH_TOKEN_SECRET,{expiresIn:"7D"})

    return {accessToken,refreshToken};
}

export const verifyAccessToken = (accessToken) => {
    return jwt.verify(accessToken,config.ACCESS_TOKEN_SECRET)
}

export const verifyrefreshToken = (refreshToken)=>{
    return jwt.verify(refreshToken,config.REFRESH_TOKEN_SECRET)
}