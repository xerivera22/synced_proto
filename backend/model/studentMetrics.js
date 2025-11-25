import mongoose from "mongoose";

const studentMetricsSchema = new mongoose.Schema({
  totalStudents: { type: Number, required: true },
  activeStudents: { type: Number, required: true },
  pendingEnrollments: { type: Number, required: true },
  inactiveStudents: { type: Number, required: true },
  averageGPA: { type: Number, required: true },
});

const StudentMetrics = mongoose.model(
  "StudentMetrics",
  studentMetricsSchema,
  "studentmetrics"
);

export default StudentMetrics;
