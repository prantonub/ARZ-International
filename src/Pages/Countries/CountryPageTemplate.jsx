import { useNavigate, useLocation } from "react-router-dom";
import { goToApplicationForm } from "../../utils/scrollToForm";

const CheckIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0f6e56" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

/**
 * Data-driven country landing page. Keeps every destination page visually
 * consistent (same theme, spacing, responsive behaviour) while letting each
 * country supply its own facts.
 */
export default function CountryPageTemplate({
    flag,
    name,
    heroImage,
    tagline,
    overview,
    highlights = [],
    popularFields = [],
    universities = [],
    requirements = [],
    intakes = [],
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const apply = () => goToApplicationForm(navigate, location.pathname);

    return (
        <div className="bg-white">
            {/* HERO */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src={heroImage} alt={`Study in ${name}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(16,26,71,0.92), rgba(26,42,108,0.75))" }} />
                </div>
                <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
                        <img src={`https://flagcdn.com/w40/${flag}.png`} alt="" className="w-5 h-3.5 rounded-sm object-cover" />
                        <span className="text-xs font-bold uppercase tracking-widest text-white">Study Destination</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-white max-w-2xl mb-5 leading-tight">
                        Study in <span style={{ color: "#e0c477" }}>{name}</span>
                    </h1>
                    <p className="text-slate-200 max-w-xl mb-8 leading-relaxed">{tagline}</p>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={apply} className="px-7 py-3 rounded-full text-sm font-bold text-white border-none cursor-pointer" style={{ background: "#b01c2e" }}>
                            Apply Now →
                        </button>
                        <button onClick={() => navigate("/contact")} className="px-7 py-3 rounded-full text-sm font-bold text-white border-2 border-white bg-transparent cursor-pointer">
                            Free Counseling
                        </button>
                    </div>
                </div>
            </div>

            {/* OVERVIEW */}
            <div className="max-w-5xl mx-auto px-6 py-16">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#c9a84c" }}>Overview</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-5" style={{ color: "#1a2a6c" }}>Why Study in {name}?</h2>
                <p className="leading-relaxed mb-8" style={{ color: "#555" }}>{overview}</p>

                <div className="grid sm:grid-cols-2 gap-4">
                    {highlights.map((h) => (
                        <div key={h.title} className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: "#f8f9ff", border: "1px solid #eef0f8" }}>
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#eef0ff", color: "#1a2a6c" }}>
                                {h.icon}
                            </div>
                            <div>
                                <div className="font-semibold text-sm mb-0.5" style={{ color: "#1a2a6c" }}>{h.title}</div>
                                <div className="text-xs leading-relaxed" style={{ color: "#777" }}>{h.text}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* POPULAR FIELDS */}
            {popularFields.length > 0 && (
                <div className="px-6 py-16" style={{ background: "#f8f9ff" }}>
                    <div className="max-w-5xl mx-auto">
                        <p className="text-xs font-bold uppercase tracking-widest mb-3 text-center" style={{ color: "#c9a84c" }}>What to Study</p>
                        <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center" style={{ color: "#1a2a6c" }}>Popular Fields of Study</h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {popularFields.map((f) => (
                                <span key={f} className="px-4 py-2 rounded-full text-sm font-semibold bg-white" style={{ border: "1.5px solid #e5e7f0", color: "#1a2a6c" }}>{f}</span>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* UNIVERSITIES */}
            {universities.length > 0 && (
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <p className="text-xs font-bold uppercase tracking-widest mb-3 text-center" style={{ color: "#c9a84c" }}>Partner Institutions</p>
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-10 text-center" style={{ color: "#1a2a6c" }}>Universities We Work With</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {universities.map((u) => (
                            <div key={u.name} className="p-5 rounded-2xl transition-shadow duration-200 hover:shadow-lg" style={{ border: "1px solid #eef0f8" }}>
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-display font-bold text-base" style={{ color: "#1a2a6c" }}>{u.name}</h3>
                                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full" style={{ background: "#fdf3e2", color: "#a4863a" }}>{u.tag}</span>
                                </div>
                                <p className="text-xs" style={{ color: "#888" }}>{u.location}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* REQUIREMENTS + INTAKES */}
            <div className="px-6 py-16" style={{ background: "#f8f9ff" }}>
                <div className="max-w-5xl mx-auto grid md:grid-cols-[1.3fr_1fr] gap-10">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#c9a84c" }}>Requirements</p>
                        <h2 className="font-display text-2xl font-bold mb-5" style={{ color: "#1a2a6c" }}>What You'll Need</h2>
                        <ul className="space-y-3">
                            {requirements.map((r) => (
                                <li key={r} className="flex items-start gap-2.5 text-sm" style={{ color: "#444" }}>
                                    <CheckIcon />
                                    <span>{r}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #eef0f8", height: "fit-content" }}>
                        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#c9a84c" }}>Intakes</p>
                        <div className="space-y-3">
                            {intakes.map((i) => (
                                <div key={i} className="flex items-center gap-2.5 text-sm font-semibold" style={{ color: "#1a2a6c" }}>
                                    <span className="w-2 h-2 rounded-full" style={{ background: "#b01c2e" }} />
                                    {i}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="px-6 py-16 text-center">
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4" style={{ color: "#1a2a6c" }}>
                    Ready to Start Your {name} Journey?
                </h2>
                <p className="mb-7" style={{ color: "#666" }}>Book a free counseling session and let's map out your path together.</p>
                <button onClick={apply} className="px-8 py-3.5 rounded-full text-sm font-bold text-white border-none cursor-pointer" style={{ background: "#b01c2e" }}>
                    Apply Now →
                </button>
            </div>
        </div>
    );
}
