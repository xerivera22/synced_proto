import bcrypt from "bcrypt";
import StudentProfile from "../model/student_model/studentProfile.js";

// @desc    Get all student profiles
// @route   GET /api/student-profiles
// @access  Public
export const getStudentProfiles = async (req, res) => {
  try {
    const profiles = await StudentProfile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single student profile by ID
// @route   GET /api/student-profiles/:id
// @access  Public
export const getStudentProfileById = async (req, res) => {
  try {
    const profile = await StudentProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Student profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new student profile
// @route   POST /api/student-profiles
// @access  Public
export const createStudentProfile = async (req, res) => {
  try {
    const { studentInfo, emergencyContact, achievements } = req.body;

    // Check if email already exists
    const existingEmail = await StudentProfile.findOne({
      "studentInfo.email": studentInfo.email,
    });
    if (existingEmail) {
      return res.status(400).json({ message: "A student with this email already exists" });
    }

    // Check if studentId already exists
    if (studentInfo.studentId) {
      const existingStudentId = await StudentProfile.findOne({
        "studentInfo.studentId": studentInfo.studentId,
      });
      if (existingStudentId) {
        return res.status(400).json({ message: "A student with this Student ID already exists" });
      }
    }

    // Hash password before saving
    if (studentInfo.password) {
      const salt = await bcrypt.genSalt(10);
      studentInfo.password = await bcrypt.hash(studentInfo.password, salt);
    }

    const profile = new StudentProfile({
      studentInfo,
      emergencyContact: emergencyContact || {},
      achievements: achievements || [],
    });

    const savedProfile = await profile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    console.error("Error creating student profile:", error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a student profile
// @route   PUT /api/student-profiles/:id
// @access  Public
export const updateStudentProfile = async (req, res) => {
  try {
    const { studentInfo, emergencyContact, achievements } = req.body;
    const studentId = req.params.id;

    // Check if student exists
    const existingProfile = await StudentProfile.findById(studentId);
    if (!existingProfile) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    // Check if email is being changed and if new email already exists
    if (studentInfo.email && studentInfo.email !== existingProfile.studentInfo.email) {
      const emailExists = await StudentProfile.findOne({
        "studentInfo.email": studentInfo.email,
        _id: { $ne: studentId },
      });
      if (emailExists) {
        return res.status(400).json({ message: "A student with this email already exists" });
      }
    }

    // Prepare update data
    const updateData = {
      studentInfo: {
        ...existingProfile.studentInfo.toObject(),
        ...studentInfo,
      },
    };

    // Hash password if provided
    if (studentInfo.password && studentInfo.password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      updateData.studentInfo.password = await bcrypt.hash(studentInfo.password, salt);
    } else {
      // Keep existing password
      updateData.studentInfo.password = existingProfile.studentInfo.password;
    }

    // Update emergency contact if provided
    if (emergencyContact) {
      updateData.emergencyContact = emergencyContact;
    }

    // Update achievements if provided
    if (achievements) {
      updateData.achievements = achievements;
    }

    const updatedProfile = await StudentProfile.findByIdAndUpdate(
      studentId,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating student profile:", error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a student profile
// @route   DELETE /api/student-profiles/:id
// @access  Public
export const deleteStudentProfile = async (req, res) => {
  try {
    const profile = await StudentProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    await StudentProfile.findByIdAndDelete(req.params.id);
    res.json({ message: "Student profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting student profile:", error);
    res.status(500).json({ message: error.message });
  }
};
