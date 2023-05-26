import { ErrorHandler } from "../middlewares/error.js";
import{Task} from "../models/task.js"
import { User } from "../models/user.js";

export const newTask =async (req,res)=>{
     try {
     
          const {name,description}=req.body;

     await Task.create({
          name,description,user:req.user
     });

     res.status(201).json({
          success:true,
          message:"Task created successfully"
     }); 


     } catch (error) {
          next(error);
     }

};

export const getMyTask = async (req,res)=>{
     
     const userId=req.user._id;

     const tasks = await Task.find({user:userId});

     res.status(200).json({
          success:true,
          tasks
     });
};

export const updateTask = async (req,res,next)=>{
     
     try {
          const id=req.params.id;

          const task = await Task.findById(id);
     
          
          if(!task)
          {
               return new next(new ErrorHandler("Task does not exits",404));
          }
     
          task.isCompleted=!task.isCompleted;
     
          await task.save();
     
          console.log(task);
     
          res.status(200).json({
               success:true,
               message:"Task updated"
          });

     } catch (error) {
         next(error);   
     }

};

export const deleteTask = async (req,res,next)=>{

     try {
          const id=req.params.id;

          const task = await Task.findById(id);

          if(!task)
          {
               return new next(new ErrorHandler("Task does not exits",404));
          }

          await task.deleteOne();

          // await Task.findByIdAndRemove(id);

          res.status(200).json({
               success:true,
               message:"Task deleted"
          });

     } catch (error) {
         next(error);   
     }
};