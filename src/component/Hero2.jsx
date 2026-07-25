import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { goToApplicationForm } from "../utils/scrollToForm";
import { apiGet } from "../config/api";

const KEYFRAMES = `
  @keyframes fadeUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeRight { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:translateX(0)} }
  @keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes badgePop  { 0%{opacity:0;transform:scale(.8) translateY(10px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes pulseDot  { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:.4} }
  @keyframes imgFadeIn  { from{opacity:0;transform:scale(1.02)} to{opacity:1;transform:scale(1)} }
  @keyframes imgFadeOut { from{opacity:1} to{opacity:0} }

  .anim-fadeUp    { animation: fadeUp    0.6s cubic-bezier(0.16, 1, 0.3, 1) both }
  .anim-fadeRight { animation: fadeRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) both }
  .anim-floatY    { animation: floatY    5s ease-in-out infinite }
  .anim-badgePop1 { animation: badgePop  0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s both }
  .anim-badgePop2 { animation: badgePop  0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s both }
  .anim-pulseDot  { animation: pulseDot  2s ease-in-out infinite }
  .anim-ringA     { animation: floatY    6s ease-in-out infinite }
  .anim-ringB     { animation: floatY    8s ease-in-out infinite reverse }
  .slide-current  { animation: imgFadeIn  0.6s ease both; z-index:2; position:absolute; inset:0 }
  .slide-prev     { animation: imgFadeOut 0.6s ease both; z-index:1; position:absolute; inset:0 }
  .font-hero      { font-family: 'DM Sans', sans-serif; }
  .font-condensed { font-family: 'Fraunces', serif; font-style: normal; }
`;

// Used only if the admin hasn't added any homepage images yet, or the
// fetch fails — the slideshow should never end up empty/broken.
// const FALLBACK_IMAGES = [
//   "https://plus.unsplash.com/premium_photo-1683887034552-4635692bb57c?q=80&w=1169&auto=format&fit=crop",
//   "https://images.unsplash.com/flagged/photo-1554473675-d0904f3cbf38?q=80&w=1170&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1569447891824-7a1758aa73a2?q=80&w=1172&auto=format&fit=crop",
// ];

function ImageSlideshow() {
  const [heroImages, setHeroImages] = useState(FALLBACK_IMAGES);
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);

  useEffect(() => {
    apiGet("/homepage-images")
      .then((data) => {
        const urls = data.map((d) => d.image).filter(Boolean);
        if (urls.length > 0) {
          setHeroImages(urls);
          setCurrent(0);
          setPrev(null);
        }
      })
      .catch(() => {
        // keep FALLBACK_IMAGES on failure
      });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setPrev(current);
      setCurrent((c) => (c + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(id);
  }, [current]);

  const goTo = (idx) => {
    if (idx === current) return;
    setPrev(current);
    setCurrent(idx);
  };

  return (
    <div className="relative w-full aspect-square max-w-[440px] md:max-w-[460px] lg:max-w-[480px] mx-auto overflow-visible">
      {/* Rigid Framework Outer Mask Container */}
      <div className="w-full h-full rounded-[32px] overflow-hidden border-4 border-slate-100 shadow-xl bg-slate-50 relative">
        {prev !== null && (
          <img
            key={`prev-slide-${prev}-${current}`}
            src={heroImages[prev]}
            alt=""
            className="w-full h-full object-cover slide-prev"
          />
        )}
        <img
          key={`curr-slide-${current}`}
          src={heroImages[current]}
          alt="ARZ Admissions Display Portfolio"
          className="w-full h-full object-cover slide-current"
        />
      </div>

      {/* Pagination Controls */}
      <div className="flex gap-2 justify-center mt-4 relative z-30">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Show validation image slide ${i + 1}`}
            className={`h-1.5 rounded-full border-none cursor-pointer transition-all duration-300 ${
              i === current ? "w-5 bg-amber-500" : "w-1.5 bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function FloatingBadge({ icon, title, sub, iconBg, animClass, posClass }) {
  return (
    <div
      className={`absolute hidden lg:flex items-center gap-3 bg-white/95 border border-slate-200/70 backdrop-blur-md rounded-2xl p-3 shadow-xl min-w-[200px] max-w-[240px] z-20 box-border ${animClass} ${posClass}`}
    >
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-sm ${iconBg}`}
      >
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-extrabold text-slate-900 tracking-tight block truncate">
          {title}
        </span>
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5 block whitespace-normal leading-normal">
          {sub}
        </span>
      </div>
    </div>
  );
}

const STATS = [
  {
    num: "5,000+",
    label: "Students Placed",
    color: "text-blue-600 bg-blue-50/50 border-blue-100",
  },
  {
    num: "98%",
    label: "Visa Success Rate",
    color: "text-emerald-600 bg-emerald-50/50 border-emerald-100",
  },
  {
    num: "40+",
    label: "Partner Universities",
    color: "text-amber-600 bg-amber-50/50 border-amber-100",
  },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleApply = () => goToApplicationForm(navigate, location.pathname);

  return (
    <>
      <style>{KEYFRAMES}</style>

      <section className="font-hero relative bg-white overflow-hidden w-full min-h-0 py-8 md:py-12 lg:py-16 flex items-center box-border">
        {/* Structural Background Accents */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle,rgba(59,130,246,0.04) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute -top-40 -left-32 w-[450px] h-[450px] rounded-full blur-[100px] pointer-events-none bg-blue-50/50" />
        <div className="absolute -bottom-40 right-0 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none bg-amber-50/50" />

        {/* Changed justify-between to justify-center and set tight margins to erase the wide empty zone */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Left Typography Content Column */}
          <div className="flex-none space-y-5 w-full max-w-[500px] text-center md:text-left">
            <div
              className="anim-fadeUp inline-flex items-center gap-2 bg-amber-50 border border-amber-200/60 rounded-full px-4 py-1.5"
              style={{ animationDelay: "0.05s" }}
            >
              <span className="anim-pulseDot w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              <span className="text-amber-800 text-[10px] font-bold tracking-[0.16em] uppercase">
                ARZ International
              </span>
            </div>

            <h1
              className="font-condensed anim-fadeUp text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-slate-900 uppercase tracking-tight"
              style={{ animationDelay: "0.15s" }}
            >
              From Application <br />
              To Visa <span className="text-amber-500">We've Got</span> <br />
              You Covered
            </h1>

            <p
              className="anim-fadeUp text-slate-500 text-sm sm:text-base leading-relaxed max-w-[460px] mx-auto md:mx-0 font-medium"
              style={{ animationDelay: "0.25s" }}
            >
              We guide you through every step of the education visa process,
              from initial application portfolio routing to definitive embassy
              verification updates.
            </p>

            <div
              className="anim-fadeUp flex flex-wrap gap-3.5 justify-center md:justify-start pt-1"
              style={{ animationDelay: "0.35s" }}
            >
              <button
                onClick={handleApply}
                className="inline-flex items-center bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 pl-6 pr-2 py-2 text-[10px] font-bold tracking-[0.14em] text-white uppercase shadow-md shadow-amber-500/10 hover:-translate-y-0.5 transition-all duration-200 rounded-full border-none cursor-pointer gap-4"
              >
                Apply Now
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="#fff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center bg-transparent border border-slate-200 hover:border-amber-500/40 pl-6 pr-2 py-2 text-[10px] font-bold tracking-[0.14em] text-slate-700 uppercase hover:-translate-y-0.5 transition-all duration-200 rounded-full cursor-pointer gap-4"
              >
                Book Free Consultation
                <span className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="#334155"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>

            <div
              className="anim-fadeUp flex flex-wrap gap-2.5 justify-center md:justify-start pt-3"
              style={{ animationDelay: "0.45s" }}
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className={`border rounded-xl px-4 py-2.5 text-center min-w-[125px] ${s.color}`}
                >
                  <div className="text-lg font-black tracking-tight leading-none">
                    {s.num}
                  </div>
                  <div className="text-[9px] text-slate-400 mt-1 font-bold tracking-wider uppercase">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Media Display Column Container */}
          <div className="anim-fadeRight flex-none relative flex items-center justify-center min-w-0 w-full max-w-[440px] md:max-w-[460px] lg:max-w-[480px] overflow-visible py-12">
            {/* Interactive Dynamic Core Slideshow Housing */}
            <div className="anim-floatY relative z-10 w-full">
              <ImageSlideshow />
            </div>

            {/* Concentric Backing Graphic Rings */}
            <div className="absolute inset-0 hidden xl:flex items-center justify-center pointer-events-none overflow-visible">
              <div className="anim-ringA w-[460px] h-[460px] rounded-full border border-dashed border-amber-400/15" />
              <div className="anim-ringB absolute w-[350px] h-[350px] rounded-full border border-dashed border-blue-400/10" />
            </div>

            {/* Top Left Flag Meta Badge */}
            <FloatingBadge
              posClass="-top-6 left-0 lg:-left-12"
              animClass="anim-badgePop1"
              iconBg="bg-gradient-to-br from-amber-400 to-amber-500 shadow-md shadow-amber-500/15"
              title="98% Visa Accuracy"
              sub="Success Rate"
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              }
            />

            {/* Bottom Left Flag Meta Badge */}
            <FloatingBadge
              posClass="-bottom-6 left-0 lg:-left-12"
              animClass="anim-badgePop2"
              iconBg="bg-gradient-to-br from-blue-500 to-blue-600 shadow-md shadow-blue-500/15"
              title="5,000+ Placed"
              sub="Students Enrolled"
              icon={
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
              }
            />

            {/* Ambient Anchor Pulse Node */}
            <div className="absolute top-[36%] right-[3%] z-20 w-4 h-4 hidden sm:block">
              <div className="anim-pulseDot absolute inset-0 rounded-full bg-amber-500/25" />
              <div className="absolute inset-[3.5px] rounded-full bg-amber-500" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
