import Parent from "../../model/parent_model/parentProfile.js";

export const parentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Parent login attempt for email:", email);

    const parent = await Parent.findOne({
      email: email,
    });

    console.log(
      "Found parent:",
      parent ? parent.firstName + " " + parent.lastName : "No parent found"
    );

    if (!parent) {
      console.log("No parent found with email:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Simple password check
    if (parent.password !== password) {
      console.log(
        "Password mismatch for parent:",
        parent.firstName + " " + parent.lastName
      );
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log(
      "Login successful for parent:",
      parent.firstName + " " + parent.lastName
    );
    res.json({
      message: "Login successful",
      parent: parent,
      children: parent.children || [],
    });
  } catch (error) {
    console.error("Parent login error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getParentProfile = async (req, res) => {
  try {
    const { parentId } = req.params;

    const parent = await Parent.findById(parentId);

    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    res.json(parent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerParent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      dateOfBirth,
      occupation,
      password,
      children,
    } = req.body;

    // Check if parent already exists
    const existingParent = await Parent.findOne({
      email: email,
    });

    if (existingParent) {
      return res.status(400).json({
        success: false,
        message: "Parent already exists",
      });
    }

    const parent = new Parent({
      firstName,
      lastName,
      email,
      phone,
      address,
      dateOfBirth,
      occupation,
      password,
      children: children || [],
    });

    await parent.save();
    res.status(201).json({
      success: true,
      message: "Parent registered successfully",
      parent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
