import mongoose from "mongoose";

const facultyRecordSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  subjects: { type: Number, required: true },
  contact: { type: String, required: true },
});

const FacultyRecord = mongoose.model(
  "FacultyRecord",
  facultyRecordSchema,
  "facultyrecord"
);

export default FacultyRecord;
