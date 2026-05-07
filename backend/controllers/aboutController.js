/**
 * About Controller
 * Handles operations for the about section of the portfolio
 */

import About from "../models/about.js";

/**
 * Retrieve about section data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with about data or error
 */
export const getAbout = async (req, res) => {
  try {
const response = await fetch(process.env.DB_URL, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "DB_PW": process.env.DB_PW
  }
});

const text = await response.text();

console.log("STATUS:", response.status);
console.log("RESPONSE:", text);

if (!response.ok) {
  throw new Error(`HTTP ${response.status} - ${text}`);
}

    const aboutData = await response.json();

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
export const createAbout = async (req, res) => {
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