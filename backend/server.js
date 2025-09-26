import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import contactRoutes from "./routes/contact.js";

const app = express();

// ====================
// Security headers
// ====================
app.use(helmet({ crossOriginResourcePolicy: false }));

// ====================
// CORS Configuration
// ====================

// Default origins: localhost for dev + production domain(s)
const allowedOrigins = [
  "http://localhost:5173",       // dev
  "https://nitishb.me",          // prod
  "https://www.nitishb.me",      // prod variant with www
];

// Log allowed origins in non-dev
if (process.env.NODE_ENV !== "development") {
  console.log("Allowed CORS Origins:", allowedOrigins);
}

// CORS options
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, mobile apps)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Blocked CORS request from origin: ${origin}`);
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
};

// Apply CORS
app.use(cors(corsOptions));

// ====================
// Rate Limiter
// ====================
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,                 // limit each IP to 100 requests per window
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// ====================
// Body parsers
// ====================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ====================
// Routes
// ====================
app.use("/api/contact", contactRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// ====================
// Error handler
// ====================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// ====================
// Fallback 404
// ====================
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ====================
// Start server
// ====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Portfolio Backend running on port ${PORT}`);
  console.log(`🌐 Accessible origins: ${allowedOrigins.join(", ")}`);
});

export default app;
