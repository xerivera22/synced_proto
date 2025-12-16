import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, default: "" },
  target: { type: String, required: true },
  scheduledFor: { type: String, required: true },
  status: { type: String, required: true },
  createdBy: { type: String, default: "" },
  authorRole: { type: String, enum: ["admin", "teacher"], default: "admin" },
  authorName: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const Announcement = mongoose.model(
  "Announcement",
  announcementSchema,
  "announcement"
);

export default Announcement;
