import express from "express";
import {
  getAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController.js";

const announcementRouter = express.Router();

announcementRouter.get("/", getAnnouncements);
announcementRouter.get("/:id", getAnnouncementById);
announcementRouter.post("/", createAnnouncement);
announcementRouter.put("/:id", updateAnnouncement);
announcementRouter.delete("/:id", deleteAnnouncement);

export default announcementRouter;
