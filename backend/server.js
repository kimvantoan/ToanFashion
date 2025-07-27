import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import router from "./routes/index.route.js";
import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [process.env.CLIENT_URL, process.env.ADMIN_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

// Routes
app.use("/api/v1", router);

connectDB();
// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
