import { Router } from "express";
import { body, validationResult } from "express-validator";
import Subscriber from "../models/Subscriber.js";

const router = Router();

// =======================================================
// POST /api/newsletter
// Subscribe to newsletter
// =======================================================
router.post(
  "/",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please provide a valid email")
      .normalizeEmail(),
  ],
  async (req, res) => {
    try {
      // Validation
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const email = req.body.email.toLowerCase();

      // Check existing subscriber
      const existing = await Subscriber.findOne({ email });

      if (existing) {
        return res.status(409).json({
          success: false,
          message: "This email is already subscribed.",
        });
      }

      // Create subscriber
      const subscriber = await Subscriber.create({ email });

      console.log(`✅ New subscriber: ${email}`);

      return res.status(201).json({
        success: true,
        message: "Successfully subscribed to the newsletter.",
        data: {
          id: subscriber._id,
          email: subscriber.email,
          subscribedAt: subscriber.createdAt,
        },
      });
    } catch (err) {
      console.error("Newsletter subscription error:", err);

      // MongoDB duplicate key error
      if (err.code === 11000) {
        return res.status(409).json({
          success: false,
          message: "This email is already subscribed.",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Something went wrong while subscribing.",
      });
    }
  },
);

// =======================================================
// GET /api/newsletter
// Get all subscribers (Admin)
// =======================================================
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
      .select("email createdAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (err) {
    console.error("Fetch subscribers error:", err);

    return res.status(500).json({
      success: false,
      message: "Couldn't fetch subscribers.",
    });
  }
});

// =======================================================
// DELETE /api/newsletter/:id
// Delete subscriber (Admin)
// =======================================================
router.delete("/:id", async (req, res) => {
  try {
    const subscriber = await Subscriber.findByIdAndDelete(req.params.id);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: "Subscriber not found.",
      });
    }

    console.log(`🗑️ Subscriber deleted: ${subscriber.email}`);

    return res.status(200).json({
      success: true,
      message: "Subscriber deleted successfully.",
    });
  } catch (err) {
    console.error("Delete subscriber error:", err);

    return res.status(500).json({
      success: false,
      message: "Couldn't delete subscriber.",
    });
  }
});

export default router;
