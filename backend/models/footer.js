/**
 * Footer Model
 * Defines the schema for the footer section of the portfolio
 */

import mongoose from "mongoose";

/**
 * Footer Schema
 * @typedef {Object} Footer
 * @property {string} title - Footer title text
 * @property {Array.<Object>} socialLinks - Array of social media links
 * @property {string} socialLinks[].name - Name of the social platform
 * @property {string} socialLinks[].url - URL to the social profile
 * @property {Date} createdAt - Timestamp when document was created
 * @property {Date} updatedAt - Timestamp when document was last updated
 */
const footerSchema = new mongoose.Schema(
  {
    title: { type: String },
    socialLinks: [{
      name: { type: String },
      url: { type: String }
    }]
  },
  { timestamps: true }
);

const Footer = mongoose.model("Footer", footerSchema);
export default Footer;
