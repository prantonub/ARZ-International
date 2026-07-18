import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ApplyButton from "../Component2/ApplyButton";
import { goToApplicationForm } from "../utils/scrollToForm";
import { apiPost } from "../config/api";

function getOfficeStatus() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  if (day === 5) return false; // Friday closed
  return hour >= 10.5 && hour < 18;
}

const SocialBtn = ({ title, href, children }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 border text-slate-500 bg-white border-slate-200 hover:bg-[#1a2a6c] hover:text-white hover:border-[#1a2a6c] hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-center w-4 h-4">{children}</div>
    </a>
  );
};

const navCols = [
  {
    title: "Navigation",
    links: [
      { label: "Home", to: "/" },
      { label: "About Us", to: "/about" },
      { label: "Portfolio Track", to: "/portfolio" },
      { label: "Study Destinations", to: "/southkorea" },
    ],
  },
  {
    title: "Destinations",
    links: [
      { label: "South Korea Support", to: "/southkorea" },
      { label: "United Kingdom", to: "/uk" },
      { label: "Australia Admission", to: "/australia" },
      { label: "Europe Pathways", to: "/europe" },
    ],
  },
  {
    title: "Corporate",
    links: [
      { label: "Meet Our Team", to: "/portfolio" },
      { label: "FAQs Portal", to: "/#faq" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
];

const stats = [
  { value: "4", label: "Countries Supported" },
  { value: "98%", label: "Visa Success Rate" },
  { value: "5k+", label: "Global Alumni Placed" },
  { value: "40+", label: "Partner Universities" },
];

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [subState, setSubState] = useState("idle");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(getOfficeStatus());
    const t = setInterval(() => setIsOpen(getOfficeStatus()), 60_000);
    return () => clearInterval(t);
  }, []);

  const subscribe = async () => {
    if (!email.includes("@")) return;
    setSubState("loading");
    try {
      await apiPost("/newsletter", { email });
      setSubState("done");
      setEmail("");
    } catch {
      setSubState("error");
    }
  };

  const handleApply = () => goToApplicationForm(navigate, location.pathname);
  const handleCounseling = () => navigate("/contact");

  return (
    <footer className="w-full bg-slate-900 text-slate-300 font-sans relative overflow-hidden box-border">
      {/* Architectural Grid Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      {/* UPPER CORE SECTION */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12 relative z-10">
        {/* HERO FOOTER BANNER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-[0.2em] text-[#c9a84c] uppercase block mb-3">
              Begin Academic Excellence
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl xl:text-5xl text-white leading-tight tracking-tight">
              Your global educational journey{" "}
              <br className="hidden md:inline" />
              starts{" "}
              <span className="text-[#c9a84c] italic font-serif font-normal">
                right here.
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-4 items-center flex-shrink-0">
            <ApplyButton
              onClick={handleApply}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#b01c2e] text-white hover:bg-[#8e1422] transition-all duration-200 text-sm font-bold tracking-wide shadow-lg shadow-black/20 rounded-xl cursor-pointer border-none flex items-center justify-center whitespace-nowrap"
              label="Apply Online Now →"
            />
            <ApplyButton
              onClick={handleCounseling}
              className="w-full sm:w-auto px-7 py-3.5 bg-transparent text-white border-2 border-slate-700 hover:border-white hover:bg-white/5 transition-all duration-200 text-sm font-bold tracking-wide rounded-xl cursor-pointer flex items-center justify-center whitespace-nowrap"
              label="Request Free Counseling"
            />
          </div>
        </div>

        <div className="w-full h-px bg-slate-800 mb-12" />

        {/* GRID DIRECTORY */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
          {navCols.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                {col.title}
              </h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm font-medium transition-colors duration-150 no-underline text-slate-400 hover:text-white inline-block"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* INTERACTIVE OFFICE MONITOR COMPONENT */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
              Operational Hub
            </h4>
            <div className="rounded-2xl p-4 bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-400 font-medium">
                  Saturday – Thursday
                </span>
                <span className="font-semibold text-white">
                  10:30 AM – 6:00 PM
                </span>
              </div>
              <div className="flex justify-between text-xs mb-3.5">
                <span className="text-slate-400 font-medium">
                  Friday Observe
                </span>
                <span className="text-slate-500 italic">Office Closed</span>
              </div>
              <div
                className={`inline-flex items-center gap-2 text-[11px] font-bold px-3 py-1.5 rounded-xl border ${
                  isOpen
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full animate-pulse ${isOpen ? "bg-emerald-400" : "bg-rose-400"}`}
                />
                {isOpen ? "HQ Desk Currently Open" : "HQ Desk Currently Closed"}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-slate-800 mb-12" />

        {/* MATRIX DATA & METADATA MODULE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Brand Meta Block */}
          <div className="flex flex-col gap-4">
            <div>
              <div className="font-display font-black text-2xl text-white tracking-tight mb-1">
                ARZ International
              </div>
              <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#c9a84c]">
                Global Student Consultancy
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Bangladesh's premier highly trusted consultancy for international
              university admissions, micro-credential mapping, and secure
              documentation matrices.
            </p>
            <div className="flex gap-2 mt-2">
              <SocialBtn title="Facebook" href="https://facebook.com">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </SocialBtn>
              <SocialBtn title="Instagram" href="https://instagram.com">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="0.8"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </SocialBtn>
              <SocialBtn title="YouTube" href="https://youtube.com">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                  <polygon
                    fill="currentColor"
                    stroke="none"
                    points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
                  />
                </svg>
              </SocialBtn>
              <SocialBtn title="WhatsApp" href="https://wa.me/8801308821404">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                  <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.437A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 11.999 2z" />
                </svg>
              </SocialBtn>
            </div>
          </div>

          {/* Core Communication Identifiers */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
              Communications Matrix
            </h4>
            <div className="flex flex-col gap-3.5">
              {[
                {
                  label: "Direct Call-line",
                  value: "+880 1308-821404",
                  href: "tel:+8801308821404",
                  icon: (
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  ),
                },
                {
                  label: "Admissions Dispatch",
                  value: "info@arzinternational.com",
                  href: "mailto:info@arzinternational.com",
                  icon: (
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                },
                {
                  label: "Bangladesh Offices",
                  value: "Sylhet Terminal & Dhaka Hub",
                  href: null,
                  icon: (
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center flex-shrink-0 border border-slate-700/60">
                    <div className="w-4 h-4 flex items-center justify-center">
                      {c.icon}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    {c.href ? (
                      <a
                        href={c.href}
                        className="text-sm font-semibold no-underline text-white hover:text-[#c9a84c] transition-colors"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <div className="text-sm font-semibold text-white">
                        {c.value}
                      </div>
                    )}
                    <div className="text-xs text-slate-500 mt-0.5">
                      {c.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Integrated Subscriptions & Metric Output Block */}
          <div className="flex flex-col gap-4 w-full">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
              Intel Subscriptions
            </h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Intake alerts, exclusive scholarship deadlines, and global
              documentation matrix alerts.
            </p>

            {subState === "done" ? (
              <div className="rounded-xl p-3 text-xs font-semibold text-center bg-emerald-500/15 border border-emerald-500/25 text-emerald-400">
                ✓ Enterprise Node Registration Complete. You're Subscribed!
              </div>
            ) : (
              <div className="w-full">
                <div className="flex overflow-hidden rounded-xl border border-slate-700 bg-slate-800/80 focus-within:border-[#1a2a6c] transition-all">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && subscribe()}
                    placeholder="Enter structural email address..."
                    className="flex-1 bg-transparent outline-none text-xs px-4 py-3 text-white placeholder-slate-500"
                  />
                  <button
                    onClick={subscribe}
                    disabled={subState === "loading"}
                    className="px-4 flex items-center justify-center transition-colors duration-200 border-none cursor-pointer bg-[#1a2a6c] hover:bg-[#b01c2e] text-white disabled:opacity-50"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="transform rotate-45"
                    >
                      <path
                        d="M22 2L11 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M22 2L15 22l-4-9-9-4 20-7z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
                {subState === "error" && (
                  <p className="text-xs mt-2 text-rose-400 font-medium">
                    Subscription execution failed. Please refresh and attempt
                    again.
                  </p>
                )}
              </div>
            )}

            {/* Scaled Global Enterprise Metric Panels */}
            <div className="grid grid-cols-2 gap-2.5 mt-2">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-3 text-center bg-slate-800/40 border border-slate-700/40 backdrop-blur-sm"
                >
                  <div className="font-display font-black text-xl text-[#c9a84c] tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* LOWER COMPLIANCE & LEGAL BAR */}
      <div className="w-full bg-slate-950 border-t border-slate-800/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-slate-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} ARZ International. All rights reserved.
          </span>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "Privacy Policy", to: "/privacy-policy" },
              { label: "Terms of Service", to: "/terms-of-service" },
              { label: "Cookie Parameters", to: "/cookie-policy" },
            ].map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-xs font-medium transition-colors duration-150 no-underline text-slate-500 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
