import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import KoreaSlider from "../../component/KoreaSlider";
import { goToApplicationForm } from "../../utils/scrollToForm";



// ── Data ──────────────────────────────────────────────────────
const programs = [
    {
        id: "klp",
        label: "Korean Language (KLP)",
        short: "KLP",
        color: "#1a2a6c",
        universities: [
            { name: "Hanyang University", code: "HY", website: "https://www.hanyang.ac.kr", rank: "#1 KLP", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Hanyang_University_seal.svg/120px-Hanyang_University_seal.svg.png" },
            { name: "SKKU (Sungkyunkwan)", code: "SK", website: "https://www.skku.edu", rank: "Top 3", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/SKKU_seal.svg/120px-SKKU_seal.svg.png" },
            { name: "Dankook University", code: "DK", website: "https://www.dankook.ac.kr", rank: "Popular", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/43/Dankook_University_seal.svg/120px-Dankook_University_seal.svg.png" },
            { name: "Hansung University", code: "HS", website: "https://www.hansung.ac.kr", rank: "Seoul", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Hansung_University_seal.svg/120px-Hansung_University_seal.svg.png" },
            { name: "Konkuk University", code: "KK", website: "https://www.konkuk.ac.kr", rank: "Seoul", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Konkuk_University_seal.svg/120px-Konkuk_University_seal.svg.png" },
            { name: "Mokwon University", code: "MW", website: "https://www.mokwon.ac.kr", rank: "Daejeon", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Mokwon_University_seal.svg/120px-Mokwon_University_seal.svg.png" },
            { name: "Suwon University", code: "SW", website: "https://www.suwon.ac.kr", rank: "Budget", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Suwon_University.svg/120px-Suwon_University.svg.png" },
        ],
        requirements: [
            {
                title: "Academic",
                color: "#1a2a6c",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
                items: [
                    "Must complete HSC / Diploma (4 years) to apply",
                    "Alim Certificate accepted only if from science background",
                    "Passing year 2023 or later — GPA must be above 3.5",
                    "If SSC GPA below 3.5, HSC GPA must be above 4.0",
                    "Vocational Certificate not accepted",
                    "Date of Birth must be 2004 (2003 accepted with TOPIK certificate)",
                ],
            },
            {
                title: "Financial",
                color: "#0f6e56",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>,
                items: [
                    "Only parents can be the sponsor",
                    "Bank balance must be in parent's or student's name",
                    "Savings account required",
                    "Multiple accounts allowed — minimum 5 lac BDT in each",
                    "FDR can be submitted alongside savings account",
                    <>Account must show minimum <strong>18 lac BDT</strong> as last balance</>,
                ],
            },
            {
                title: "Other",
                color: "#b01c2e",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
                items: [
                    "Name mismatch between parents and certificate — affidavit accepted. Completely different name must be corrected before applying",
                    "Family relationship certificate must be under student's name with parents' names matching NID/Passport",
                ],
            },
        ],
    },
    {
        id: "eap",
        label: "EAP Program",
        short: "EAP",
        color: "#0f6e56",
        universities: [
            { name: "Mokwon University", code: "MW", website: "https://www.mokwon.ac.kr", rank: "Featured", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Mokwon_University_seal.svg/120px-Mokwon_University_seal.svg.png" },
            { name: "Hanseo University", code: "HE", website: "https://www.hanseo.ac.kr", rank: "Aviation", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Hanseo_University_seal.svg/120px-Hanseo_University_seal.svg.png" },
        ],
        comingSoon: true,
        requirements: [
            {
                title: "Academic",
                color: "#1a2a6c",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
                items: [
                    "Must have completed HSC / A-levels or equivalent",
                    "Minimum GPA 3.0 in both SSC and HSC",
                    "English proficiency required — IELTS 5.5 or equivalent preferred",
                    "Science or Commerce background preferred",
                    "Age limit: 18–28 years at time of application",
                ],
            },
            {
                title: "Financial",
                color: "#0f6e56",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>,
                items: [
                    "Sponsor must be parent or legal guardian",
                    <>Minimum bank balance of <strong>20 lac BDT</strong> required</>,
                    "Savings or fixed deposit account accepted",
                    "Bank statement must cover last 6 months",
                    "Consistent transactions preferred",
                ],
            },
            {
                title: "Other",
                color: "#b01c2e",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
                items: [
                    "Valid passport with minimum 2 years validity",
                    "No criminal record — police clearance required",
                    "Medical certificate from approved hospital",
                    "Name on all documents must match exactly or affidavit required",
                ],
            },
        ],
    },
    {
        id: "bachelor",
        label: "Bachelor's",
        short: "Bach.",
        color: "#b01c2e",
        universities: [
            { name: "Seoul National Univ.", code: "SN", website: "https://www.snu.ac.kr", rank: "#1 Korea", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Seoul_National_University_seal.svg/120px-Seoul_National_University_seal.svg.png" },
            { name: "KAIST", code: "KA", website: "https://www.kaist.ac.kr", rank: "STEM #1", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/KAIST_emblem.svg/120px-KAIST_emblem.svg.png" },
            { name: "Yonsei University", code: "YU", website: "https://www.yonsei.ac.kr", rank: "SKY", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/27/Yonsei_University_Emblem.svg/120px-Yonsei_University_Emblem.svg.png" },
            { name: "Korea University", code: "KU", website: "https://www.korea.ac.kr", rank: "SKY", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Korea_University_seal.svg/120px-Korea_University_seal.svg.png" },
            { name: "POSTECH", code: "PT", website: "https://www.postech.ac.kr", rank: "Engineering", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/POSTECH_logo.svg/120px-POSTECH_logo.svg.png" },
            { name: "Hanyang University", code: "HY", website: "https://www.hanyang.ac.kr", rank: "Top Pick", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Hanyang_University_seal.svg/120px-Hanyang_University_seal.svg.png" },
            { name: "Ewha Womans Univ.", code: "EW", website: "https://www.ewha.ac.kr", rank: "Top Women's", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Ewha_Womans_University_seal.svg/120px-Ewha_Womans_University_seal.svg.png" },
            { name: "Sogang University", code: "SG", website: "https://www.sogang.ac.kr", rank: "Business", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/Sogang_University_seal.svg/120px-Sogang_University_seal.svg.png" },
            { name: "Inha University", code: "IH", website: "https://www.inha.ac.kr", rank: "Incheon", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Inha_University_Emblem.svg/120px-Inha_University_Emblem.svg.png" },
        ],
        requirements: [
            {
                title: "Academic",
                color: "#1a2a6c",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
                items: [
                    "Minimum HSC or equivalent (12 years of education)",
                    "GPA 3.5 or above in both SSC and HSC recommended",
                    "TOPIK Level 3+ required for Korean-medium programs",
                    "English-medium programs may require IELTS 6.0+",
                    "Passing year 2022 or later preferred",
                    "Gap year applicants must provide valid reason letter",
                ],
            },
            {
                title: "Financial",
                color: "#0f6e56",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>,
                items: [
                    <>Minimum bank balance of <strong>25 lac BDT</strong></>,
                    "Sponsor must be parent, sibling, or legal guardian",
                    "Solvency certificate showing annual income above 5 lac BDT",
                    "FDR or savings account both accepted",
                    "Joint account allowed if student is a co-holder",
                ],
            },
            {
                title: "Other",
                color: "#b01c2e",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
                items: [
                    "Passport must be valid for at least 2 years",
                    "Birth certificate and national ID required",
                    "Statement of Purpose (SOP) — 500 to 800 words",
                    "Two recommendation letters from teachers or employers",
                    "All documents must be officially translated if not in Korean or English",
                ],
            },
        ],
    },
    {
        id: "masters",
        label: "Master's / PhD",
        short: "Master's",
        color: "#c9a84c",
        universities: [
            { name: "Seoul National Univ.", code: "SN", website: "https://www.snu.ac.kr", rank: "#1 Korea", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Seoul_National_University_seal.svg/120px-Seoul_National_University_seal.svg.png" },
            { name: "KAIST", code: "KA", website: "https://www.kaist.ac.kr", rank: "Research", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/KAIST_emblem.svg/120px-KAIST_emblem.svg.png" },
            { name: "Yonsei University", code: "YU", website: "https://www.yonsei.ac.kr", rank: "SKY", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/27/Yonsei_University_Emblem.svg/120px-Yonsei_University_Emblem.svg.png" },
            { name: "POSTECH", code: "PT", website: "https://www.postech.ac.kr", rank: "STEM PhD", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/POSTECH_logo.svg/120px-POSTECH_logo.svg.png" },
            { name: "Korea University", code: "KU", website: "https://www.korea.ac.kr", rank: "Business", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Korea_University_seal.svg/120px-Korea_University_seal.svg.png" },
        ],
        requirements: [
            {
                title: "Academic",
                color: "#1a2a6c",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
                items: [
                    "Bachelor's degree in a relevant field (minimum 4 years)",
                    "CGPA of 3.0 or above on a 4.0 scale",
                    "TOPIK Level 4+ for Korean-medium programs",
                    "IELTS 6.5+ or TOEFL 90+ for English-medium programs",
                    "Research proposal required for research-track programs",
                ],
            },
            {
                title: "Financial",
                color: "#0f6e56",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>,
                items: [
                    <>Minimum bank balance of <strong>30 lac BDT</strong></>,
                    "Self-sponsorship allowed with proof of employment",
                    "Scholarship holders still need to show minimum 10 lac BDT",
                    "Bank statement for the last 12 months required",
                    "Sponsor's income tax certificate may be requested",
                ],
            },
            {
                title: "Other",
                color: "#b01c2e",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
                items: [
                    "Detailed CV / Resume required",
                    "Statement of Purpose (SOP) — 800 to 1200 words",
                    "Two academic or professional recommendation letters",
                    "Original transcripts and degree certificate required",
                    "Interview may be required by some universities",
                ],
            },
        ],
    },
];

// ── University Card ───────────────────────────────────────────
const UniCard = ({ uni, accent }) => {
    const [hovered, setHovered] = useState(false);
    const [imgErr, setImgErr] = useState(false);

    return (
        <a
            href={uni.website}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex flex-col items-center gap-2 rounded-2xl p-4 text-center transition-all duration-200"
            style={{
                background: hovered ? "#fff" : "#f8f9ff",
                border: `2px solid ${hovered ? accent : "#eef0f8"}`,
                boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.09)" : "none",
                transform: hovered ? "translateY(-3px)" : "translateY(0)",
                textDecoration: "none",
                cursor: "pointer",
            }}
        >
            <div
                className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden"
                style={{ background: "#f0f2f8", border: "1px solid #e8eaf2" }}
            >
                {imgErr ? (
                    <span className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm text-white"
                        style={{ background: accent }}>{uni.code}</span>
                ) : (
                    <img src={uni.logo} alt={uni.name} className="w-10 h-10 object-contain"
                        onError={() => setImgErr(true)} />
                )}
            </div>
            <p className="text-xs font-bold leading-tight" style={{ color: "#1a2a6c" }}>{uni.name}</p>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}>
                {uni.rank}
            </span>
            {hovered && <span className="text-xs" style={{ color: "#bbb" }}>Visit →</span>}
        </a>
    );
};

// ── Requirement Card ──────────────────────────────────────────
const ReqCard = ({ req }) => (
    <div className="rounded-2xl p-5 flex flex-col gap-3"
        style={{ background: "#fff", border: "1.5px solid #eef0f8", boxShadow: "0 2px 12px rgba(26,42,108,0.05)" }}>
        <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${req.color}14`, color: req.color }}>{req.icon}</div>
            <h4 className="font-bold text-sm" style={{ color: "#1a2a6c" }}>{req.title} Qualification</h4>
        </div>
        <div style={{ height: "1px", background: "#f0f2f8" }} />
        <ul className="flex flex-col gap-2.5">
            {req.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: req.color }} />
                    <span className="text-xs leading-relaxed" style={{ color: "#555" }}>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

// ── Main Component ────────────────────────────────────────────
export default function ProgramsSection() {
    const [activeId, setActiveId] = useState("klp");
    const navigate = useNavigate();
    const location = useLocation();
    const applyNow = () => goToApplicationForm(navigate, location.pathname);
    const active = programs.find((p) => p.id === activeId);

    return (
        <section
            className="py-16 px-4"
            style={{ backgroundColor: "#f8f9ff", fontFamily: "'DM Sans', sans-serif" }}
        >





        <KoreaSlider></KoreaSlider>
















            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                        style={{ background: "#1a2a6c", color: "#c9a84c" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
                        </svg>
                        Programs & Requirements
                    </div>
                    <h2 className="font-black leading-tight mb-3"
                        style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#1a2a6c" }}>
                        Universities &{" "}
                        <span style={{ color: "#b01c2e" }}>Admission Requirements</span>
                    </h2>
                    <p className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: "#777" }}>
                        Select a program to see partner universities and eligibility criteria.
                    </p>
                </div>

                {/* PROGRAM TABS */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {programs.map((p) => {
                        const isActive = activeId === p.id;
                        return (
                            <button
                                key={p.id}
                                onClick={() => setActiveId(p.id)}
                                className="px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 flex items-center gap-2"
                                style={{
                                    backgroundColor: isActive ? p.color : "#fff",
                                    color: isActive ? "#fff" : "#1a2a6c",
                                    border: isActive ? `2px solid ${p.color}` : "2px solid #e0e3f0",
                                    boxShadow: isActive ? `0 4px 14px ${p.color}40` : "none",
                                    fontFamily: "inherit",
                                }}
                            >
                                {p.label}
                                <span
                                    className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                                    style={{
                                        background: isActive ? "rgba(255,255,255,0.25)" : "#f0f2f8",
                                        color: isActive ? "#fff" : "#888",
                                    }}
                                >
                                    {p.universities.length}{p.comingSoon ? "+" : ""}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* CONTENT CARD */}
                <div className="rounded-3xl overflow-hidden"
                    style={{ border: "1.5px solid #e8eaf2", boxShadow: "0 4px 24px rgba(26,42,108,0.08)", background: "#fff" }}>

                    {/* ── UNIVERSITIES SECTION ── */}
                    <div className="px-6 md:px-8 pt-8 pb-6">
                        {/* Section label */}
                        <div className="flex items-center gap-3 mb-5">
                            <span className="text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full text-white"
                                style={{ background: active.color }}>
                                {active.short}
                            </span>
                            <span className="font-bold text-sm" style={{ color: "#1a2a6c" }}>Partner Universities</span>
                            <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                                style={{ background: "#f0f2f8", color: "#888" }}>
                                {active.universities.length} universities{active.comingSoon ? " + more soon" : ""}
                            </span>
                        </div>

                        {/* University grid */}
                        <div className="grid gap-3"
                            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(125px, 1fr))" }}>
                            {active.universities.map((uni) => (
                                <UniCard key={uni.name} uni={uni} accent={active.color} />
                            ))}

                            {/* Coming soon */}
                            {active.comingSoon && (
                                <div className="flex flex-col items-center justify-center gap-2 rounded-2xl p-4 text-center"
                                    style={{ background: "#f8f9ff", border: "2px dashed #e0e3f0", minHeight: "130px" }}>
                                    <div className="w-7 h-7 rounded-full flex items-center justify-center"
                                        style={{ background: "#f0f2f8" }}>
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round">
                                            <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-semibold" style={{ color: "#bbb" }}>More soon</span>
                                </div>
                            )}
                        </div>

                        <p className="text-xs mt-4 flex items-center gap-1.5" style={{ color: "#bbb" }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Click any university card to visit their official website
                        </p>
                    </div>

                    {/* ── DIVIDER WITH LABEL ── */}
                    <div className="flex items-center gap-4 px-6 md:px-8 py-4"
                        style={{ background: `${active.color}08`, borderTop: `1px solid ${active.color}20`, borderBottom: `1px solid ${active.color}20` }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active.color} strokeWidth="2" strokeLinecap="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                        </svg>
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: active.color, letterSpacing: "0.12em" }}>
                            Admission Requirements — {active.label}
                        </span>
                    </div>

                    {/* ── REQUIREMENTS SECTION ── */}
                    <div className="px-6 md:px-8 py-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {active.requirements.map((req) => (
                                <ReqCard key={req.title} req={req} />
                            ))}
                        </div>

                        {/* Important note */}
                        <div className="mt-5 rounded-xl px-4 py-3 flex items-start gap-2.5"
                            style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)" }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0 mt-0.5">
                                <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                            </svg>
                            <p className="text-xs leading-relaxed" style={{ color: "#7a5f1a" }}>
                                <strong>Note:</strong> Requirements may vary slightly by university. ARZ International reviews all documents before submission and guides you through any corrections.
                            </p>
                        </div>
                    </div>

                    {/* ── BOTTOM CTA ── */}
                    <div className="flex flex-wrap items-center justify-between gap-4 px-6 md:px-8 py-5"
                        style={{ borderTop: "1px solid #f0f2f8", background: "#fafbff" }}>
                        <div>
                            <p className="text-sm font-bold" style={{ color: "#1a2a6c" }}>
                                Ready to apply for {active.label}?
                            </p>
                            <p className="text-xs" style={{ color: "#aaa" }}>Our counselors will guide you step by step.</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={applyNow} className="px-6 py-2.5 rounded-full text-xs font-bold text-white transition-all border-none cursor-pointer"
                                style={{ background: "#b01c2e", fontFamily: "inherit" }}>
                                Apply Now →
                            </button>
                            <button onClick={() => navigate("/contact")} className="px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer"
                                style={{ background: "#fff", color: "#1a2a6c", border: "2px solid #1a2a6c", fontFamily: "inherit" }}>
                                Free Counseling
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}




