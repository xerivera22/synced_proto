import mongoose from "mongoose";

const studentRecordSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  gradeLevel: { type: String, required: true },
  section: { type: String, required: true },
  status: { type: String, required: true },
  enrollmentDate: { type: String, required: true },
  advisor: { type: String, required: true },
  gpa: { type: Number, required: true },
  alerts: { type: String },
});

const StudentRecord = mongoose.model(
  "StudentRecord",
  studentRecordSchema,
  "studentrecord"
);

export default StudentRecord;
