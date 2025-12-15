import express from "express";
import {
    createStudentProfile,
    deleteStudentProfile,
    getStudentProfileById,
    getStudentProfiles,
    updateStudentProfile,
} from "../controllers/studentProfileController.js";

const studentProfileRouter = express.Router();

// GET all student profiles
studentProfileRouter.get("/", getStudentProfiles);

// GET single student profile by ID
studentProfileRouter.get("/:id", getStudentProfileById);

// POST create new student profile
studentProfileRouter.post("/", createStudentProfile);

// PUT update student profile
studentProfileRouter.put("/:id", updateStudentProfile);

// DELETE student profile
studentProfileRouter.delete("/:id", deleteStudentProfile);

export default studentProfileRouter;
