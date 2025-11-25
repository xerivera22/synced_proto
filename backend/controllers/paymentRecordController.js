import PaymentRecord from "../model/paymentRecord.js";

export const getPaymentRecords = async (req, res) => {
  try {
    const records = await PaymentRecord.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPaymentRecord = async (req, res) => {
  try {
    const record = new PaymentRecord(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
