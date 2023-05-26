import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/features.js";
import { ErrorHandler } from "../middlewares/error.js";

export const getAllUsers=async (req,res)=>{
     console.log("yes");
     res.status(200).json({
          success:true,
          message:"working"
     });
};

export const register = async (req,res,next)=>{
     try {
          const {name,email,password}=req.body;
          let user = await User.findOne({email});
      
          if(user)
          {
              return new next(new ErrorHandler("User already exits",400));
          }
          
          const hashedPassword= await bcrypt.hash(password,10);
      
          user = User.create({name,email,password:hashedPassword});
      
          setCookie(user,res,"User Registered",201);

     } catch (error) {
          next(error);    
     }
};

export const login = async (req,res,next)=>{

     try {
          const {email,password}=req.body;

          let user = await User.findOne({email}).select("+password");
     
          if(!user)
          {
              return new next(new ErrorHandler("User doesn't exits",404));
          }
     
          const isMatch = await bcrypt.compare(password,user.password);
     
          if(!user)
          {
              return new next(new ErrorHandler("Invalid Password",404));
          }
          
          setCookie(user,res,`Welcome ${user.name}`,201);

     } catch (error) {
          next(error);    
     }
};

export const getMyDetails = (req,res)=>{
     
     res.status(200).json({
          sucess:true,
          user:req.user
     });
}; 

export const logout = (req,res)=>{
     
     res.status(200).cookie("token","",
     {
          expires:new Date(Date.now()),
          sameSite:process.env.NODE_DEV=="Development"? "lax":"none",
          secure:process.env.NODE_DEV=="Development"? false:true
     })
     .json({
          sucess:true,
     });

}; 
