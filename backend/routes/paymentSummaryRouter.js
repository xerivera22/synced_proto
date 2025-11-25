import express from "express";
import {
  getPaymentSummary,
  createPaymentSummary,
} from "../controllers/paymentSummaryController.js";

const paymentSummaryRouter = express.Router();

paymentSummaryRouter.get("/", getPaymentSummary);
paymentSummaryRouter.post("/", createPaymentSummary);

export default paymentSummaryRouter;
