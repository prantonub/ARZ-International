import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  ArrowRight, 
  GraduationCap, 
  Star, 
  Award, 
  Users, 
  CheckCircle2,
  Calendar
} from "lucide-react";
import { goToApplicationForm } from "../utils/scrollToForm";
import { apiGet } from "../config/api";

const KEYFRAMES = `
  @keyframes fadeUp { 
    from { opacity: 0; transform: translateY(20px); } 
    to { opacity: 1; transform: translateY(0); } 
  }
  @keyframes floatY { 
    0%, 100% { transform: translateY(0px); } 
    50% { transform: translateY(-8px); } 
  }
  @keyframes badgePop { 
    0% { opacity: 0; transform: scale(0.85) translateY(10px); } 
    100% { opacity: 1; transform: scale(1) translateY(0); } 
  }
  @keyframes pulseDot { 
    0%, 100% { transform: scale(1); opacity: 1; } 
    50% { transform: scale(1.6); opacity: 0.3; } 
  }
  @keyframes imgFadeIn { 
    from { opacity: 0; transform: scale(1.02); } 
    to { opacity: 1; transform: scale(1); } 
  }
  @keyframes imgFadeOut { 
    from { opacity: 1; } 
    to { opacity: 0; } 
  }

  .anim-fadeUp { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .anim-floatY { animation: floatY 5s ease-in-out infinite; }
  .anim-badgePop1 { animation: badgePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s both; }
  .anim-badgePop2 { animation: badgePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s both; }
  .anim-pulseDot { animation: pulseDot 2s ease-in-out infinite; }
  .slide-current { animation: imgFadeIn 0.6s ease both; z-index: 2; position: absolute; inset: 0; }
  .slide-prev { animation: imgFadeOut 0.6s ease both; z-index: 1; position: absolute; inset: 0; }
  .font-hero { font-family: 'DM Sans', sans-serif; }
  .font-condensed { font-family: 'Fraunces', serif; }
`;

function ImageSlideshow() {
  const [heroImages, setHeroImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    apiGet("/homepage-images")
      .then((data) => {
        if (!isMounted) return;
        const urls = data.map((d) => d.image).filter(Boolean);
        if (urls.length > 0) {
          setHeroImages(urls);
          setCurrent(0);
        }
      })
      .catch((error) => {
        console.error("Failed to load homepage images:", error);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  // Timer logic specifically customized for first slide delay vs subsequent slides
  useEffect(() => {
    if (heroImages.length <= 1) return;

    // 7000ms delay for the 1st slide (index 0), 3500ms delay for 2nd, 3rd, etc.
    const delay = current === 0 ? 7000 : 3500;

    const timer = setTimeout(() => {
      setPrev(current);
      setCurrent((prevCurrent) => (prevCurrent + 1) % heroImages.length);
    }, delay);

    return () => clearTimeout(timer);
  }, [current, heroImages.length]);

  const goTo = (idx) => {
    if (idx === current) return;
    setPrev(current);
    setCurrent(idx);
  };

  if (loading) {
    return (
      <div className="w-full aspect-[4/3] sm:aspect-square rounded-3xl bg-slate-100 animate-pulse border border-slate-200/80" />
    );
  }

  if (heroImages.length === 0) {
    return (
      <div className="w-full aspect-[4/3] sm:aspect-square rounded-3xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
        <GraduationCap className="w-12 h-12 stroke-[1.5]" />
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[480px] mx-auto">
      {/* Outer Card Frame */}
      <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden border border-slate-200/80 bg-slate-900 shadow-2xl">
        {prev !== null && heroImages[prev] && (
          <img
            key={`prev-slide-${prev}`}
            src={heroImages[prev]}
            alt="ARZ Admissions Showcase"
            className="w-full h-full object-cover slide-prev"
          />
        )}
        <img
          key={`curr-slide-${current}`}
          src={heroImages[current]}
          alt="ARZ Admissions Display Portfolio"
          className="w-full h-full object-cover slide-current"
        />
        
        {/* Subtle Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent z-10 pointer-events-none" />
      </div>

      {/* Pagination Controls */}
      {heroImages.length > 1 && (
        <div className="flex gap-1.5 justify-center mt-4 relative z-30">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-amber-500" : "w-1.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FloatingBadge({ icon: Icon, title, sub, iconBg, animClass, posClass }) {
  return (
    <div
      className={`absolute hidden sm:flex items-center gap-3 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-3 shadow-lg shadow-slate-900/5 min-w-[210px] z-20 transition-all hover:scale-105 ${animClass} ${posClass}`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white shadow-sm ${iconBg}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-bold text-slate-900 tracking-tight block truncate">
          {title}
        </span>
        <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5 block truncate">
          {sub}
        </span>
      </div>
    </div>
  );
}

const STATS = [
  { num: "5,000+", label: "Students Placed", icon: Users },
  { num: "98%", label: "Visa Success Rate", icon: CheckCircle2 },
  { num: "40+", label: "Partner Universities", icon: GraduationCap },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleApply = () => goToApplicationForm(navigate, location.pathname);

  return (
    <>
      <style>{KEYFRAMES}</style>

      <section className="font-hero relative bg-gradient-to-b from-slate-50/50 via-white to-white overflow-hidden py-12 md:py-20 lg:py-24">
        {/* Background Accents */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.15) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-0 w-96 h-96 rounded-full bg-amber-100/50 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6 max-w-2xl mx-auto lg:mx-0">
              
              <div
                className="anim-fadeUp inline-flex items-center gap-2.5 bg-amber-50/80 border border-amber-200/80 rounded-full px-3.5 py-1.5 shadow-sm"
                style={{ animationDelay: "0.05s" }}
              >
                <span className="anim-pulseDot w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span className="text-amber-900 text-xs font-bold tracking-wider uppercase">
                  ARZ International Consultancy
                </span>
              </div>

              <h1
                className="font-condensed anim-fadeUp text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] text-slate-900 tracking-tight"
                style={{ animationDelay: "0.15s" }}
              >
                From Application <br className="hidden sm:inline" />
                To Visa, <span className="text-amber-500">We've Got</span> <br className="hidden sm:inline" />
                You Covered
              </h1>

              <p
                className="anim-fadeUp text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal"
                style={{ animationDelay: "0.25s" }}
              >
                We guide you through every step of the global education visa process—from selecting top universities to official embassy file preparation.
              </p>

              <div
                className="anim-fadeUp flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-2"
                style={{ animationDelay: "0.35s" }}
              >
                <button
                  onClick={handleApply}
                  className="inline-flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate("/contact")}
                  className="inline-flex items-center justify-center gap-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Book Free Consultation</span>
                </button>
              </div>

              <div
                className="anim-fadeUp pt-6 border-t border-slate-100 grid grid-cols-3 gap-3 sm:gap-6"
                style={{ animationDelay: "0.45s" }}
              >
                {STATS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="flex flex-col items-center lg:items-start">
                      <div className="flex items-center gap-1.5 text-slate-900 font-black text-xl sm:text-2xl">
                        <Icon className="w-4 h-4 text-amber-500 hidden sm:block" />
                        <span>{s.num}</span>
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 text-center lg:text-left">
                        {s.label}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="anim-floatY w-full relative">
                <ImageSlideshow />

                <FloatingBadge
                  posClass="-top-6 -left-4 lg:-left-8"
                  animClass="anim-badgePop1"
                  iconBg="bg-amber-500"
                  icon={Award}
                  title="98% Visa Rate"
                  sub="Accurate File Review"
                />

                <FloatingBadge
                  posClass="-bottom-6 -right-4 lg:-right-8"
                  animClass="anim-badgePop2"
                  iconBg="bg-blue-600"
                  icon={Star}
                  title="5,000+ Students"
                  sub="Enrolled Worldwide"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}