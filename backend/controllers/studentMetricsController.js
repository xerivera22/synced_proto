import StudentMetrics from "../model/studentMetrics.js";

export const getStudentMetrics = async (req, res) => {
  try {
    const metrics = await StudentMetrics.find();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStudentMetrics = async (req, res) => {
  try {
    const metrics = new StudentMetrics(req.body);
    await metrics.save();
    res.status(201).json(metrics);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};