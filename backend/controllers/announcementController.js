import Announcement from "../model/announcement.js";

// @desc    Get all announcements
// @route   GET /api/announcements
// @access  Public
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ scheduledFor: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single announcement by ID
// @route   GET /api/announcements/:id
// @access  Public
export const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new announcement
// @route   POST /api/announcements
// @access  Public (Admin)
export const createAnnouncement = async (req, res) => {
  try {
    const announcement = new Announcement(req.body);
    await announcement.save();
    res.status(201).json(announcement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an announcement
// @route   PUT /api/announcements/:id
// @access  Public (Admin)
export const updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedAnnouncement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an announcement
// @route   DELETE /api/announcements/:id
// @access  Public (Admin)
export const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
