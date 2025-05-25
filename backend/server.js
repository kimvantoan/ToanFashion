import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
dotenv.config();
// import routes from './routes/index.js';
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
// const routes = require('./routes');
// app.use('/', routes);

connectDB();
// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});