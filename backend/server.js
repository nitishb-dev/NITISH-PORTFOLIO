import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import contactRoutes from "./routes/contact.js";

const app = express();

// Security headers
app.use(helmet({ crossOriginResourcePolicy: false }));

// Dynamic CORS configuration from environment variables
const productionOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : [];

const allowedOrigins = [
  ...new Set(["http://localhost:5173", ...productionOrigins]),
];

if (process.env.NODE_ENV !== "development") {
  console.log("Allowed CORS Origins:", allowedOrigins);
}

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like curl) and all origins from the list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// Use CORS for all routes
app.use(cors(corsOptions));

// Rate limiter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

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
  console.log(`🌐 Accessible origins: ${allowedOrigins.join(", ")}`);
});

export default app;
