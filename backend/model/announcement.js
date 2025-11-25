import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  target: { type: String, required: true },
  scheduledFor: { type: String, required: true },
  status: { type: String, required: true },
});

const Announcement = mongoose.model(
  "Announcement",
  announcementSchema,
  "announcement"
);

export default Announcement;
