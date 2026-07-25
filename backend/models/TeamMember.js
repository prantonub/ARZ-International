import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    desk: { type: String, trim: true }, // e.g. "Dhaka HQ", "South Korea Desk"
    image: String, // photo URL — falls back to initials badge on the frontend if empty
    whatsapp: String,
    email: String,
    order: { type: Number, default: 0 }, // lower shows first
  },
  { timestamps: true },
);

export default mongoose.model("TeamMember", teamMemberSchema);
