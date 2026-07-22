import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CountryHero, UniversitiesGrid, ApplyModal } from "./CountryPageParts";
import { apiGet } from "../../config/api";
import ukImage from "../../assets/Uk.jpg";

// Generic campus imagery
const campusImages = [
  "https://images.unsplash.com/photo-1595685833450-b63451efcf01?q=80&w=1229&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1754262140581-91752fe8fe01?q=80&w=1171&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=700&q=80",
  "https://images.unsplash.com/photo-1598058921517-81a452bc7cce?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1586881141091-1014c7c2cb79?q=80&w=1168&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1627742162586-55f1eda05ae9?q=80&w=1170&auto=format&fit=crop",
];

// Emergency fallback data (যদি API/Database একদম বন্ধ থাকে)
const fallbackUniversities = [
  {
    _id: "default-1",
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
    _id: "default-2",
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
    _id: "default-3",
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
    _id: "default-4",
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
    _id: "default-5",
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
    _id: "default-6",
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

export default function Uk() {
  const navigate = useNavigate();
  const [showApply, setShowApply] = useState(false);
  const [universities, setUniversities] = useState(fallbackUniversities);

  useEffect(() => {
    window.scrollTo(0, 0);

    // API থেকে ডাইনামিক ডাটা আনা
    apiGet("/universities/uk")
      .then((data) => {
        // যদি ডাটাবেজে ডাটা থাকে, তবে সেটিই শো করবে (এডমিনের নতুন পরিবর্তনসহ)
        if (Array.isArray(data) && data.length > 0) {
          setUniversities(data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch from API, using fallback list:", err);
      });
  }, []);

  const openApply = () => setShowApply(true);

  return (
    <div className="bg-white min-h-screen">
      <CountryHero
        flag="gb"
        displayName="the United Kingdom"
        heroImage={ukImage}
        tagline="From centuries-old universities to modern career-focused programs, the UK offers a fast track to a globally respected degree — plus two years to work after you graduate."
        onApply={openApply}
        onContact={() => navigate("/contact")}
      />

      <UniversitiesGrid
        sectionTitle="Universities We Work With in the UK"
        universities={universities}
        campusImages={campusImages}
        onApply={openApply}
      />

      {showApply && <ApplyModal onClose={() => setShowApply(false)} />}
    </div>
  );
}
