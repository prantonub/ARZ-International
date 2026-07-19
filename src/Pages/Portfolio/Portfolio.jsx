import { useNavigate, useLocation } from "react-router-dom";
import { goToApplicationForm } from "../../utils/scrollToForm";
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

// Reconciled from the site's two previous (conflicting) team lists —
// one canonical role per person.
const TEAM = [
  {
    name: "Sadik Arzumand Ahmad",
    role: "Head of Language Center",
    desk: "South Korea Desk",
    initials: "SA",
    whatsapp: "8801700000001",
    email: "sadik@arzinternational.com",
  },
  {
    name: "Wasif Ahmed Jisan",
    role: "Business Development Manager",
    desk: "Dhaka HQ",
    initials: "WJ",
    whatsapp: "8801700000002",
    email: "wasif@arzinternational.com",
  },
  {
    name: "Ashraful Haque Antor",
    role: "Country Manager, UK",
    desk: "Dhaka HQ",
    initials: "AA",
    whatsapp: "8801700000003",
    email: "ashraful@arzinternational.com",
  },
  {
    name: "Rakib Hossain",
    role: "Language Instructor",
    desk: "South Korea Desk",
    initials: "RH",
    whatsapp: "8801700000004",
    email: "rakib@arzinternational.com",
  },
  {
    name: "Rahat Farhan",
    role: "Operations Manager",
    desk: "Dhaka HQ",
    initials: "RF",
    whatsapp: "8801700000005",
    email: "rahat@arzinternational.com",
  },
  {
    name: "Nusrat Alam Nadia",
    role: "General Manager",
    desk: "Dhaka HQ",
    initials: "NN",
    whatsapp: "8801700000006",
    email: "nusrat@arzinternational.com",
  },
  {
    name: "Nazat Rahman",
    role: "Business Development Manager, Korea",
    desk: "South Korea Desk",
    initials: "NR",
    whatsapp: "8801700000007",
    email: "nazat@arzinternational.com",
  },
  {
    name: "Sumaiya Islam",
    role: "Marketing Manager",
    desk: "Dhaka HQ",
    initials: "SI",
    whatsapp: "8801700000008",
    email: "sumaiya@arzinternational.com",
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

      {/* ── TEAM ─────────────────────────────────────────────── */}
      <section className="px-6 py-16 md:py-20 max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="flex justify-center mb-4">
            <Eyebrow>The People Behind ARZ</Eyebrow>
          </div>
          <h2 className="font-display font-bold text-2xl md:text-4xl text-navy mb-4">
            Meet the Team
          </h2>
          <p className="text-slate-500">
            Reach out directly — every counselor below is a real point of
            contact, not a call center.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {TEAM.map((m) => (
            <div
              key={m.email}
              className="rounded-2xl p-5 border border-navy/10 text-center hover:shadow-lg transition-shadow duration-200"
            >
              <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center font-display font-bold text-lg text-white bg-gradient-to-br from-navy to-navy-light">
                {m.initials}
              </div>
              <h3 className="font-display font-bold text-sm text-navy leading-tight">
                {m.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-1 leading-tight">
                {m.role}
              </p>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wide text-gold-dark">
                {m.desk}
              </span>

              <div className="flex justify-center gap-2 mt-4">
                <a
                  href={`https://wa.me/${m.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`WhatsApp ${m.name}`}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-navy/5 text-navy hover:bg-navy hover:text-white transition-colors no-underline"
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
                <a
                  href={`mailto:${m.email}`}
                  title={`Email ${m.name}`}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-navy/5 text-navy hover:bg-navy hover:text-white transition-colors no-underline"
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
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section
        className="px-6 py-16 md:py-20 text-center"
        style={{
          background: "linear-gradient(135deg, #1a2a6c 0%, #b01c2e 100%)",
        }}
      >
        <h2 className="font-display font-bold text-2xl md:text-4xl text-white mb-4">
          Ready to Be Our Next Success Story?
        </h2>
        <p className="text-white/80 max-w-xl mx-auto mb-8">
          Talk to a real counselor, get a honest assessment of your options, and
          start your application with a team that's done this hundreds of times.
        </p>
        <div className="flex justify-center">
          <CTAButtons
            onApply={handleApply}
            onContact={handleContact}
            variant="dark"
          />
        </div>
      </section>
    </div>
  );
}
