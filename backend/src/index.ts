import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/apiRoutes';
import { connectDB } from './config/db';

dotenv.config();

// Connect to MongoDB
if (process.env.MONGO_URI) {
  connectDB();
} else {
  console.log('No MONGO_URI provided in .env, skipping MongoDB connection.');
}

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS
const allowedOrigins = process.env.CLIENT_URL
  ? [process.env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:3000']
  : '*';

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

// Root & Health check routes
app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Tehnaaz Portfolio API online.' });
});

// API Routes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
