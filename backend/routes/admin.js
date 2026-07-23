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

// DELETE /api/admin/applications/:id
router.delete("/applications/:id", async (req, res) => {
  if (!isAdmin(req))
    return res.status(401).json({ message: "Incorrect admin password." });
  try {
    const deleted = await Application.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Application not found." });
    res.json({ message: "Deleted." });
  } catch (err) {
    res.status(500).json({ message: "Couldn't delete application." });
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

// DELETE /api/admin/contacts/:id
router.delete("/contacts/:id", async (req, res) => {
  if (!isAdmin(req))
    return res.status(401).json({ message: "Incorrect admin password." });
  try {
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Contact message not found." });
    res.json({ message: "Deleted." });
  } catch (err) {
    res.status(500).json({ message: "Couldn't delete contact message." });
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

// DELETE /api/admin/subscribers/:id
router.delete("/subscribers/:id", async (req, res) => {
  if (!isAdmin(req))
    return res.status(401).json({ message: "Incorrect admin password." });
  try {
    const deleted = await Subscriber.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Subscriber not found." });
    res.json({ message: "Deleted." });
  } catch (err) {
    res.status(500).json({ message: "Couldn't delete subscriber." });
  }
});

export default router;
