import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  audience: { type: String, required: true },
  status: { type: String, required: true },
});

// Use a `toJSON` transform to change `_id` to `id` and remove `__v`
eventSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Event = mongoose.model("Event", eventSchema, "event");

export default Event;
