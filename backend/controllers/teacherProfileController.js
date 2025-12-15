import TeacherProfile from "../model/teacher_model/teacherProfile.js";
import bcrypt from "bcrypt";

// @desc    Get all teacher profiles
// @route   GET /api/teacher-profiles
// @access  Public
export const getTeacherProfiles = async (req, res) => {
  try {
    const profiles = await TeacherProfile.find();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single teacher profile by ID
// @route   GET /api/teacher-profiles/:id
// @access  Public
export const getTeacherProfileById = async (req, res) => {
  try {
    const profile = await TeacherProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Teacher profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new teacher profile
// @route   POST /api/teacher-profiles
// @access  Public
export const createTeacherProfile = async (req, res) => {
  try {
    const { teacherInfo, emergencyContact } = req.body;

    // Check if email already exists
    const existingTeacher = await TeacherProfile.findOne({
      "teacherInfo.email": teacherInfo.email,
    });
    if (existingTeacher) {
      return res.status(400).json({ message: "A teacher with this email already exists" });
    }

    // Check if employeeId already exists
    if (teacherInfo.employeeId) {
      const existingEmployeeId = await TeacherProfile.findOne({
        "teacherInfo.employeeId": teacherInfo.employeeId,
      });
      if (existingEmployeeId) {
        return res.status(400).json({ message: "A teacher with this Employee ID already exists" });
      }
    }

    // Hash password before saving
    if (teacherInfo.password) {
      const salt = await bcrypt.genSalt(10);
      teacherInfo.password = await bcrypt.hash(teacherInfo.password, salt);
    }

    const profile = new TeacherProfile({
      teacherInfo,
      emergencyContact: emergencyContact || {},
    });

    const savedProfile = await profile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    console.error("Error creating teacher profile:", error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a teacher profile
// @route   PUT /api/teacher-profiles/:id
// @access  Public
export const updateTeacherProfile = async (req, res) => {
  try {
    const { teacherInfo, emergencyContact } = req.body;
    const teacherId = req.params.id;

    // Check if teacher exists
    const existingProfile = await TeacherProfile.findById(teacherId);
    if (!existingProfile) {
      return res.status(404).json({ message: "Teacher profile not found" });
    }

    // Check if email is being changed and if new email already exists
    if (teacherInfo.email && teacherInfo.email !== existingProfile.teacherInfo.email) {
      const emailExists = await TeacherProfile.findOne({
        "teacherInfo.email": teacherInfo.email,
        _id: { $ne: teacherId },
      });
      if (emailExists) {
        return res.status(400).json({ message: "A teacher with this email already exists" });
      }
    }

    // Prepare update data
    const updateData = {
      teacherInfo: {
        ...existingProfile.teacherInfo.toObject(),
        ...teacherInfo,
      },
    };

    // Hash password if provided
    if (teacherInfo.password && teacherInfo.password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      updateData.teacherInfo.password = await bcrypt.hash(teacherInfo.password, salt);
    } else {
      // Keep existing password
      updateData.teacherInfo.password = existingProfile.teacherInfo.password;
    }

    // Update emergency contact if provided
    if (emergencyContact) {
      updateData.emergencyContact = emergencyContact;
    }

    const updatedProfile = await TeacherProfile.findByIdAndUpdate(
      teacherId,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating teacher profile:", error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a teacher profile
// @route   DELETE /api/teacher-profiles/:id
// @access  Public
export const deleteTeacherProfile = async (req, res) => {
  try {
    const profile = await TeacherProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Teacher profile not found" });
    }

    await TeacherProfile.findByIdAndDelete(req.params.id);
    res.json({ message: "Teacher profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting teacher profile:", error);
    res.status(500).json({ message: error.message });
  }
};
