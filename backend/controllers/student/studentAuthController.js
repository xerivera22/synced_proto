import StudentProfile from "../../model/student_model/studentProfile.js";

export const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await StudentProfile.findOne({
      "studentInfo.email": email,
    });

    if (!student) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Simple password check
    if (student.studentInfo.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      student: student.studentInfo,
      profile: student,
    });
    console.log(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentProfile = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await StudentProfile.findOne({
      "studentInfo.studentId": studentId,
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerStudent = async (req, res) => {
  try {
    const { studentInfo, emergencyContact, achievements } = req.body;

    // Check if student already exists
    const existingStudent = await StudentProfile.findOne({
      "studentInfo.email": studentInfo.email,
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student already exists",
      });
    }

    const student = new StudentProfile({
      studentInfo,
      emergencyContact,
      achievements,
    });

    await student.save();
    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      student,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
