import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  sectionName: { type: String, required: true },
  sectionCode: { type: String, required: true },
  instructorId: { type: String, required: true }, // employeeId from teacher
  instructorName: { type: String, required: true }, // teacher's name
  room: { type: String, required: true },
  schedule: { type: [String], required: true }, // Array of schedule strings like "Monday 9:00-10:30"
  maxStudents: { type: Number, required: true },
  enrolledStudents: { type: [String], default: [] }, // Array of student IDs
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive", "full"],
    default: "active",
  },
});

const Section = mongoose.model("Section", sectionSchema, "sections");

export default Section;
