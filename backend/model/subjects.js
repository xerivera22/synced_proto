import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  subjectCode: { type: String, required: true },
  department: { type: String, required: true },
  schedules: { type: [String], required: true },
  sectionId: { type: String },
  sectionName: { type: String },
});

const Subject = mongoose.model("Subject", subjectSchema, "subjects");

export default Subject;
