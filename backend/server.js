import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import router from './routes/index.route.js';
import cors from 'cors';
dotenv.config();
// import routes from './routes/index.js';
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
}));

// Routes
app.use('/api/v1', router);

connectDB();
// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});