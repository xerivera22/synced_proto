import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  audience: { type: String, required: true },
  status: { type: String, required: true },
});

const Event = mongoose.model("Event", eventSchema, "event");

export default Event;
