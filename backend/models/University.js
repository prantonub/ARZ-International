import mongoose from "mongoose";

const universitySchema = new mongoose.Schema(
  {
    // Matches the route paths already used on the site.
    country: {
      type: String,
      required: true,
      enum: ["south-korea", "uk", "australia", "europe"],
    },
    name: { type: String, required: true, trim: true },
    location: String,
    tag: String,
    image: String, // URL — optional, falls back to a generic photo on the frontend
    description: String,
    requirements: [String],
    tuition: String,
    intake: String,
  },
  { timestamps: true },
);

export default mongoose.model("University", universitySchema);
