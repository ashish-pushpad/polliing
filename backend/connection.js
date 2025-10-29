import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

async function connectDb(){
    try{
   await mongoose.connect(process.env.MONGODB_URI);
   console.log("connected the db successfully");
}catch(e){
    console.log("this is error in connection.js : ",e)
}
}

export default connectDb;