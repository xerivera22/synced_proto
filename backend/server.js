/* eslint-env node */
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

// Load environment variables from .env file
dotenv.config();

// Import routers
import announcementRouter from "./routes/announcementRouter.js";
import adminAuthRouter from "./routes/Authentication/adminAuthRouter.js";
import parentAuthRouter from "./routes/Authentication/parentAuthRouter.js";
import studentAuthRouter from "./routes/Authentication/studentAuthRouter.js";
import teacherAuthRouter from "./routes/Authentication/teacherAuthRouter.js";
import eventRouter from "./routes/eventRouter.js";
import facultyRecordRouter from "./routes/facultyRecordRouter.js";
import parentProfileRouter from "./routes/parentProfileRouter.js";
import paymentRecordRouter from "./routes/paymentRecordRouter.js";
import paymentSummaryRouter from "./routes/paymentSummaryRouter.js";
import sectionRouter from "./routes/sectionRouter.js";
import studentMetricsRouter from "./routes/studentMetricsRouter.js";
import studentProfileRouter from "./routes/studentProfileRouter.js";
import studentRecordRouter from "./routes/studentRecordRouter.js";
import subjectRouter from "./routes/subjectRouter.js";
import teacherProfileRouter from "./routes/teacherProfileRouter.js";

const app = express();
const PORT = process.env.PORT || 5000;

// =============================================================================
// ENVIRONMENT VALIDATION
// =============================================================================
const requiredEnvVars = ['MONGO_URI', 'CLIENT_URL'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
  console.error('Please check your .env file');
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
}

// =============================================================================
// GLOBAL ERROR HANDLERS
// =============================================================================
process.on("unhandledRejection", (reason, promise) => {
  console.error("🚨 Unhandled Promise Rejection:", reason);
  console.error("Promise:", promise);
});

process.on("uncaughtException", (err) => {
  console.error("🚨 Uncaught Exception:", err);
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
});

// =============================================================================
// DATABASE CONNECTION
// =============================================================================
connectDB();

// =============================================================================
// MIDDLEWARE CONFIGURATION
// =============================================================================

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS Configuration - Production Ready
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = process.env.CLIENT_URL.split(',').map(url => url.trim());
    
    // In development, allow localhost with any port
    if (process.env.NODE_ENV === 'development') {
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        return callback(null, true);
      }
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`⚠️  CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400, // 24 hours
};

app.use(cors(corsOptions));

// Request logging middleware (development only)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.path}`);
    next();
  });
}

// =============================================================================
// HEALTH CHECK & INFO ENDPOINTS
// =============================================================================

// Root endpoint - Primary health check for monitoring services
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "SyncED API Server is running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: {
      health: "/health",
      api: "/api",
      docs: "/api (for full endpoint list)",
    },
  });
});

// Lightweight healthcheck to verify server process is running
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// API info endpoint
app.get("/api", (req, res) => {
  res.json({
    message: "SyncED API",
    version: "1.0.0",
    environment: process.env.NODE_ENV,
    endpoints: {
      health: "/health",
      auth: "/api/auth/*",
      students: "/api/student-profiles",
      teachers: "/api/teacher-profiles",
      parents: "/api/parent-profiles",
      subjects: "/api/subjects",
      sections: "/api/sections",
      events: "/api/events",
      announcements: "/api/announcements",
    },
  });
});

// Use routers
app.use("/api/announcements", announcementRouter);
app.use("/api/student-metrics", studentMetricsRouter);
app.use("/api/student-records", studentRecordRouter);
app.use("/api/faculty-records", facultyRecordRouter);
app.use("/api/events", eventRouter);
app.use("/api/payment-summary", paymentSummaryRouter);
app.use("/api/payment-records", paymentRecordRouter);
app.use("/api/student-profiles", studentProfileRouter);
app.use("/api/teacher-profiles", teacherProfileRouter);
app.use("/api/parent-profiles", parentProfileRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/sections", sectionRouter);

app.use("/api/auth/admin", adminAuthRouter);
app.use("/api/auth/student", studentAuthRouter);
app.use("/api/auth/teacher", teacherAuthRouter);
app.use("/api/auth/parent", parentAuthRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Resource not found" });
});

// Basic error handler to ensure consistent responses
app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) {
    return next(error);
  }
  res.status(500).json({ message: "Internal server error" });
});

// =============================================================================
// START SERVER
// =============================================================================

app.listen(PORT, () => {
  console.log("\n" + "=".repeat(60));
  console.log("🚀 SyncED Backend Server");
  console.log("=".repeat(60));
  console.log(`📡 Server running on port: ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log(`💚 Health Check: http://localhost:${PORT}/health`);
  console.log(`🌐 CORS Allowed Origins: ${process.env.CLIENT_URL}`);
  console.log("=".repeat(60) + "\n");
});
