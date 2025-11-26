import TeacherProfile from "../../model/teacher_model/teacherProfile.js";

export const teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await TeacherProfile.findOne({
      "teacherInfo.email": email,
    });

    if (!teacher) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Simple password check (in real app, use bcrypt.compare)
    if (teacher.teacherInfo.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      teacher: teacher.teacherInfo,
      profile: teacher,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeacherProfile = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const teacher = await TeacherProfile.findOne({
      "teacherInfo.employeeId": employeeId,
    });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerTeacher = async (req, res) => {
  try {
    const { teacherInfo, emergencyContact } = req.body;

    // Check if teacher already exists
    const existingTeacher = await TeacherProfile.findOne({
      "teacherInfo.email": teacherInfo.email,
    });

    if (existingTeacher) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    const teacher = new TeacherProfile({
      teacherInfo,
      emergencyContact,
    });

    await teacher.save();
    res
      .status(201)
      .json({ message: "Teacher registered successfully", teacher });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
