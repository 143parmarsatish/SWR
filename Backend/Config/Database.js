import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

if(!process.env.MONGOOSE_URI){
    throw new Error("Please provide mongodb uri in .env file ");
}

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGOOSE_URI)
    } 
    catch (error) {
        console.log("MongoDB Error", error);
    }
}


export default connectDB;