import express from "express";
import {
  getStudentMetrics,
  createStudentMetrics,
} from "../controllers/studentMetricsController.js";

const studentMetricsRouter = express.Router();

studentMetricsRouter.get("/", getStudentMetrics);
studentMetricsRouter.post("/", createStudentMetrics);

export default studentMetricsRouter;
