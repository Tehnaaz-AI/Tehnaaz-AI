import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import apiRoutes from './routes/apiRoutes';
import { connectDB } from './config/db';

dotenv.config();

// Attempt initial DB connection
if (process.env.MONGO_URI) {
  connectDB();
}

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS
const allowedOrigins = process.env.CLIENT_URL
  ? [process.env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:3000', 'https://tehnaaz-ai.onrender.com']
  : '*';

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

// Serverless DB connection middleware
app.use(async (_req, _res, next) => {
  if (process.env.MONGO_URI && mongoose.connection.readyState === 0) {
    await connectDB();
  }
  next();
});

// Root & Health check routes
app.get('/', (_req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Tehnaaz Portfolio API online.',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api', apiRoutes);

// Export for Vercel Serverless Function deployment
export default app;

// Start server locally or in non-serverless container environments
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
