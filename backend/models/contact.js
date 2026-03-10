/**
 * Contact Model
 * Defines the schema for contact information
 */

const mongoose = require("mongoose");

/**
 * Contact Schema
 * @typedef {Object} Contact
 * @property {string} email - Email address (required)
 * @property {string} github - GitHub profile URL
 * @property {string} linkedin - LinkedIn profile URL
 * @property {string} twitter - Twitter profile URL
 * @property {Date} createdAt - Timestamp when document was created
 * @property {Date} updatedAt - Timestamp when document was last updated
 */
const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  github: {
    type: String
  },
  linkedin: {
    type: String
  },
  twitter: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);
