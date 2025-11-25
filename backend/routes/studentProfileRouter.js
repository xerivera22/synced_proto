import express from "express";
import {
  getStudentProfiles,
  createStudentProfile,
} from "../controllers/studentProfileController.js";

const studentProfileRouter = express.Router();

studentProfileRouter.get("/", getStudentProfiles);
studentProfileRouter.post("/", createStudentProfile);

export default studentProfileRouter;
