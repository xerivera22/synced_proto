import express from "express";
import {
    createAnnouncement,
    deleteAnnouncement,
    getAnnouncementById,
    getAnnouncements,
    updateAnnouncement,
} from "../controllers/announcementController.js";

const announcementRouter = express.Router();

announcementRouter.get("/", getAnnouncements);
announcementRouter.get("/:id", getAnnouncementById);
announcementRouter.post("/", createAnnouncement);
announcementRouter.put("/:id", updateAnnouncement);
announcementRouter.delete("/:id", deleteAnnouncement);

export default announcementRouter;
