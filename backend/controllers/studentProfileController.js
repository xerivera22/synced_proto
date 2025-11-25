import StudentProfile from "../model/student_model/studentProfile.js";

export const getStudentProfiles = async (req, res) => {
  try {
    const profiles = await StudentProfile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStudentProfile = async (req, res) => {
  try {
    const profile = new StudentProfile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
