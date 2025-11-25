import TeacherProfile from "../model/teacher_model/teacherProfile.js";

export const getTeacherProfiles = async (req, res) => {
  try {
    const profiles = await TeacherProfile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTeacherProfile = async (req, res) => {
  try {
    const profile = new TeacherProfile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
