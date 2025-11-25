import mongoose from "mongoose";

const paymentSummarySchema = new mongoose.Schema({
  totalDueThisMonth: { type: Number, required: true },
  collectedThisMonth: { type: Number, required: true },
  overdueInvoices: { type: Number, required: true },
  scholarshipsGranted: { type: Number, required: true },
});

const PaymentSummary = mongoose.model(
  "PaymentSummary",
  paymentSummarySchema,
  "paymentsummary"
);

export default PaymentSummary;
