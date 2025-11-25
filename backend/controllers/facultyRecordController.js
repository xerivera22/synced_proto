import FacultyRecord from "../model/facultyRecord.js";

export const getFacultyRecords = async (req, res) => {
  try {
    const records = await FacultyRecord.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFacultyRecord = async (req, res) => {
  try {
    const record = new FacultyRecord(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
