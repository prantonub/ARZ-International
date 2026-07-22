import mongoose from "mongoose";

const universitySchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      enum: ["south-korea", "uk", "australia", "europe"],
    },
    name: { type: String, required: true, trim: true },
    location: String,
    tag: String,
    image: String,
    description: String,
    requirements: [String],
    tuition: String,
    intake: String,
  },
  { timestamps: true },
);

const University = mongoose.model("University", universitySchema);

// Default Seed Function
export async function seedDefaultUniversities() {
  const defaultUKUniversities = [
    {
      country: "uk",
      name: "University of East London",
      location: "London, England",
      tag: "Popular",
      description:
        "A well-established London university known for strong industry links and a large international student community.",
      requirements: [
        "HSC/A-Levels with minimum GPA 2.5 (or equivalent)",
        "IELTS 6.0 overall, no band below 5.5",
        "Statement of Purpose (SOP)",
      ],
      tuition: "£13,000/yr",
      intake: "Sep & Jan",
    },
    {
      country: "uk",
      name: "Coventry University",
      location: "Coventry, England",
      tag: "Career-Focused",
      description:
        "Industry-aligned degrees with strong placement support across business, engineering and computing.",
      requirements: [
        "HSC/A-Levels or Bachelor's degree (for Master's)",
        "IELTS 6.0 overall (foundation route available for lower scores)",
        "Academic transcripts and SOP",
      ],
      tuition: "£16,500/yr",
      intake: "Sep, Jan & May",
    },
    {
      country: "uk",
      name: "University of Bedfordshire",
      location: "Luton, England",
      tag: "Affordable",
      description:
        "One of the more budget-friendly UK universities, with flexible entry requirements and scholarship options.",
      requirements: [
        "HSC/A-Levels with minimum GPA 2.5",
        "IELTS 6.0 overall, no band below 5.5",
        "Proof of funds for tuition and living costs",
      ],
      tuition: "£13,500/yr",
      intake: "Sep & Jan",
    },
    {
      country: "uk",
      name: "Cardiff Metropolitan University",
      location: "Cardiff, Wales",
      tag: "Business",
      description:
        "Strong reputation for business and management programs, with a compact, welcoming campus.",
      requirements: [
        "HSC/A-Levels or Bachelor's degree (for Master's)",
        "IELTS 6.0 overall",
        "Statement of Purpose (SOP)",
      ],
      tuition: "£13,000/yr",
      intake: "Sep & Jan",
    },
    {
      country: "uk",
      name: "University of Sunderland",
      location: "Sunderland, England",
      tag: "Scholarships",
      description:
        "Known for offering competitive international scholarships to eligible students across multiple programs.",
      requirements: [
        "HSC/A-Levels with minimum GPA 2.5",
        "IELTS 6.0 overall, no band below 5.5",
        "Academic transcripts and SOP",
      ],
      tuition: "£13,500/yr",
      intake: "Sep, Jan & May",
    },
    {
      country: "uk",
      name: "Ulster University",
      location: "Belfast, Northern Ireland",
      tag: "Research",
      description:
        "A research-intensive university offering strong postgraduate options across STEM and business.",
      requirements: [
        "Bachelor's degree with relevant coursework (for Master's)",
        "IELTS 6.0–6.5 depending on program",
        "Statement of Purpose (SOP)",
      ],
      tuition: "£15,500/yr",
      intake: "Sep & Jan",
    },
  ];

  try {
    const count = await University.countDocuments({ country: "uk" });
    if (count === 0) {
      await University.insertMany(defaultUKUniversities);
      console.log("✅ Default UK Universities seeded successfully!");
    }
  } catch (error) {
    console.error("Error seeding default UK universities:", error);
  }
}

export default University;
