import express from "express";
import cors from "cors";

import projectRoutes from "../routes/projectRoutes.js";
import landingRoutes from "../routes/landingRoutes.js";
import aboutRoutes from "../routes/aboutRoutes.js";
import footerRoutes from "../routes/footerRoutes.js";
import contactRoutes from "../routes/contactRoutes.js";
import portfolioRoutes from "../routes/portfolioRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is running!" });
});

app.get("/users", async (req, res) => {
  const users = await global.mongoose.conn
    .collection("users")
    .find()
    .toArray();

  res.json(users);
});

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5000",
    "https://nugiprofile.netlify.app",
    "https://nugi-profile.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use("/api/projects", projectRoutes);
app.use("/api/landing", landingRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/portfolio", portfolioRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
})

//export default app;