import express from "express";
import {
  getStudentProfile,
  registerStudent,
  studentLogin,
} from "../../controllers/student/studentAuthController.js";

const studentAuthRouter = express.Router();

studentAuthRouter.post("/login", studentLogin);
studentAuthRouter.post("/register", registerStudent);
studentAuthRouter.get("/profile/:studentId", getStudentProfile);

export default studentAuthRouter;
