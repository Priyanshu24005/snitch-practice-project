import bycrypt from "bcryptjs";
import { userModel } from "../models/user.model.js";
import { generateToken, verifyrefreshToken } from "../utils/tokens.js";

export const register = async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;

  const userExists = await userModel.findOne({
    email,
  });

  if (password != confirmpassword) {
    return res.status(400).json({
      message: "passwords do not match",
    });
  }

  if (userExists) {
    return res.status(409).json({
      message: "user with this email already exists",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password: await bycrypt.hash(password, 10),
  });

  const { accessToken, refreshToken } = generateToken({
    userId: user._id,
    role: user.role,
  });

  await userModel.findOneAndUpdate(user._id, {
    refreshToken,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  return res.status(201).json({
    message: "user registered successfully",
    data: {
      user: {
        name: user.name,
        email: user.email,
      },
      accessToken,
    },
  });
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const isValidPassword = await bycrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const { accessToken, refreshToken } = generateToken({
    userId: user._id,
    role: user.role,
  });

  await userModel.findOneAndUpdate(user._id, {
    refreshToken,
  });

  res.cookie("refreshToken",refreshToken,{
    httpOnly:true
  })

  return res.status(200).json({
    message:"user fetched successfully",
    data:{
        user:{
           name:user.name,
           email:user.email
        },
        accessToken
    }
  }) 
};

export const refresh = async(req,res)=>{
    const refreshToken = req.cookies.refreshToken;

    console.log(refreshToken);
    

    if(!refreshToken){
        return res.status(400).json({
            message:"invalid or expired Refresh Token"
        })
    } 

    const decoded = verifyrefreshToken(refreshToken)


    const user = await userModel.findOne(decoded.userID)

    const {accessToken,refreshToken:newRefreshToken} = generateToken({
        userId:user._id,
        role:user.role
    })

    await userModel.findOneAndUpdate(user._id,{
        newRefreshToken 
    })

    res.cookie("refreshToken",newRefreshToken,{
        httpOnly:true
    })

    return res.status(200).json({
        message:"Tokens rotated successfully",
        data:{
            user:{
                name:user.name,
                email:user.email
            },
            accessToken
        }
    })
}

export const me = async(req,res)=>{
    const {userId,role} = req.user;


    const user = await userModel.findById(userId)
    
    return res.status(200).json({
        message:"user fetched successfully",
        data:{
            user:{
                name:user.name,
                email:user.email,
                role:user.role
            }
        }    
    })
}

export const logout = async (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    await userModel.findOneAndUpdate(
        { refreshToken },
        { refreshToken: null }
    );

    res.clearCookie("refreshToken");

    return res.status(200).json({
        message: "Logged out successfully"
    });
};
