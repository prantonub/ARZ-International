import mongoose from "mongoose";

const successStorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    university: { type: String, required: true, trim: true },
    city: String,
    country: { type: String, required: true, trim: true },
    flagCode: { type: String, required: true, trim: true }, // e.g. "kr", "gb", "au", "eu"
    course: String,
    tuition: String,
    intake: String,
    image: String, // URL
  },
  { timestamps: true },
);

export default mongoose.model("SuccessStory", successStorySchema);
