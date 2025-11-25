import express from "express";
import {
  getAnnouncements,
  createAnnouncement,
} from "../controllers/announcementController.js";

const announcementRouter = express.Router();

announcementRouter.get("/", getAnnouncements);
announcementRouter.post("/", createAnnouncement);

export default announcementRouter;
