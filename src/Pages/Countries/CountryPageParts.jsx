import { useState } from "react";
import ApplicationForm from "../../Form/ApplicationForm";

// Generic campus imagery — not claimed to be each university's real
// campus, just a visual placeholder until the admin panel lets you
// upload a real photo per university. Cycled across cards for variety.
export const DEFAULT_CAMPUS_IMAGES = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&q=80",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&q=80",
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=700&q=80",
];

/* ── Hero banner ─────────────────────────────────────────────────── */
export function CountryHero({
  flag,
  displayName,
  heroImage,
  tagline,
  onApply,
  onContact,
}) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt={`Study in ${displayName}`}
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
            src={`https://flagcdn.com/w40/${flag}.png`}
            alt=""
            className="w-5 h-3.5 rounded-sm object-cover"
          />
          <span className="text-xs font-bold uppercase tracking-widest text-white">
            Study Destination
          </span>
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-white max-w-2xl mb-5 leading-tight">
          Study in <span style={{ color: "#e0c477" }}>{displayName}</span>
        </h1>
        <p className="text-slate-200 max-w-xl mb-8 leading-relaxed">
          {tagline}
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={onApply}
            className="px-7 py-3 rounded-full text-sm font-bold text-white border-none cursor-pointer"
            style={{ background: "#b01c2e" }}
          >
            Apply Now →
          </button>
          <button
            onClick={onContact}
            className="px-7 py-3 rounded-full text-sm font-bold text-white border-2 border-white bg-transparent cursor-pointer"
          >
            Free Counseling
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── University card — minimal: image, name, short description ────── */
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

/* ── Details popup — everything the card doesn't show ──────────────── */
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

/* ── Apply popup — the real application form, embedded ─────────────── */
export function ApplyModal({ onClose }) {
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

/* ── Full "Top Universities" section — grid + its own Details popup ── */
export function UniversitiesGrid({
  sectionTitle,
  sectionSubtitle,
  universities,
  campusImages = DEFAULT_CAMPUS_IMAGES,
  onApply,
}) {
  const [selectedUni, setSelectedUni] = useState(null);

  return (
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
        {sectionTitle}
      </h2>
      <p
        className="text-center max-w-xl mx-auto mb-12"
        style={{ color: "#666" }}
      >
        {sectionSubtitle ||
          'Tap "Details" for the full picture, or apply directly to the one that fits you.'}
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {universities.map((uni, i) => (
          <UniversityCard
            key={uni._id}
            uni={uni}
            image={campusImages[i % campusImages.length]}
            onDetails={setSelectedUni}
            onApply={onApply}
          />
        ))}
      </div>

      {selectedUni && (
        <DetailsModal
          uni={selectedUni}
          image={
            campusImages[
              universities.findIndex((u) => u._id === selectedUni._id) %
                campusImages.length
            ]
          }
          onClose={() => setSelectedUni(null)}
          onApply={onApply}
        />
      )}
    </div>
  );
}
