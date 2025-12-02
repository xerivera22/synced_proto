import Section from "../model/section.js";

export const getSections = async (req, res) => {
  try {
    const sections = await Section.find();
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSection = async (req, res) => {
  try {
    const section = new Section(req.body);
    await section.save();
    res.status(201).json(section);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await Section.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(section);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;
    await Section.findByIdAndDelete(id);
    res.json({ message: "Section deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
