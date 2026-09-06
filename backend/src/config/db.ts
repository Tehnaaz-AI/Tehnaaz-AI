import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.log('No MONGO_URI provided in environment, skipping MongoDB connection.');
      return;
    }

    const conn = await mongoose.connect(mongoUri);
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};
