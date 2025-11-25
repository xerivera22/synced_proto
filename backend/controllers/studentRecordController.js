import StudentRecord from "../model/studentRecord.js";

export const getStudentRecords = async (req, res) => {
  try {
    const records = await StudentRecord.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStudentRecord = async (req, res) => {
  try {
    const record = new StudentRecord(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
