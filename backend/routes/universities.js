import { Router } from "express";
import University from "../models/University.js";

const router = Router();

// Self-contained admin check — no separate file to import, so a typo or
// missing file can never crash the whole server the way it did before.
function isAdmin(req) {
  return (
    Boolean(process.env.ADMIN_PASSWORD) &&
    req.headers["x-admin-password"] === process.env.ADMIN_PASSWORD
  );
}

// GET /api/universities — public: every university, across all countries
// (used by the admin dashboard's own tables; not sensitive data — it's
// exactly what's already shown publicly on the country pages)
router.get("/", async (req, res) => {
  try {
    const universities = await University.find().sort({
      country: 1,
      createdAt: 1,
    });
    res.json(universities);
  } catch (err) {
    res.status(500).json({ message: "Couldn't fetch universities." });
  }
});

// GET /api/universities/:country — public: universities for one country
// (used by the South Korea / UK / Australia / Europe pages)
router.get("/:country", async (req, res) => {
  try {
    const universities = await University.find({
      country: req.params.country,
    }).sort({ createdAt: 1 });
    res.json(universities);
  } catch (err) {
    res.status(500).json({ message: "Couldn't fetch universities." });
  }
});

// POST /api/universities — admin only: create
router.post("/", async (req, res) => {
  if (!isAdmin(req))
    return res.status(401).json({ message: "Incorrect admin password." });
  try {
    const uni = await University.create(req.body);
    res.status(201).json(uni);
  } catch (err) {
    res.status(500).json({ message: "Couldn't create university." });
  }
});

// PUT /api/universities/:id — admin only: update
router.put("/:id", async (req, res) => {
  if (!isAdmin(req))
    return res.status(401).json({ message: "Incorrect admin password." });
  try {
    const uni = await University.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!uni) return res.status(404).json({ message: "University not found." });
    res.json(uni);
  } catch (err) {
    res.status(500).json({ message: "Couldn't update university." });
  }
});

// DELETE /api/universities/:id — admin only: delete
router.delete("/:id", async (req, res) => {
  if (!isAdmin(req))
    return res.status(401).json({ message: "Incorrect admin password." });
  try {
    const deleted = await University.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "University not found." });
    res.json({ message: "Deleted." });
  } catch (err) {
    res.status(500).json({ message: "Couldn't delete university." });
  }
});

export default router;
