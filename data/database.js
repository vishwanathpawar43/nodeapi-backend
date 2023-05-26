import mongoose from "mongoose";

export const connectDB=()=>{

mongoose.connect(process.env.MONGO_URI,{dbName:"backendApi"})
.then((c)=>{console.log(`DB connected with ${c.connection.host}` )})
.catch((err)=>{console.log(err)});

};
