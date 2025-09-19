import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import contactRoutes from "./routes/contact.js";

const app = express();

// Security headers
app.use(helmet({ crossOriginResourcePolicy: false }));

// CORS Configuration
const allowedOrigins = [
  "https://nitishb.me",
  "https://www.nitishb.me",
  "https://nitish-portfolio-seven.vercel.app", // your frontend
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (like Postman with no origin)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Handle preflight requests
app.options("*", cors());


// Rate limiter
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100,
}));

// JSON and URL-encoded parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/contact", contactRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// Fallback 404
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Portfolio Backend running on port ${PORT}`);
});

export default app;
