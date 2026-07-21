import { Router } from "express";
import Application from "../models/Application.js";
import ContactMessage from "../models/ContactMessage.js";
import Subscriber from "../models/Subscriber.js";

const router = Router();

function isAdmin(req) {
  return (
    Boolean(process.env.ADMIN_PASSWORD) &&
    req.headers["x-admin-password"] === process.env.ADMIN_PASSWORD
  );
}

// GET /api/admin/applications
router.get("/applications", async (req, res) => {
  if (!isAdmin(req))
    return res.status(401).json({ message: "Incorrect admin password." });
  try {
    const data = await Application.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Couldn't fetch applications." });
  }
});

// GET /api/admin/contacts
router.get("/contacts", async (req, res) => {
  if (!isAdmin(req))
    return res.status(401).json({ message: "Incorrect admin password." });
  try {
    const data = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Couldn't fetch contact messages." });
  }
});

// GET /api/admin/subscribers
router.get("/subscribers", async (req, res) => {
  if (!isAdmin(req))
    return res.status(401).json({ message: "Incorrect admin password." });
  try {
    const data = await Subscriber.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Couldn't fetch subscribers." });
  }
});

export default router;
