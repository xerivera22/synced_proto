import express from "express";
import {
  getFacultyRecords,
  createFacultyRecord,
} from "../controllers/facultyRecordController.js";

const facultyRecordRouter = express.Router();

facultyRecordRouter.get("/", getFacultyRecords);
facultyRecordRouter.post("/", createFacultyRecord);

export default facultyRecordRouter;
