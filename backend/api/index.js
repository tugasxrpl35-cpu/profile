
import express from "express";
import { connectDB } from "../lib/mongodb.js";

import portfolioRoutes from "./routes/portfolioRoutes.js";
/*
import projectRoutes from "./routes/projectRoutes.js";
import landingRoutes from "./routes/landingRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import footerRoutes from "./routes/footerRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
*/
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  await connectDB();
  res.json({ message: "API jalan 🚀" });
});

app.get("/users", async (req, res) => {
  await connectDB();

  const users = await global.mongoose.conn.collection("users").find().toArray();
  res.json(users);
});

app.use("/api/portfolio", portfolioRoutes);
/*
app.use("/api/projects", projectRoutes);
app.use("/api/landing", landingRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/contact", contactRoutes);
*/
export default app;