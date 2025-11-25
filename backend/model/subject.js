import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  section: { type: String, required: true },
  students: { type: Number, required: true },
});

const Subject = mongoose.model("Subject", subjectSchema, "subject");

export default Subject;
