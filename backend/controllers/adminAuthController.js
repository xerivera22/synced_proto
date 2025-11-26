
import Admin from "../model/admin.js";

// @desc    Register a new admin
// @route   POST /api/auth/admin/register
// @access  Public
const registerAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      res.status(400).json({ message: "Admin already exists" });
      return;
    }

    const admin = await Admin.create({
      name,
      email,
      password,
      role,
    });

    if (admin) {
      res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      });
    } else {
      res.status(400).json({ message: "Invalid admin data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth admin & get token
// @route   POST /api/auth/admin/login
// @access  Public
const authAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { registerAdmin, authAdmin };
