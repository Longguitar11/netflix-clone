import mongoose from 'mongoose';
import { MONGO_URI } from './env.js';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('Error connecting to MongoDB:', error.message);
        process.exit(1); // 1 means exit with failure, 0 means exit with success
    }
}

export default connectDB;