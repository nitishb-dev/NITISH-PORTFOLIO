import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import contactRoutes from "./routes/contact.js";

const app = express();

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(
  cors({
    origin: [
      "https://nitishb.me", // Your custom domain for GitHub Pages
      "https://nitishb-dev.github.io", // Your default GitHub Pages domain
      "http://localhost:5173", // Your local development environment
    ],
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/contact", contactRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// REMOVE or COMMENT OUT app.listen() for Vercel deployment!
// app.listen(PORT, () => {
//   console.log(`🚀 Portfolio Backend running on port ${PORT}`);
//   console.log(`📧 Contact form available at: /api/contact`);
//   console.log(`❤️  Health check available at: /api/health`);
// });

export default app;
