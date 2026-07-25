import { Router } from "express";
import TeamMember from "../models/TeamMember.js";

const router = Router();

function isAdmin(req) {
  return (
    Boolean(process.env.ADMIN_PASSWORD) &&
    req.headers["x-admin-password"] === process.env.ADMIN_PASSWORD
  );
}

// GET /api/team — public: used by the About page
router.get("/", async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ order: 1, createdAt: 1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: "Couldn't fetch team members." });
  }
});

// POST /api/team — admin only: create
router.post("/", async (req, res) => {
  if (!isAdmin(req))
    return res.status(401).json({ message: "Incorrect admin password." });
  try {
    const member = await TeamMember.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ message: "Couldn't add team member." });
  }
});

// PUT /api/team/:id — admin only: update
router.put("/:id", async (req, res) => {
  if (!isAdmin(req))
    return res.status(401).json({ message: "Incorrect admin password." });
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!member)
      return res.status(404).json({ message: "Team member not found." });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: "Couldn't update team member." });
  }
});

// DELETE /api/team/:id — admin only: delete
router.delete("/:id", async (req, res) => {
  if (!isAdmin(req))
    return res.status(401).json({ message: "Incorrect admin password." });
  try {
    const deleted = await TeamMember.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Team member not found." });
    res.json({ message: "Deleted." });
  } catch (err) {
    res.status(500).json({ message: "Couldn't delete team member." });
  }
});

export default router;
