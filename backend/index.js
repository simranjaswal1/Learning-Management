import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
//import contentRoute from "./routes/content.route.js";
import performanceRoute from "./routes/performance.routes.js";
import quizRoute from "./routes/quiz.routes.js";
import storyRoute from "./routes/story.route.js";
import morgan from 'morgan';  // Optional: for logging HTTP requests
import courseRoute from "./routes/course.routes.js";
import profileRoutes from "./routes/profile.js";
import quizResult from "./routes/quizresult.routes.js";
dotenv.config({});

const app = express();

// middleware
app.use(morgan('dev'));  // Logs all HTTP requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',  // correct frontend port!
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


const PORT = process.env.PORT || 5000;

// API routes
app.use("/api/user", userRoute);
app.use("/api/profile", profileRoutes);
app.use("/api/performance", performanceRoute);
app.use("/api/quiz", quizRoute);
app.use("/api/story", storyRoute);
app.use("/api/course", courseRoute);
app.use("/api/quizresult",quizResult);
app.get('/', (req, res) => {
  res.send('API is running...');
});


// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log the error
  res.status(500).send({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, async () => {
  try {
    await connectDB(); // Ensure DB connection is established
    console.log(`Server running at port ${PORT}`);
  } catch (err) {
    console.error("Database connection failed", err);
    process.exit(1); // Exit process if DB connection fails
  }
});
