import { Router } from "express";
import HomepageImage from "../models/HomepageImage.js";

const router = Router();

function isAdmin(req) {
  return (
    Boolean(process.env.ADMIN_PASSWORD) &&
    req.headers["x-admin-password"] === process.env.ADMIN_PASSWORD
  );
}

// GET /api/homepage-images — public: used by the homepage hero slideshow
router.get("/", async (req, res) => {
  try {
    const images = await HomepageImage.find().sort({ order: 1, createdAt: 1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Couldn't fetch homepage images." });
  }
});

// POST /api/homepage-images — admin only: create
router.post("/", async (req, res) => {
  if (!isAdmin(req))
    return res.status(401).json({ message: "Incorrect admin password." });
  try {
    const image = await HomepageImage.create(req.body);
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ message: "Couldn't add image." });
  }
});

// PUT /api/homepage-images/:id — admin only: update
router.put("/:id", async (req, res) => {
  if (!isAdmin(req))
    return res.status(401).json({ message: "Incorrect admin password." });
  try {
    const image = await HomepageImage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!image) return res.status(404).json({ message: "Image not found." });
    res.json(image);
  } catch (err) {
    res.status(500).json({ message: "Couldn't update image." });
  }
});

// DELETE /api/homepage-images/:id — admin only: delete
router.delete("/:id", async (req, res) => {
  if (!isAdmin(req))
    return res.status(401).json({ message: "Incorrect admin password." });
  try {
    const deleted = await HomepageImage.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Image not found." });
    res.json({ message: "Deleted." });
  } catch (err) {
    res.status(500).json({ message: "Couldn't delete image." });
  }
});

export default router;
