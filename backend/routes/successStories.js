import { Router } from "express";
import SuccessStory from "../models/SuccessStory.js";

const router = Router();

function isAdmin(req) {
  return (
    Boolean(process.env.ADMIN_PASSWORD) &&
    req.headers["x-admin-password"] === process.env.ADMIN_PASSWORD
  );
}

// GET /api/success-stories — public: used by the homepage
router.get("/", async (req, res) => {
  try {
    const stories = await SuccessStory.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: "Couldn't fetch success stories." });
  }
});

// POST /api/success-stories — admin only: create
router.post("/", async (req, res) => {
  if (!isAdmin(req))
    return res.status(401).json({ message: "Incorrect admin password." });
  try {
    const story = await SuccessStory.create(req.body);
    res.status(201).json(story);
  } catch (err) {
    res.status(500).json({ message: "Couldn't create success story." });
  }
});

// PUT /api/success-stories/:id — admin only: update
router.put("/:id", async (req, res) => {
  if (!isAdmin(req))
    return res.status(401).json({ message: "Incorrect admin password." });
  try {
    const story = await SuccessStory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!story)
      return res.status(404).json({ message: "Success story not found." });
    res.json(story);
  } catch (err) {
    res.status(500).json({ message: "Couldn't update success story." });
  }
});

// DELETE /api/success-stories/:id — admin only: delete
router.delete("/:id", async (req, res) => {
  if (!isAdmin(req))
    return res.status(401).json({ message: "Incorrect admin password." });
  try {
    const deleted = await SuccessStory.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Success story not found." });
    res.json({ message: "Deleted." });
  } catch (err) {
    res.status(500).json({ message: "Couldn't delete success story." });
  }
});

export default router;
