import { Router } from "express";
import ContactMessage from "../models/ContactMessage.js";

const router = Router();

// POST /api/contact — submit the contact form
router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ message: "Name, email and message are required." });
        }

        const contact = await ContactMessage.create(req.body);
        res.status(201).json({ message: "Message received.", id: contact._id });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong while sending your message." });
    }
});

// GET /api/contact — list messages (basic admin/internal use)
router.get("/", async (req, res) => {
    try {
        const messages = await ContactMessage.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: "Couldn't fetch messages." });
    }
});

export default router;
