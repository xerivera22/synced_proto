import express from "express";
import {
    createSubject,
    deleteSubject,
    getSubject,
    getSubjects,
    updateSubject,
} from "../controllers/subjectController.js";

const subjectRouter = express.Router();

subjectRouter.get("/", getSubjects);
subjectRouter.get("/:id", getSubject);
subjectRouter.post("/", createSubject);
subjectRouter.put("/:id", updateSubject);
subjectRouter.delete("/:id", deleteSubject);

export default subjectRouter;
