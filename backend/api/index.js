import express from "express";
import { connectDB } from "../lib/mongodb.js";
import cors from "cors";

import projectRoutes from "../routes/projectRoutes.js";
import landingRoutes from "../routes/landingRoutes.js";
import aboutRoutes from "../routes/aboutRoutes.js";
import footerRoutes from "../routes/footerRoutes.js";
import contactRoutes from "../routes/contactRoutes.js";

const app = express();

app.use(express.json());

await connectDB();
console.log("Database connected");

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
    "https://nugiprofile.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use("/api/projects", projectRoutes);
app.use("/api/landing", landingRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/contact", contactRoutes);

export default app;