import express from "express";
import {
  getTeacherProfiles,
  createTeacherProfile,
} from "../controllers/teacherProfileController.js";

const teacherProfileRouter = express.Router();

teacherProfileRouter.get("/", getTeacherProfiles);
teacherProfileRouter.post("/", createTeacherProfile);

export default teacherProfileRouter;
