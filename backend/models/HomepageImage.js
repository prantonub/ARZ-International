import mongoose from "mongoose";

const homepageImageSchema = new mongoose.Schema(
  {
    image: { type: String, required: true }, // URL
    caption: String, // optional, for admin's own reference — not required by the frontend
    order: { type: Number, default: 0 }, // lower shows first in the slideshow
  },
  { timestamps: true },
);

export default mongoose.model("HomepageImage", homepageImageSchema);
