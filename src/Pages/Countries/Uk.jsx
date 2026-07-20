import { useNavigate, useLocation } from "react-router-dom";
import { goToApplicationForm } from "../../utils/scrollToForm";
import ukImage from "../../assets/Uk.jpg";

// ── University data ──────────────────────────────────────────────────
// Structured so this array can later be swapped for data fetched from
// the admin-managed backend (name, image, requirements, etc. would come
// from MongoDB instead of being hardcoded here).
const universities = [
  {
    id: 1,
    name: "University of East London",
    location: "London, England",
    tag: "Popular",
    image: null, // future: admin-uploaded photo URL
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
    id: 2,
    name: "Coventry University",
    location: "Coventry, England",
    tag: "Career-Focused",
    image: null,
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
    id: 3,
    name: "University of Bedfordshire",
    location: "Luton, England",
    tag: "Affordable",
    image: null,
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
    id: 4,
    name: "Cardiff Metropolitan University",
    location: "Cardiff, Wales",
    tag: "Business",
    image: null,
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
    id: 5,
    name: "University of Sunderland",
    location: "Sunderland, England",
    tag: "Scholarships",
    image: null,
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
    id: 6,
    name: "Ulster University",
    location: "Belfast, Northern Ireland",
    tag: "Research",
    image: null,
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

function UniversityCard({ uni, onApply }) {
  const initials =
    uni.name
      .split(" ")
      .filter((w) => w[0] === w[0]?.toUpperCase() && w.length > 2)
      .slice(0, 2)
      .map((w) => w[0])
      .join("") || uni.name.slice(0, 2).toUpperCase();

  return (
    <div
      className="rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ border: "1px solid #eef0f8" }}
    >
      {/* Image / placeholder banner */}
      <div
        className="relative h-36 flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #1a2a6c, #2b3d8f)" }}
      >
        {uni.image ? (
          <img
            src={uni.image}
            alt={uni.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-display font-black text-3xl text-white/90 tracking-wide">
            {initials}
          </span>
        )}
        <span
          className="absolute top-3 right-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full"
          style={{ background: "#fdf3e2", color: "#a4863a" }}
        >
          {uni.tag}
        </span>
      </div>

      <div className="p-5">
        <h3
          className="font-display font-bold text-lg"
          style={{ color: "#1a2a6c" }}
        >
          {uni.name}
        </h3>
        <p className="text-xs mt-0.5" style={{ color: "#888" }}>
          {uni.location}
        </p>

        <p className="text-sm mt-3 leading-relaxed" style={{ color: "#555" }}>
          {uni.description}
        </p>

        <div className="mt-4 pt-4" style={{ borderTop: "1px solid #f0f2f8" }}>
          <p
            className="text-xs font-bold uppercase tracking-wide mb-2"
            style={{ color: "#c9a84c" }}
          >
            Requirements
          </p>
          <ul className="space-y-1.5">
            {uni.requirements.map((r) => (
              <li
                key={r}
                className="flex items-start gap-2 text-xs"
                style={{ color: "#555" }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0f6e56"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 mt-0.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="flex items-center justify-between mt-4 pt-4"
          style={{ borderTop: "1px solid #f0f2f8" }}
        >
          <div>
            <div className="text-xs" style={{ color: "#999" }}>
              Tuition
            </div>
            <div className="text-sm font-bold" style={{ color: "#1a2a6c" }}>
              {uni.tuition}
            </div>
          </div>
          <div>
            <div className="text-xs" style={{ color: "#999" }}>
              Intake
            </div>
            <div className="text-sm font-bold" style={{ color: "#1a2a6c" }}>
              {uni.intake}
            </div>
          </div>
        </div>

        <button
          onClick={onApply}
          className="w-full mt-4 py-2.5 rounded-full text-xs font-bold text-white border-none cursor-pointer transition-colors"
          style={{ background: "#b01c2e" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#8e1422")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#b01c2e")}
        >
          Apply Now →
        </button>
      </div>
    </div>
  );
}

export default function Uk() {
  const navigate = useNavigate();
  const location = useLocation();
  const applyNow = () => goToApplicationForm(navigate, location.pathname);

  return (
    <div className="bg-white">
      {/* SECTION 1 — HERO */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={ukImage}
            alt="Study in the United Kingdom"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, rgba(16,26,71,0.92), rgba(26,42,108,0.75))",
            }}
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <img
              src="https://flagcdn.com/w40/gb.png"
              alt=""
              className="w-5 h-3.5 rounded-sm object-cover"
            />
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              Study Destination
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white max-w-2xl mb-5 leading-tight">
            Study in{" "}
            <span style={{ color: "#e0c477" }}>the United Kingdom</span>
          </h1>
          <p className="text-slate-200 max-w-xl mb-8 leading-relaxed">
            From centuries-old universities to modern career-focused programs,
            the UK offers a fast track to a globally respected degree — plus two
            years to work after you graduate.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={applyNow}
              className="px-7 py-3 rounded-full text-sm font-bold text-white border-none cursor-pointer"
              style={{ background: "#b01c2e" }}
            >
              Apply Now →
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="px-7 py-3 rounded-full text-sm font-bold text-white border-2 border-white bg-transparent cursor-pointer"
            >
              Free Counseling
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2 — TOP UNIVERSITIES */}
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3 text-center"
          style={{ color: "#c9a84c" }}
        >
          Top Universities
        </p>
        <h2
          className="font-display text-2xl md:text-3xl font-bold mb-3 text-center"
          style={{ color: "#1a2a6c" }}
        >
          Universities We Work With in the UK
        </h2>
        <p
          className="text-center max-w-xl mx-auto mb-12"
          style={{ color: "#666" }}
        >
          Entry requirements, tuition and intake at a glance — apply directly to
          the one that fits you.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni) => (
            <UniversityCard key={uni.id} uni={uni} onApply={applyNow} />
          ))}
        </div>
      </div>

      {/* Closing CTA */}
      <div className="px-6 py-16 text-center" style={{ background: "#f8f9ff" }}>
        <h2
          className="font-display text-2xl md:text-3xl font-bold mb-4"
          style={{ color: "#1a2a6c" }}
        >
          Not Sure Which University Fits You?
        </h2>
        <p className="mb-7" style={{ color: "#666" }}>
          Book a free counseling session and we'll help you shortlist the right
          one.
        </p>
        <button
          onClick={() => navigate("/contact")}
          className="px-8 py-3.5 rounded-full text-sm font-bold text-white border-none cursor-pointer"
          style={{ background: "#b01c2e" }}
        >
          Free Counseling
        </button>
      </div>
    </div>
  );
}
