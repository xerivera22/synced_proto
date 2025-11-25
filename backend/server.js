/* eslint-env node */
import express from "express";
import connectDB from "./config/db.js";

// Import routers
import announcementRouter from "./routes/announcementRouter.js";
import studentMetricsRouter from "./routes/studentMetricsRouter.js";
import studentRecordRouter from "./routes/studentRecordRouter.js";
import facultyRecordRouter from "./routes/facultyRecordRouter.js";
import eventRouter from "./routes/eventRouter.js";
import paymentSummaryRouter from "./routes/paymentSummaryRouter.js";
import paymentRecordRouter from "./routes/paymentRecordRouter.js";
import studentProfileRouter from "./routes/studentProfileRouter.js";
import teacherProfileRouter from "./routes/teacherProfileRouter.js";
import subjectRouter from "./routes/subjectRouter.js";

const app = express();
const PORT = process.env.PORT || 3000;

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
