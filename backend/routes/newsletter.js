import { Router } from "express";
import Subscriber from "../models/Subscriber.js";

const router = Router();

// POST /api/newsletter — subscribe an email address
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "A valid email is required." });
    }

    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(200).json({ message: "You're already subscribed!" });
    }

    await Subscriber.create({ email });
    res.status(201).json({ message: "Subscribed!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong while subscribing." });
  }
});

// GET /api/newsletter — list subscribers
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: "Couldn't fetch subscribers." });
  }
});

export default router;
