import { useEffect, useState } from "react";
import ApplyNow from "../../Component2/ApplyNow";
import { apiGet } from "../../config/api";

const values = [
  {
    title: "Honest Guidance",
    text: "We only recommend universities and programs that genuinely fit your grades, budget and goals — never the ones that pay the highest commission.",
    color: "#1a2a6c",
  },
  {
    title: "End-to-End Support",
    text: "From your first counseling session to the day you land on campus, one team stays with you through admissions, visa filing and pre-departure prep.",
    color: "#0f6e56",
  },
  {
    title: "Support Until Success",
    text: "Our job isn't done at the visa stamp. We stay reachable for accommodation, part-time work guidance and settling-in questions after you arrive.",
    color: "#b01c2e",
  },
];

const timeline = [
  {
    year: "Step 1",
    title: "Free Counseling",
    text: "We assess your academic background, budget and destination preferences.",
  },
  {
    year: "Step 2",
    title: "University Shortlisting",
    text: "We match you with universities and programs where you're genuinely competitive.",
  },
  {
    year: "Step 3",
    title: "Application & Documentation",
    text: "We prepare and submit your application, SOPs and supporting documents.",
  },
  {
    year: "Step 4",
    title: "Visa & Departure",
    text: "We guide your visa filing, interview prep, and pre-departure orientation.",
  },
];

// ── Team — admin-managed via /api/team ────────────────────────────────
function initialsOf(name = "") {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase();
}

function TeamSection() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/team")
      .then(setTeam)
      .catch(() => setTeam([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && team.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <p
          className="text-xs font-bold uppercase tracking-widest mb-2"
          style={{ color: "#c9a84c" }}
        >
          The People Behind ARZ
        </p>
        <h2
          className="font-display text-2xl md:text-3xl font-bold mb-4"
          style={{ color: "#1a2a6c" }}
        >
          Meet the Team
        </h2>
        <p style={{ color: "#666" }}>
          Reach out directly — every counselor below is a real point of contact,
          not a call center.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-10 text-sm" style={{ color: "#999" }}>
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {team.map((m) => (
            <div
              key={m._id}
              className="rounded-2xl p-5 text-center hover:shadow-lg transition-shadow duration-200"
              style={{ border: "1px solid #eef0f8" }}
            >
              {m.image ? (
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center font-display font-bold text-lg text-white"
                  style={{
                    background: "linear-gradient(135deg, #1a2a6c, #2b3d8f)",
                  }}
                >
                  {initialsOf(m.name)}
                </div>
              )}
              <h3
                className="font-display font-bold text-sm leading-tight"
                style={{ color: "#1a2a6c" }}
              >
                {m.name}
              </h3>
              <p
                className="text-xs mt-1 mb-1 leading-tight"
                style={{ color: "#888" }}
              >
                {m.role}
              </p>
              {m.desk && (
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-wide"
                  style={{ color: "#a4863a" }}
                >
                  {m.desk}
                </span>
              )}

              {(m.whatsapp || m.email) && (
                <div className="flex justify-center gap-2 mt-4">
                  {m.whatsapp && (
                    <a
                      href={`https://wa.me/${m.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`WhatsApp ${m.name}`}
                      className="w-8 h-8 rounded-full flex items-center justify-center no-underline transition-colors"
                      style={{
                        background: "rgba(26,42,108,0.06)",
                        color: "#1a2a6c",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 22h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374A9.86 9.86 0 012.166 12c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898A9.825 9.825 0 0121.935 12c-.003 5.45-4.437 9.884-9.885 9.884" />
                      </svg>
                    </a>
                  )}
                  {m.email && (
                    <a
                      href={`mailto:${m.email}`}
                      title={`Email ${m.name}`}
                      className="w-8 h-8 rounded-full flex items-center justify-center no-underline transition-colors"
                      style={{
                        background: "rgba(26,42,108,0.06)",
                        color: "#1a2a6c",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div
        className="px-6 py-16 md:py-24 text-center"
        style={{ background: "linear-gradient(135deg,#101a47,#1a2a6c)" }}
      >
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "#e0c477" }}
        >
          About ARZ International
        </p>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-5 max-w-3xl mx-auto">
          Bangladesh's Trusted Partner for Studying Abroad
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
          ARZ International helps students across Bangladesh get into the right
          university abroad — with honest counseling, careful documentation, and
          support that continues long after the visa is stamped.
        </p>
        <div className="mt-8">
          <ApplyNow className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-white cursor-pointer border-none bg-brand" />
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#c9a84c" }}
          >
            Our Mission
          </p>
          <h2
            className="font-display text-2xl md:text-3xl font-bold mb-4"
            style={{ color: "#1a2a6c" }}
          >
            Support Until Success
          </h2>
          <p className="leading-relaxed mb-4" style={{ color: "#555" }}>
            Choosing to study abroad is one of the biggest decisions a student
            and their family will make. We built ARZ International to make that
            process transparent and manageable — clear requirements, realistic
            timelines, and a team that answers the phone.
          </p>
          <p className="leading-relaxed" style={{ color: "#555" }}>
            Today we work with students heading to South Korea, the United
            Kingdom, Australia and Europe, helping them through university
            admissions, visa documentation and everything in between.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: "5,000+", label: "Students Placed" },
            { value: "98%", label: "Visa Success Rate" },
            { value: "40+", label: "Partner Universities" },
            { value: "4", label: "Study Destinations" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-5 text-center"
              style={{ background: "#f8f9ff", border: "1px solid #eef0f8" }}
            >
              <div
                className="font-display text-2xl font-black"
                style={{ color: "#1a2a6c" }}
              >
                {s.value}
              </div>
              <div className="text-xs mt-1" style={{ color: "#888" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="px-6 py-16" style={{ background: "#f8f9ff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "#c9a84c" }}
            >
              What We Stand For
            </p>
            <h2
              className="font-display text-2xl md:text-3xl font-bold"
              style={{ color: "#1a2a6c" }}
            >
              Our Core Values
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-6"
                style={{ border: "1px solid #eef0f8" }}
              >
                <div
                  className="w-10 h-1.5 rounded-full mb-4"
                  style={{ background: v.color }}
                />
                <h3
                  className="font-display font-bold text-lg mb-2"
                  style={{ color: "#1a2a6c" }}
                >
                  {v.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#666" }}
                >
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process timeline */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "#c9a84c" }}
          >
            How It Works
          </p>
          <h2
            className="font-display text-2xl md:text-3xl font-bold"
            style={{ color: "#1a2a6c" }}
          >
            Your Journey With Us
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {timeline.map((t) => (
            <div
              key={t.title}
              className="relative pl-5"
              style={{ borderLeft: "3px solid #eef0f8" }}
            >
              <div
                className="text-xs font-bold uppercase mb-2"
                style={{ color: "#b01c2e" }}
              >
                {t.year}
              </div>
              <h3
                className="font-display font-bold mb-1.5"
                style={{ color: "#1a2a6c" }}
              >
                {t.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
                {t.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Team — moved here from the Portfolio page */}
      <TeamSection />
    </div>
  );
}
