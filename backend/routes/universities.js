import { Router } from "express";
import University from "../models/University.js";
import { upload, uploadToCloudinary } from "../config/cloudinary.js";

const router = Router();

function isAdmin(req) {
  return (
    Boolean(process.env.ADMIN_PASSWORD) &&
    req.headers["x-admin-password"] === process.env.ADMIN_PASSWORD
  );
}

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

router.post("/", upload.single("image"), async (req, res) => {
  if (!isAdmin(req))
    return res.status(401).json({ message: "Incorrect admin password." });
  try {
    let imageUrl = req.body.image || "";

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const uniData = { ...req.body, image: imageUrl };
    const uni = await University.create(uniData);
    res.status(201).json(uni);
  } catch (err) {
    res.status(500).json({ message: "Couldn't create university." });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  if (!isAdmin(req))
    return res.status(401).json({ message: "Incorrect admin password." });
  try {
    let updateData = { ...req.body };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      updateData.image = result.secure_url;
    }

    const uni = await University.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!uni) return res.status(404).json({ message: "University not found." });
    res.json(uni);
  } catch (err) {
    res.status(500).json({ message: "Couldn't update university." });
  }
});

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
