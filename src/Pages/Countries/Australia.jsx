import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationForm from "../../Form/ApplicationForm";
import australiaImage from "../../assets/southkoria_main.png";

// Generic campus imagery — clean placeholder university pictures
const campusImages = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1692776691970-39dc4edfd870?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542404937-2132aa1fa6fc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

// ── University data ──────────────────────────────────────────────────
// Structured so this array can later be swapped for data fetched from
// the admin-managed backend.
const universities = [
  {
    id: 1,
    name: "The University of Melbourne",
    location: "Melbourne, Victoria",
    tag: "Top Ranked",
    image: null, // future: admin-uploaded photo URL
    description:
      "Australia's leading research university, known globally for academic excellence, medicine, business, and campus life.",
    requirements: [
      "HSC / A-Levels or Bachelor's (GPA 3.0+)",
      "IELTS 6.5 overall (no band less than 6.0)",
      "Statement of Purpose (SOP)",
    ],
    tuition: "AU$38,000 - $48,000/yr",
    intake: "Feb & Jul",
  },
  {
    id: 2,
    name: "The University of Sydney",
    location: "Sydney, New South Wales",
    tag: "Group of 8",
    image: null,
    description:
      "A world-renowned Group of Eight institution with iconic sandstone architecture and top-tier global placement rates.",
    requirements: [
      "HSC/A-Levels with minimum aggregate 65%+",
      "IELTS 6.5 - 7.0 (Course dependent)",
      "Academic Transcripts & Valid Passport",
    ],
    tuition: "AU$42,000 - $52,000/yr",
    intake: "Feb & Aug",
  },
  {
    id: 3,
    name: "UNSW Sydney",
    location: "Sydney, New South Wales",
    tag: "STEM & Business",
    image: null,
    description:
      "A powerhouse for engineering, technology, and entrepreneurship, located close to Sydney's central business hub.",
    requirements: [
      "High School Diploma / Bachelor's Transcripts",
      "IELTS 6.5 overall, minimum 6.0 in each section",
      "Financial Proof for Visa & Tuition",
    ],
    tuition: "AU$40,000 - $50,000/yr",
    intake: "Feb, May & Sep",
  },
  {
    id: 4,
    name: "Monash University",
    location: "Melbourne, Victoria",
    tag: "Innovation",
    image: null,
    description:
      "Australia's largest university, offering global dual-degree options, cutting-edge research facilities, and practical training.",
    requirements: [
      "Completion of Year 12 or recognised Foundation",
      "IELTS 6.5 overall or PTE Academic equivalent",
      "Statement of Purpose (SOP)",
    ],
    tuition: "AU$36,000 - $46,000/yr",
    intake: "Feb & Jul",
  },
  {
    id: 5,
    name: "The University of Queensland",
    location: "Brisbane, Queensland",
    tag: "Research",
    image: null,
    description:
      "Situated in sunny Brisbane, UQ offers world-leading programs in life sciences, engineering, and environmental research.",
    requirements: [
      "HSC / A-Levels or recognized bachelor's degree",
      "IELTS 6.5 overall, sub-scores 6.0+",
      "Academic References",
    ],
    tuition: "AU$35,000 - $45,000/yr",
    intake: "Feb & Jul",
  },
  {
    id: 6,
    name: "University of Technology Sydney (UTS)",
    location: "Sydney, New South Wales",
    tag: "Career-Focused",
    image: null,
    description:
      "A top young university celebrated for industry-integrated learning, modern architecture, and high graduate employability.",
    requirements: [
      "HSC / A-Levels or Diploma completion",
      "IELTS 6.5 overall with 6.0 in writing",
      "Proof of funds for tuition & living expenses",
    ],
    tuition: "AU$32,000 - $42,000/yr",
    intake: "Feb & Jul",
  },
];

// ── University card ──────────────────────────────────────────────────
function UniversityCard({ uni, image, onDetails, onApply }) {
  return (
    <div
      className="rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ border: "1px solid #eef0f8" }}
    >
      <div className="relative h-40">
        <img
          src={uni.image || image}
          alt={uni.name}
          className="w-full h-full object-cover"
        />
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
        <p className="text-sm mt-2 leading-relaxed" style={{ color: "#666" }}>
          {uni.description}
        </p>

        <div className="flex gap-2 mt-5">
          <button
            onClick={() => onDetails(uni)}
            className="flex-1 py-2.5 rounded-full text-xs font-bold cursor-pointer transition-colors"
            style={{
              background: "#f0f2ff",
              color: "#1a2a6c",
              border: "1px solid #e5e7f0",
            }}
          >
            Details
          </button>
          <button
            onClick={onApply}
            className="flex-1 py-2.5 rounded-full text-xs font-bold text-white border-none cursor-pointer transition-colors"
            style={{ background: "#b01c2e" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#8e1422")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#b01c2e")}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Details popup ─────────────────────────────────────────────────────
function DetailsModal({ uni, image, onClose, onApply }) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)" }}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-white rounded-2xl max-w-lg w-full max-h-[88vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-lg border-none cursor-pointer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1a2a6c"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <img
          src={uni.image || image}
          alt={uni.name}
          className="w-full h-44 object-cover"
        />

        <div className="p-6">
          <span
            className="inline-block text-[10px] font-bold uppercase px-2.5 py-1 rounded-full mb-3"
            style={{ background: "#fdf3e2", color: "#a4863a" }}
          >
            {uni.tag}
          </span>
          <h2
            className="font-display text-xl font-bold"
            style={{ color: "#1a2a6c" }}
          >
            {uni.name}
          </h2>
          <p className="text-xs mt-1" style={{ color: "#888" }}>
            {uni.location}
          </p>
          <p className="text-sm mt-4 leading-relaxed" style={{ color: "#555" }}>
            {uni.description}
          </p>

          <div className="mt-5 pt-5" style={{ borderTop: "1px solid #f0f2f8" }}>
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
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "#555" }}
                >
                  <svg
                    width="14"
                    height="14"
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
            className="flex items-center gap-6 mt-5 pt-5"
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
            className="w-full mt-6 py-3 rounded-full text-sm font-bold text-white border-none cursor-pointer"
            style={{ background: "#b01c2e" }}
          >
            Apply Now →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Apply popup ──────────────────────────────────────────────────────
function ApplyModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto py-6 px-4"
      style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)" }}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-lg border-none cursor-pointer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1a2a6c"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <div className="rounded-2xl overflow-hidden">
          <ApplicationForm />
        </div>
      </div>
    </div>
  );
}

export default function Australia() {
  const navigate = useNavigate();
  const [selectedUni, setSelectedUni] = useState(null);
  const [showApply, setShowApply] = useState(false);

  const openApply = () => {
    setSelectedUni(null);
    setShowApply(true);
  };

  return (
    <div className="bg-white">
      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={australiaImage}
            alt="Study in Australia"
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
              src="https://flagcdn.com/w40/au.png"
              alt=""
              className="w-5 h-3.5 rounded-sm object-cover"
            />
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              Study Destination
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white max-w-2xl mb-5 leading-tight">
            Study in <span style={{ color: "#e0c477" }}>Australia</span>
          </h1>
          <p className="text-slate-200 max-w-xl mb-8 leading-relaxed">
            Unlock globally recognized qualifications, flexible part-time work
            rights, and lucrative post-study work pathways. Australia combines
            prestigious Group of 8 universities with an unrivaled lifestyle.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={openApply}
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

      {/* TOP UNIVERSITIES */}
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
          Universities We Work With in Australia
        </h2>
        <p
          className="text-center max-w-xl mx-auto mb-12"
          style={{ color: "#666" }}
        >
          Tap "Details" for the full picture, or apply directly to the one that
          fits you.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni, i) => (
            <UniversityCard
              key={uni.id}
              uni={uni}
              image={campusImages[i % campusImages.length]}
              onDetails={setSelectedUni}
              onApply={openApply}
            />
          ))}
        </div>
      </div>

      {selectedUni && (
        <DetailsModal
          uni={selectedUni}
          image={
            campusImages[
              universities.findIndex((u) => u.id === selectedUni.id) %
                campusImages.length
            ]
          }
          onClose={() => setSelectedUni(null)}
          onApply={openApply}
        />
      )}

      {showApply && <ApplyModal onClose={() => setShowApply(false)} />}
    </div>
  );
}
