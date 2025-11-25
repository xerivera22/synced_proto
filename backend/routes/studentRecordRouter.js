import express from "express";
import {
  getStudentRecords,
  createStudentRecord,
} from "../controllers/studentRecordController.js";

const studentRecordRouter = express.Router();

studentRecordRouter.get("/", getStudentRecords);
studentRecordRouter.post("/", createStudentRecord);

export default studentRecordRouter;
