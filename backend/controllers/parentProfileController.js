import Parent from "../model/parent_model/parentProfile.js";

export const getParentProfiles = async (req, res) => {
  try {
    const parents = await Parent.find();
    
    // Transform data to match frontend expectation (nested parentInfo)
    const transformedParents = parents.map(parent => ({
      _id: parent._id,
      parentInfo: {
        name: `${parent.firstName} ${parent.lastName}`,
        parentId: parent._id,
        email: parent.email,
        phone: parent.phone,
        address: parent.address,
        occupation: parent.occupation,
        relationship: parent.relationship || "Parent",
        linkedStudentId: parent.linkedStudentId || "",
        linkedStudentName: parent.linkedStudentName || "",
        // We don't send password back
      }
    }));

    res.json(transformedParents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getParentProfileById = async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id);
    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    const transformedParent = {
      _id: parent._id,
      parentInfo: {
        name: `${parent.firstName} ${parent.lastName}`,
        parentId: parent._id,
        email: parent.email,
        phone: parent.phone,
        address: parent.address,
        occupation: parent.occupation,
        relationship: parent.relationship || "Parent",
        linkedStudentId: parent.linkedStudentId || "",
        linkedStudentName: parent.linkedStudentName || "",
      }
    };

    res.json(transformedParent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createParentProfile = async (req, res) => {
  try {
    const { parentInfo } = req.body;
    
    // Split name into firstName and lastName
    const nameParts = parentInfo.name ? parentInfo.name.split(' ') : ["", ""];
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || "";

    // Check if email already exists
    const existingParent = await Parent.findOne({ email: parentInfo.email });
    if (existingParent) {
      return res.status(400).json({ message: "A parent with this email already exists" });
    }

   
    const parentData = {
      firstName,
      lastName,
      email: parentInfo.email,
      phone: parentInfo.phone,
      address: parentInfo.address || "Not provided",
      occupation: parentInfo.occupation || "Not provided",
      relationship: parentInfo.relationship || "Parent",
      password: parentInfo.password,
      dateOfBirth: parentInfo.dateOfBirth ? new Date(parentInfo.dateOfBirth) : new Date(),
      linkedStudentId: parentInfo.linkedStudentId || "",
      linkedStudentName: parentInfo.linkedStudentName || "",
      children: []
    };

    const newParent = new Parent(parentData);
    await newParent.save();

    res.status(201).json(newParent);
  } catch (error) {
    console.error("Error creating parent profile:", error);
    res.status(400).json({ message: error.message });
  }
};

export const updateParentProfile = async (req, res) => {
  try {
    const { parentInfo } = req.body;
    const parentId = req.params.id;

    // Check if parent exists
    const existingParent = await Parent.findById(parentId);
    if (!existingParent) {
      return res.status(404).json({ message: "Parent profile not found" });
    }

    const nameParts = parentInfo.name ? parentInfo.name.split(' ') : ["", ""];
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || "";

    // Check if email is being changed and if new email already exists
    if (parentInfo.email && parentInfo.email !== existingParent.email) {
      const emailExists = await Parent.findOne({
        email: parentInfo.email,
        _id: { $ne: parentId },
      });
      if (emailExists) {
        return res.status(400).json({ message: "A parent with this email already exists" });
      }
    }

    const updateData = {
      firstName,
      lastName,
      email: parentInfo.email,
      relationship: parentInfo.relationship || "Parent",
      linkedStudentId: parentInfo.linkedStudentId || "",
      linkedStudentName: parentInfo.linkedStudentName || "",
    };

    // Only update password if provided
    if (parentInfo.password && parentInfo.password.trim() !== "") {
      updateData.password = parentInfo.password;
    }phone: parentInfo.phone,
      address: parentInfo.address,
      occupation: parentInfo.occupation,
    };

    const updatedParent = await Parent.findByIdAndUpdate(parentId, updateData, { new: true });
    res.json(updatedParent);
  { catch (error) {
    console.error("Error updating parent profile:", error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteParentProfile = async (req, res) => {
  try {
    await Parent.findByIdAndDelete(req.params.id);
    res.json({ message: "Parent deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
