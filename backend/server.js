/* eslint-env node */
import express from "express";
import connectDB from "./config/db.js";

// Import routers
import announcementRouter from "./routes/announcementRouter.js";
import adminAuthRouter from "./routes/Authentication/adminAuthRouter.js";
import studentAuthRouter from "./routes/Authentication/studentAuthRouter.js";
import teacherAuthRouter from "./routes/Authentication/teacherAuthRouter.js";
import eventRouter from "./routes/eventRouter.js";
import facultyRecordRouter from "./routes/facultyRecordRouter.js";
import paymentRecordRouter from "./routes/paymentRecordRouter.js";
import paymentSummaryRouter from "./routes/paymentSummaryRouter.js";
import studentMetricsRouter from "./routes/studentMetricsRouter.js";
import studentProfileRouter from "./routes/studentProfileRouter.js";
import studentRecordRouter from "./routes/studentRecordRouter.js";
import subjectRouter from "./routes/subjectRouter.js";
import teacherProfileRouter from "./routes/teacherProfileRouter.js";
import sectionRouter from "./routes/sectionRouter.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Global error handlers to aid debugging and avoid hard exits during dev
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Promise Rejection:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

connectDB();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.sendStatus(204);
  }
  next();
});

// Lightweight healthcheck to verify server process is running
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
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
app.use("/api/subjects", subjectRouter);
app.use("/api/sections", sectionRouter);

app.use("/api/auth/admin", adminAuthRouter);
app.use("/api/auth/student", studentAuthRouter);
app.use("/api/auth/teacher", teacherAuthRouter);

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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
