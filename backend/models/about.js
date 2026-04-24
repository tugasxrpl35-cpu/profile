/**
 * About Section Model
 * Defines the schema for the about section of the portfolio
 */

import mongoose from "mongoose";

/**
 * About Schema
 * @typedef {Object} About
 * @property {string} subTitle - Subtitle for the about section
 * @property {string} whoIam - Description of who the person is
 * @property {string} experience - Professional experience description
 * @property {string} projects - Projects experience description
 * @property {Array.<Object>} skills - Array of skills with name and proficiency level
 * @property {string} skills[].name - Name of the skill
 * @property {number} skills[].level - Proficiency level (0-100)
 * @property {Date} createdAt - Timestamp when document was created
 * @property {Date} updatedAt - Timestamp when document was last updated
 */
const aboutSchema = new mongoose.Schema(
  {
    subTitle: { type: String },
    whoIam: { type: String },
    experience: { type: String },
    projects: { type: String },
    skills: [{
      name: { type: String },
      level: { type: Number, default: 0 }
    }]
  },
  { timestamps: true }
);

const About = mongoose.model("About", aboutSchema);
export default About;
