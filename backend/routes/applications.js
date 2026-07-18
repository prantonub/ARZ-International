import { Router } from "express";
import Application from "../models/Application.js";

const router = Router();

// POST /api/applications — submit a new student application
router.post("/", async (req, res) => {
    try {
        const { fullName, phone, email } = req.body;
        if (!fullName || !phone || !email) {
            return res.status(400).json({ message: "Full name, phone and email are required." });
        }

        const application = await Application.create(req.body);
        res.status(201).json({ message: "Application received.", id: application._id });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong while saving your application." });
    }
});

// GET /api/applications — list applications (basic admin/internal use)
router.get("/", async (req, res) => {
    try {
        const applications = await Application.find().sort({ createdAt: -1 });
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: "Couldn't fetch applications." });
    }
});

export default router;
