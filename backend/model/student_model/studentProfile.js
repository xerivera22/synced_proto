import mongoose from "mongoose";

const emergencyContactSchema = new mongoose.Schema({
  name: String,
  relationship: String,
  phone: String,
  email: String,
});

const achievementSchema = new mongoose.Schema({
  title: String,
  semester: String,
  date: String,
  year: String,
  icon: String,
});

const studentInfoSchema = new mongoose.Schema({
  name: String,
  studentId: String,
  email: String,
  phone: String,
  address: String,
  dateOfBirth: String,
  enrollmentDate: String,
  expectedGraduation: String,
  major: String,
  minor: String,
  advisor: String,
  gpa: String,
  creditHours: String,
});

const studentProfileSchema = new mongoose.Schema({
  studentInfo: studentInfoSchema,
  emergencyContact: emergencyContactSchema,
  achievements: [achievementSchema],
});

const StudentProfile = mongoose.model(
  "StudentProfile",
  studentProfileSchema,
  "studentprofile"
);

export default StudentProfile;
