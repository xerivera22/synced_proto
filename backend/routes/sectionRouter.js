import express from "express";
import {
  getSections,
  createSection,
  updateSection,
  deleteSection,
} from "../controllers/sectionController.js";

const sectionRouter = express.Router();

sectionRouter.get("/", getSections);
sectionRouter.post("/", createSection);
sectionRouter.put("/:id", updateSection);
sectionRouter.delete("/:id", deleteSection);

export default sectionRouter;
