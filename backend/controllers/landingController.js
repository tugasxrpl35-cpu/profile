import Landing from "../models/landing.js";

// Create landing entry
export const createLanding = async (req, res) => {
  try {
    const newLanding = new Landing({
      greeting: req.body.greeting,
      role: req.body.role,
      description: req.body.description,
      profilePicture: req.body.profilePicture || null
    });

    const saved = await newLanding.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all landing entries (or latest)
export const getLanding = async (req, res) => {
  try {
    const entries = await Landing.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
