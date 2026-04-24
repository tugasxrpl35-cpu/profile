/**
 * Project Model
 * Defines the schema for individual projects in the portfolio
 */

import mongoose from "mongoose";

/**
 * Project Schema
 * @typedef {Object} Project
 * @property {string} title - Project title (required)
 * @property {string} short - Short description of the project
 * @property {string} details - Detailed description of the project
 * @property {string} link - URL to the project (e.g., GitHub, live demo)
 * @property {string} image - URL to project image (hosted on Cloudinary)
 * @property {Date} createdAt - Timestamp when document was created
 * @property {Date} updatedAt - Timestamp when document was last updated
 */
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  short: {
    type: String
  },
  details: {
    type: String
  },
  link: {
    type: String
  },
  image: {
    type: String,
    default: null // Cloudinary URL
  }
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);
export default Project;