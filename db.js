import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
  
const connectDB = async () =>{

    try {
        const conn = await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MoogoDB Connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.error(`Error: ${error.message}`); 
        process.exit();
        
    }
};

export default connectDB;