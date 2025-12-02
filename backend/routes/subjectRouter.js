import express from "express";
import {
  getSubjects,
  createSubject,
  getSubject,
} from "../controllers/subjectController.js";

const subjectRouter = express.Router();

subjectRouter.get("/", getSubjects);
subjectRouter.get("/:id", getSubject);
subjectRouter.post("/", createSubject);

export default subjectRouter;
