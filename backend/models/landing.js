/**
 * Landing Page Model
 * Defines the schema for the landing page section of the portfolio
 */

import mongoose from "mongoose";

/**
 * Landing Schema
 * @typedef {Object} Landing
 * @property {string} greeting - Welcome greeting text
 * @property {string} role - Professional role/title
 * @property {string} description - Brief description about the person
 * @property {string} profilePicture - URL to profile picture (hosted on Cloudinary)
 * @property {Date} createdAt - Timestamp when document was created
 * @property {Date} updatedAt - Timestamp when document was last updated
 */
const landingSchema = new mongoose.Schema(
  {
    greeting: { type: String },
    role: { type: String },
    description: { type: String },
    profilePicture: { type: String } // Cloudinary URL
  },
  { timestamps: true }
);

const Landing = mongoose.model("Landing", landingSchema);
export default Landing;
