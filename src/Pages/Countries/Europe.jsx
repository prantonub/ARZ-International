import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationForm from "../../Form/ApplicationForm";
import europeImage from "../../assets/europe.png";

// Generic campus imagery — clean placeholder university pictures
const campusImages = [
  "https://plus.unsplash.com/premium_photo-1697729711242-5fa79eaa8b08?q=80&w=1189&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1662930470616-f6ee42ebb6ce?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1689655451590-be38de8003e2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1673022177871-ef66893259ca?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1782437169290-e8010386ea73?q=80&w=1126&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1755694036479-15f7c3a2c55f?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

// ── University data ──────────────────────────────────────────────────
// Structured so this array can later be swapped for data fetched from
// the admin-managed backend.
const universities = [
  {
    id: 1,
    name: "Technical University of Munich (TUM)",
    location: "Munich, Germany",
    tag: "Top Ranked",
    image: null, // future: admin-uploaded photo URL
    description:
      "One of Europe's premier technical universities, celebrated for engineering, computer science, and pioneering research innovation.",
    requirements: [
      "HSC / Bachelor's degree (GPA 3.0+ equivalent)",
      "IELTS 6.5+ or German Proficiency (Course dependent)",
      "VPD evaluation by uni-assist",
    ],
    tuition: "€2,000 - €6,000/yr",
    intake: "Oct & Apr",
  },
  {
    id: 2,
    name: "ETH Zurich",
    location: "Zurich, Switzerland",
    tag: "Excellence",
    image: null,
    description:
      "A world-renowned STEM university with top global rankings, known for cutting-edge technology, robotics, and science research.",
    requirements: [
      "High academic standing in Science & Mathematics",
      "IELTS 7.0+ or TOEFL iBT 100+",
      "GRE / GMAT (Recommended for Master's)",
    ],
    tuition: "€1,600/yr",
    intake: "Sep",
  },
  {
    id: 3,
    name: "KU Leuven",
    location: "Leuven, Belgium",
    tag: "Historic & Tech",
    image: null,
    description:
      "Belgium's highest-ranked university and one of Europe's oldest, recognized for innovative teaching and English-taught Master's.",
    requirements: [
      "Secondary school diploma / Relevant Bachelor's",
      "IELTS 6.5+ or TOEFL equivalent",
      "Motivation Letter & Academic SOP",
    ],
    tuition: "€1,250 - €6,600/yr",
    intake: "Sep",
  },
  {
    id: 4,
    name: "Politecnico di Milano",
    location: "Milan, Italy",
    tag: "Design & Tech",
    image: null,
    description:
      "Italy's largest technical institution, world-famous for architecture, industrial design, and engineering programs.",
    requirements: [
      "Bachelor's degree in relevant discipline",
      "IELTS 6.0+ (No English test required for English Medium instruction)",
      "Portfolio (For Architecture/Design applicants)",
    ],
    tuition: "€3,900/yr (Scholarships available)",
    intake: "Sep & Feb",
  },
  {
    id: 5,
    name: "University of Amsterdam",
    location: "Amsterdam, Netherlands",
    tag: "Global Hub",
    image: null,
    description:
      "A leading European research university offering an extensive range of English-taught programs in heart of the capital.",
    requirements: [
      "High School Diploma or recognized Bachelor's",
      "IELTS 6.5–7.0 depending on faculty",
      "CV & Academic Statement of Purpose",
    ],
    tuition: "€9,000 - €15,000/yr",
    intake: "Sep & Feb",
  },
  {
    id: 6,
    name: "Charles University",
    location: "Prague, Czech Republic",
    tag: "Affordable",
    image: null,
    description:
      "One of Central Europe's oldest universities, offering affordable high-quality medical, science, and humanities degrees.",
    requirements: [
      "High School Diploma / Bachelor's Transcripts",
      "IELTS 6.0+ or Entrance Examination",
      "Nostrification (Degree equivalency process)",
    ],
    tuition: "€3,500 - €8,000/yr",
    intake: "Sep",
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

export default function Europe() {
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
            src={europeImage}
            alt="Study in Europe"
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
              src="https://flagcdn.com/w40/eu.png"
              alt=""
              className="w-5 h-3.5 rounded-sm object-cover"
            />
            <span className="text-xs font-bold uppercase tracking-widest text-white">
              Study Destination
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white max-w-2xl mb-5 leading-tight">
            Study in <span style={{ color: "#e0c477" }}>Europe</span>
          </h1>
          <p className="text-slate-200 max-w-xl mb-8 leading-relaxed">
            Discover affordable and low-tuition education across Europe's top
            academic hubs. Experience rich cultural diversity, post-study work
            visas, and seamless Schengen travel opportunities.
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
          Universities We Work With in Europe
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
