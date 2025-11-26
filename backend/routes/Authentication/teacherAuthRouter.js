import express from "express";
import {
  getTeacherProfile,
  registerTeacher,
  teacherLogin,
} from "../../controllers/teacher/teacherAuthController.js";

const teacherAuthRouter = express.Router();

teacherAuthRouter.post("/login", teacherLogin);
teacherAuthRouter.post("/register", registerTeacher);
teacherAuthRouter.get("/profile/:employeeId", getTeacherProfile);

export default teacherAuthRouter;
