import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ideaRouter from "./routes/idea-routes.js";
import authRouter from "./routes/auth-routes.js";
import { errorHandler } from "./middlewares/error-handler.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

const allowOrigins = ["http://localhost:3000"];
app.use(
  cors({
    origin: allowOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/ideas", ideaRouter);
app.use("/api/auth", authRouter);

// 404 fallback
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
