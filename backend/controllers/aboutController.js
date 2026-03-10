/**
 * About Controller
 * Handles operations for the about section of the portfolio
 */

const About = require("../models/about");

/**
 * Retrieve about section data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with about data or error
 */
exports.getAbout = async (req, res) => {
  try {
    const aboutData = await About.findOne().sort({ createdAt: -1 });
    
    if (!aboutData) {
      return res.json({
        subTitle: "",
        whoIam: "",
        experience: "",
        projects: "",
        skills: []
      });
    }
    
    res.json(aboutData);
  } catch (error) {
    console.error("Get about error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Create or update about section data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with saved about data or error
 */
exports.createAbout = async (req, res) => {
  try {
    const { subTitle, whoIam, experience, projects, skills } = req.body;

    // Create about data object
    const aboutData = {
      subTitle: subTitle || "",
      whoIam: whoIam || "",
      experience: experience || "",
      projects: projects || "",
      skills: skills || []
    };

    // Find and update existing, or create new
    const updated = await About.findOneAndUpdate(
      {},
      aboutData,
      { new: true, upsert: true, sort: { createdAt: -1 } }
    );

    res.status(201).json(updated);
  } catch (error) {
    console.error("Create about error:", error);
    res.status(400).json({ message: error.message });
  }
};