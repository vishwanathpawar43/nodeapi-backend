import jwt from "jsonwebtoken";

export const setCookie =(user,res,message,statusCode=200)=>{

     const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
    res.status(statusCode).cookie("token",token,{
     httpOnly:true,
     sameSite:process.env.NODE_DEV=="Development"? "lax":"none",
     secure:process.env.NODE_DEV=="Development"? false:true

    }).json({
     success:true,
     message
    });

};