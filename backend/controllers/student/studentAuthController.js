import StudentProfile from "../../model/student_model/studentProfile.js";

export const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for email:", email);

    const student = await StudentProfile.findOne({
      "studentInfo.email": email,
    });

    console.log(
      "Found student:",
      student ? student.studentInfo.name : "No student found"
    );

    if (!student) {
      console.log("No student found with email:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Simple password check
    if (student.studentInfo.password !== password) {
      console.log("Password mismatch for student:", student.studentInfo.name);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("Login successful for:", student.studentInfo.name);
    res.json({
      message: "Login successful",
      student: student.studentInfo,
      profile: student,
    });
  } catch (error) {
    console.error("Login error:", error);
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
