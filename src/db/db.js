import mongoose from 'mongoose';
import {DB_NAME} from '../constants.js';


const connectDB = async () => {
  try {
    // console.log(process.env.MONGODB_URL);
    // console.log(process.env.DB_NAME);
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    console.log(`✅ MongoDB Connected !! DB Host:  ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log('❌ Error connecting to MongoDB:', error );
    throw error;
  } 
}

export default connectDB;