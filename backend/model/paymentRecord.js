import mongoose from "mongoose";

const paymentRecordSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  student: { type: String, required: true },
  gradeLevel: { type: String, required: true },
  amountDue: { type: Number, required: true },
  amountPaid: { type: Number, required: true },
  dueDate: { type: String, required: true },
  status: { type: String, required: true },
});

const PaymentRecord = mongoose.model(
  "PaymentRecord",
  paymentRecordSchema,
  "paymentrecord"
);

export default PaymentRecord;
