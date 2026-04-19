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
*/
  module.exports = app;
}).catch(err => {
  console.error("Failed to connect to MongoDB:", err)
  process.exit(1)
})