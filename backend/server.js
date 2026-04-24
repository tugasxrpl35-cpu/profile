
import express from "express";
import { connectDB } from "./lib/mongodb.js";


import projectRoutes from "./routes/projectRoutes.js";
import landingRoutes from "./routes/landingRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import footerRoutes from "./routes/footerRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ message: "API is running!" });
});

app.use("/api/projects", projectRoutes);
app.use("/api/landing", landingRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/portfolio", portfolioRoutes);

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected");

    app.listen(5000, () => {
      console.log("Local Server run in http://localhost:5000");
    });
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
};

startServer();