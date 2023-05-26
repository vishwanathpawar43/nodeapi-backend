import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";


// server
export const app=express();

config({
     path:"./data/config.env"
});

// middleware
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskRouter);
app.use(cors({
     origin:[process.env.FRONTEND_URI],
     methods:["GET","PUT","POST","DELETE"],
     credentials:true
}));

app.get("/",(req,res)=>{
     res.send("Working");     
});


app.use(errorMiddleware);