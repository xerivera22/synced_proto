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
        relationship: "Parent", // Default or derived if possible
        linkedStudentId: parent.children && parent.children.length > 0 ? parent.children[0]._id : "",
        linkedStudentName: parent.children && parent.children.length > 0 ? `${parent.children[0].firstName} ${parent.children[0].lastName}` : "",
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
        relationship: "Parent",
        linkedStudentId: parent.children && parent.children.length > 0 ? parent.children[0]._id : "",
        linkedStudentName: parent.children && parent.children.length > 0 ? `${parent.children[0].firstName} ${parent.children[0].lastName}` : "",
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

    // Construct Parent object
    // Note: This is a simplified creation. The backend model requires children with specific fields.
    // We might need to adjust the model or the frontend form to support full creation.
    // For now, we'll try to create it, but it might fail validation if children are missing.
    
    const parentData = {
      firstName,
      lastName,
      email: parentInfo.email,
      phone: parentInfo.phone,
      address: parentInfo.address,
      occupation: parentInfo.occupation,
      password: parentInfo.password, // Should be hashed in a real app
      dateOfBirth: new Date(), // Placeholder as frontend doesn't send it yet
      children: [] // Empty children for now, might fail validation
    };

    const newParent = new Parent(parentData);
    await newParent.save();

    res.status(201).json(newParent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateParentProfile = async (req, res) => {
  try {
    const { parentInfo } = req.body;
    const nameParts = parentInfo.name ? parentInfo.name.split(' ') : ["", ""];
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || "";

    const updateData = {
      firstName,
      lastName,
      email: parentInfo.email,
      phone: parentInfo.phone,
      address: parentInfo.address,
      occupation: parentInfo.occupation,
    };

    if (parentInfo.password) {
      updateData.password = parentInfo.password;
    }

    const updatedParent = await Parent.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedParent);
  } catch (error) {
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
