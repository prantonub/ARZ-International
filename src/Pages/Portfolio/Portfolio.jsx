import { useNavigate, useLocation } from "react-router-dom";
import { goToApplicationForm } from "../../utils/scrollToForm";
import SuccessStoriesSection from "./SuccessStoriesSection";
import officePhoto from "../../assets/ARZ office pic.png";
import koreaBdImage from "../../assets/koreaxBD.png";

/* ─────────────────────────────────────────────────────────
   DATA — edit content here without touching markup/layout
   ───────────────────────────────────────────────────────── */

const STATS = [
  { value: "5,000+", label: "Students Placed" },
  { value: "98%", label: "Visa Success Rate" },
  { value: "40+", label: "Partner Universities" },
  { value: "4", label: "Study Destinations" },
];

const PILLARS = [
  {
    title: "Merit-First Selection",
    desc: "We only put forward students who are genuinely qualified and well-matched — never volume over fit.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: "Verified, Transparent Process",
    desc: "Every application is carefully screened for authenticity before it ever reaches a university or embassy.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    title: "Backed by Our Commitment",
    desc: "We stand behind every student we recommend, giving our partner universities real confidence in each placement.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
      </svg>
    ),
  },
  {
    title: "A Growing University Network",
    desc: "Active partnerships across South Korea, the UK, Australia and Europe — with more added every intake.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1m4 0h1m-6 4h1m4 0h1m-6 4h1m4 0h1" />
      </svg>
    ),
  },
];

const DESTINATIONS = [
  {
    name: "South Korea",
    flag: "kr",
    path: "/southkorea",
    note: "Our founding market — language + degree pathways.",
  },
  {
    name: "United Kingdom",
    flag: "gb",
    path: "/uk",
    note: "Fast-track degrees, strong post-study work route.",
  },
  {
    name: "Australia",
    flag: "au",
    path: "/australia",
    note: "Top-ranked universities, part-time work rights.",
  },
  {
    name: "Europe",
    flag: "eu",
    path: "/europe",
    note: "Low tuition, English-taught programs, Schengen access.",
  },
];

/* ─────────────────────────────────────────────────────────
   SMALL UI PRIMITIVES
   ───────────────────────────────────────────────────────── */

function Eyebrow({ children, dark = false }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full ${
        dark
          ? "bg-white/10 border border-white/20 text-gold"
          : "bg-navy/5 text-navy border border-navy/10"
      }`}
    >
      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12,2 15.1,8.3 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 8.9,8.3" />
      </svg>
      {children}
    </span>
  );
}

function CTAButtons({ onApply, onContact, variant = "light" }) {
  const isDark = variant === "dark";
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={onApply}
        className="px-7 py-3 rounded-full text-sm font-bold text-white bg-brand hover:bg-brand-dark transition-colors border-none cursor-pointer shadow-[0_4px_20px_rgba(176,28,46,0.35)]"
      >
        Start Your Journey →
      </button>
      <button
        onClick={onContact}
        className={`px-7 py-3 rounded-full text-sm font-bold transition-colors border-2 cursor-pointer ${
          isDark
            ? "border-white/40 text-white hover:bg-white/10"
            : "border-navy/20 text-navy hover:bg-navy hover:text-white"
        }`}
      >
        Free Counseling
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────── */

export default function Portfolio() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleApply = () => goToApplicationForm(navigate, location.pathname);
  const handleContact = () => navigate("/contact");

  return (
    <div className="bg-white">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="px-6 py-16 md:py-24"
        style={{
          background: "linear-gradient(135deg, #101a47 0%, #1a2a6c 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-5">
            <Eyebrow dark>Our Portfolio</Eyebrow>
          </div>
          <h1 className="font-display font-bold leading-tight text-white text-3xl md:text-5xl mb-5">
            Real Students. Real Universities.
            <br className="hidden md:block" /> A Track Record Worth Trusting.
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed mb-9">
            ARZ International is Bangladesh's study-abroad consultancy for South
            Korea, the UK, Australia and Europe. Here's the team behind it, how
            we work, and why families keep referring us to the next student.
          </p>
          <div className="flex justify-center">
            <CTAButtons
              onApply={handleApply}
              onContact={handleContact}
              variant="dark"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14 pt-10 border-t border-white/10">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display font-black text-2xl md:text-3xl text-gold">
                  {s.value}
                </div>
                <div className="text-xs mt-1 text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ───────────────────────────────────── */}
      <section className="px-6 py-16 md:py-20 max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="flex justify-center mb-4">
            <Eyebrow>Why Choose Us</Eyebrow>
          </div>
          <h2 className="font-display font-bold text-2xl md:text-4xl text-navy">
            Built on Trust, Not Just Promises
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl p-6 border border-navy/10 hover:border-brand/30 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-brand/10 text-brand">
                {p.icon}
              </div>
              <h3 className="font-display font-bold text-navy mb-2">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-500">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── OUR REACH ────────────────────────────────────────── */}
      <section
        className="px-6 py-16 md:py-20"
        style={{ background: "#f8f9ff" }}
      >
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          <div>
            <div className="mb-4">
              <Eyebrow>Our Reach</Eyebrow>
            </div>
            <h2 className="font-display font-bold text-2xl md:text-4xl text-navy mb-5">
              Four Destinations, One Dedicated Team
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8 max-w-md">
              We started with South Korea and built out from there — every new
              destination joins our network only once we're confident we can
              support students in it properly, end to end.
            </p>
            <img
              src={koreaBdImage}
              alt="ARZ International — Bangladesh to South Korea partnership"
              className="rounded-2xl w-full max-w-sm object-cover hidden lg:block"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {DESTINATIONS.map((d) => (
              <button
                key={d.name}
                onClick={() => navigate(d.path)}
                className="text-left rounded-2xl p-5 bg-white border border-navy/10 hover:border-brand/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <img
                  src={`https://flagcdn.com/w80/${d.flag}.png`}
                  alt=""
                  className="w-9 h-6 rounded-sm object-cover mb-3 border border-navy/10"
                />
                <h3 className="font-display font-bold text-navy mb-1">
                  {d.name}
                </h3>
                <p className="text-xs leading-relaxed text-slate-500">
                  {d.note}
                </p>
                <span className="inline-block mt-3 text-xs font-bold text-brand">
                  Explore →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFICE / CREDIBILITY STRIP ──────────────────────── */}
      <section className="relative overflow-hidden">
        <img
          src={officePhoto}
          alt="Inside the ARZ International office"
          className="w-full h-[320px] md:h-[550px] object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(16,26,71,0.88) 0%, rgba(16,26,71,0.55) 55%, rgba(16,26,71,0.15) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-center px-6">
          <div className="max-w-md">
            <h3 className="font-display font-bold text-white text-2xl mb-3">
              Where Every Application Starts
            </h3>
            <p className="text-white/75 text-sm leading-relaxed">
              Our counselors meet students in person — reviewing documents,
              prepping for interviews, and building the kind of application a
              university actually wants to say yes to.
            </p>
          </div>
        </div>
      </section>

      {/* ── SUCCESS STORIES (FB-post style, admin-managed) ──── */}
      <SuccessStoriesSection onApply={handleApply} />
    </div>
  );
}
