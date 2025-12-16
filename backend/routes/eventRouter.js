import express from "express";
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const eventRouter = express.Router();

eventRouter.get("/", getEvents);
eventRouter.get("/:id", getEventById);
eventRouter.post("/", createEvent);
eventRouter.put("/:id", updateEvent);
eventRouter.delete("/:id", deleteEvent);

export default eventRouter;
