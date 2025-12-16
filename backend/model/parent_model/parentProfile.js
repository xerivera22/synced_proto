import mongoose from "mongoose";

const childSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    gradeLevel: {
      type: String,
      required: true,
    },
    schoolName: {
      type: String,
      required: true,
    },
  },
  { _id: true }
);

const parentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    relationship: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "parent",
      enum: ["parent"],
    },
    linkedStudentId: {
      type: String,
      required: true,
    },
    linkedStudentName: {
      type: String,
      required: true,
    },
    children: [childSchema],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

const Parent = mongoose.model("Parent", parentSchema, "parents");

export default Parent;
