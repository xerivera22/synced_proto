import mongoose from "mongoose";

const emergencyContactSchema = new mongoose.Schema({
  name: String,
  relationship: String,
  phone: String,
  email: String,
});

const teacherInfoSchema = new mongoose.Schema({
  name: String,
  employeeId: String,
  email: String,
  phone: String,
  role: String,
  address: String,
  dateOfBirth: String,
  hiredDate: String,
  department: String,
  adviserOf: String,
  loadHours: String,
  password: { type: String, required: true },
});

const teacherProfileSchema = new mongoose.Schema({
  teacherInfo: teacherInfoSchema,
  emergencyContact: emergencyContactSchema,
});

const TeacherProfile = mongoose.model(
  "TeacherProfile",
  teacherProfileSchema,
  "teacherprofile"
);

export default TeacherProfile;
