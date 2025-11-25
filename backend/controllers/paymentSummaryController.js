import PaymentSummary from "../model/paymentSummary.js";

export const getPaymentSummary = async (req, res) => {
  try {
    const summary = await PaymentSummary.find();
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPaymentSummary = async (req, res) => {
  try {
    const summary = new PaymentSummary(req.body);
    await summary.save();
    res.status(201).json(summary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
