import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

import applicationRoutes from "./routes/applications.js";
import contactRoutes from "./routes/contact.js";
import newsletterRoutes from "./routes/newsletter.js";

import dns from 'dns';
// Change DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((o) => o.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api/applications", applicationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);

// 404 fallback for unknown API routes
app.use("/api", (req, res) => res.status(404).json({ message: "Not found" }));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`✔ ARZ International API running on http://localhost:${PORT}`));
});
