import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/db";

const app = express();
import cors from "cors";
const PORT = process.env.PORT || 5000;

console.log("\n=== Starting Backend Server ===");
console.log("Port:", PORT);

// Connect to MongoDB database
connectDB().then(() => {
  // Middleware for parsing JSON and URL-encoded data
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Enable CORS for cross-origin requests from the frontend
  app.use(cors());

  // Root endpoint to check API status
  app.get("/", (req, res) => {
    res.json({
      status: "API running",
      service: "portfolio-backend"
    });
  });

  // API routes
  import portfolioRoutes from "./routes/portfolioRoutes.js";
  import projectRoutes from "./routes/projectRoutes.js";
  import landingRoutes from "./routes/landingRoutes.js";
  import aboutRoutes from "./routes/aboutRoutes.js";
  import footerRoutes from "./routes/footerRoutes.js";
  import contactRoutes from "./routes/contactRoutes.js";
  app.use("/api/portfolio", portfolioRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/landing", landingRoutes);
  app.use("/api/about", aboutRoutes);
  app.use("/api/footer", footerRoutes);
  app.use("/api/contact", contactRoutes);

  // Export the app for serverless deployment (e.g., Vercel)
  // Uncomment the following lines for local development:
  /*
  app.listen(5000, () => {
    console.log("Server running at http://localhost:5000")
  })
*/
  module.exports = app;
}).catch(err => {
  console.error("Failed to connect to MongoDB:", err)
  process.exit(1)
})


/*
require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const connectDB = require("./config/db")

const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 5000

console.log("\n=== Starting Backend Server ===")
console.log("Port:", PORT)

// Connect to MongoDB database
connectDB().then(() => {
  // Middleware for parsing JSON and URL-encoded data
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  // Enable CORS for cross-origin requests from the frontend
  app.use(cors())

  // Root endpoint to check API status
  app.get("/", (req, res) => {
    res.json({
      status: "API running",
      service: "portfolio-backend"
    })
  })

  // API routes
  app.use("/api/portfolio", require("./routes/portfolioRoutes"))
  app.use("/api/projects", require("./routes/projectRoutes"))
  app.use("/api/landing", require("./routes/landingRoutes"))
  app.use("/api/about", require("./routes/aboutRoutes"))
  app.use("/api/footer", require("./routes/footerRoutes"))
  app.use("/api/contact", require("./routes/contactRoutes"))

  // Export the app for serverless deployment (e.g., Vercel)
  // Uncomment the following lines for local development:
  /*
  app.listen(5000, () => {
    console.log("Server running at http://localhost:5000")
  })

  module.exports = app;
}).catch(err => {
  console.error("Failed to connect to MongoDB:", err)
  process.exit(1)
})*/
