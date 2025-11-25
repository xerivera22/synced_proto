import express from "express";
import {
  getPaymentRecords,
  createPaymentRecord,
} from "../controllers/paymentRecordController.js";

const paymentRecordRouter = express.Router();

paymentRecordRouter.get("/", getPaymentRecords);
paymentRecordRouter.post("/", createPaymentRecord);

export default paymentRecordRouter;
