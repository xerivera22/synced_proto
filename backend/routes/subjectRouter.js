import express from "express";
import {
  getSubjects,
  createSubject,
} from "../controllers/subjectController.js";

const subjectRouter = express.Router();

subjectRouter.get("/", getSubjects);
subjectRouter.post("/", createSubject);

export default subjectRouter;
