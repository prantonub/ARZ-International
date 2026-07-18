import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function WhatWeDo() {
    const navigate = useNavigate();

    const cardBase = "rounded-2xl p-6 relative overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-300";

    const Tag = ({ bg, color, children }) => (
        <span
            className="inline-block text-xs font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full mb-2"
            style={{ background: bg, color }}
        >
            {children}
        </span>
    );

    const Icon = ({ bg, children }) => (
        <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
            style={{ background: bg }}
        >
            {children}
        </div>
    );

    const Num = ({ color, children }) => (
        <span
            className="absolute bottom-3 right-4 text-6xl font-black pointer-events-none select-none"
            style={{ opacity: 0.07, color, lineHeight: 1 }}
        >
            {children}
        </span>
    );

    return (
        <section
            className="py-14 px-4 relative overflow-hidden"
            style={{ backgroundColor: "#f8f9ff", fontFamily: "'DM Sans', sans-serif" }}
        >
            {/* Dot grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(rgba(26,42,108,0.07) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />

            <div className="max-w-6xl mx-auto relative" style={{ zIndex: 1 }}>

                {/* HEADER */}
                <Header title={"What We Do"} subTitle={"Everything You Need,"} subTitle2={"All in One Place"} text={"From the first step to settling in abroad — Arz International handles every detail so you can focus on your future."}></Header>

                {/* ── BENTO GRID ─────────────────────────────────────────────
            Mobile  (default) : 1 column  — every card full width
            Tablet  (sm:)     : 2 columns — wide cards span 2, tall cards span 1
            Desktop (lg:)     : 3 columns — full bento layout
        ────────────────────────────────────────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

                    {/* 1 — Counselling · navy · wide on sm+, col-span-2 on lg */}
                    <div
                        className={`${cardBase} sm:col-span-2 lg:col-span-2`}
                        style={{ backgroundColor: "#1a2a6c", color: "#fff" }}
                    >
                        <Icon bg="rgba(201,168,76,0.18)">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round">
                                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                            </svg>
                        </Icon>
                        <Tag bg="rgba(201,168,76,0.18)" color="#c9a84c">First Step</Tag>
                        <h3 className="font-bold text-base mb-2">Free Career & Country Counselling</h3>
                        <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.65)" }}>
                            One-on-one sessions with expert advisors. We assess your profile, recommend the right country
                            and program, and build a personalised roadmap — completely free.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {["Profile Assessment", "Country Matching", "Scholarship Guidance"].map((t) => (
                                <span key={t} className="text-xs px-2.5 py-0.5 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}>{t}</span>
                            ))}
                        </div>
                        <Num color="#fff">01</Num>
                    </div>

                    {/* 2 — Visa · red · row-span-2 on sm+ (spans rows 1-2 in col 2 on tablet, col 3 on desktop) */}
                    <div
                        className={`${cardBase} sm:row-span-2`}
                        style={{ backgroundColor: "#b01c2e", color: "#fff" }}
                    >
                        <Icon bg="rgba(255,255,255,0.15)">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                                <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20M7 15h2M11 15h4" />
                            </svg>
                        </Icon>
                        <Tag bg="rgba(255,255,255,0.15)" color="#fff">98% Success</Tag>
                        <h3 className="font-bold text-lg mb-2 leading-snug">Visa Documentation & Embassy Prep</h3>
                        <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.72)" }}>
                            We handle every document — financial statements, SOP, recommendation letters, official
                            translations — and coach you for your embassy interview with mock sessions.
                        </p>
                        <div className="rounded-xl p-3" style={{ background: "rgba(0,0,0,0.2)" }}>
                            <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>Our visa success rate</div>
                            <div className="text-3xl font-extrabold text-white mb-2">98<span className="text-lg">%</span></div>
                            <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }}>
                                <div className="h-full rounded-full bg-white" style={{ width: "98%" }} />
                            </div>
                        </div>
                        <Num color="#fff">02</Num>
                    </div>

                    {/* 3 — University Admissions · white */}
                    <div
                        className={cardBase}
                        style={{ backgroundColor: "#fff", color: "#1a2a6c", border: "1.5px solid #e8eaf2" }}
                    >
                        <Icon bg="#f0f2ff">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#1a2a6c" strokeWidth="2" strokeLinecap="round">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
                            </svg>
                        </Icon>
                        <Tag bg="#eef0ff" color="#1a2a6c">200+ Universities</Tag>
                        <h3 className="font-bold text-base mb-2">University Admissions</h3>
                        <p className="text-xs leading-relaxed" style={{ color: "#666" }}>
                            Complete application management for undergraduate, postgraduate, and PhD programs
                            across our global partner universities.
                        </p>
                        <Num color="#1a2a6c">03</Num>
                    </div>

                    {/* 4 — Interview Prep · gold */}
                    <div
                        className={cardBase}
                        style={{ backgroundColor: "#c9a84c", color: "#1a2a6c" }}
                    >
                        <Icon bg="rgba(26,42,108,0.15)">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#1a2a6c" strokeWidth="2" strokeLinecap="round">
                                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                            </svg>
                        </Icon>
                        <Tag bg="rgba(26,42,108,0.12)" color="#1a2a6c">Interview Prep</Tag>
                        <h3 className="font-bold text-base mb-2">Mock Interview Coaching</h3>
                        <p className="text-xs leading-relaxed" style={{ color: "rgba(26,42,108,0.72)" }}>
                            Realistic embassy and university interview simulations with feedback on body language,
                            answers, and confidence.
                        </p>
                        <Num color="#1a2a6c">04</Num>
                    </div>

                    {/* 5 — Airport Pick-Up · teal */}
                    <div
                        className={cardBase}
                        style={{ backgroundColor: "#0f6e56", color: "#fff" }}
                    >
                        <Icon bg="rgba(255,255,255,0.15)">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                            </svg>
                        </Icon>
                        <Tag bg="rgba(255,255,255,0.15)" color="#fff">Day-1 Ready</Tag>
                        <h3 className="font-bold text-base mb-2">Airport Pick-Up & Arrival</h3>
                        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                            Our local reps meet you at the airport, assist with SIM, currency exchange,
                            and get you safely to your accommodation.
                        </p>
                        <Num color="#fff">05</Num>
                    </div>

                    {/* 6 — Dormitory · cream · wide on sm+, col-span-2 on lg */}
                    <div
                        className={`${cardBase} sm:col-span-2 lg:col-span-2`}
                        style={{ backgroundColor: "#fdf6ec", color: "#1a2a6c" }}
                    >
                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                            <div className="flex-1">
                                <Icon bg="#fff" style={{ border: "1px solid #e8eaf2" }}>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#b01c2e" strokeWidth="2" strokeLinecap="round">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                                    </svg>
                                </Icon>
                                <Tag bg="#fdecea" color="#b01c2e">Housing</Tag>
                                <h3 className="font-bold text-base mb-2">Dormitory & Accommodation Support</h3>
                                <p className="text-xs leading-relaxed" style={{ color: "#666" }}>
                                    We arrange verified student dorms, shared apartments, or homestays near your campus
                                    — with contracts reviewed before you sign anything.
                                </p>
                            </div>
                            <div
                                className="w-full sm:w-auto flex-shrink-0 rounded-2xl p-4"
                                style={{ background: "#fff", border: "1px solid #e8eaf2", minWidth: "145px" }}
                            >
                                <div className="text-xs mb-3" style={{ color: "#999" }}>What's included</div>
                                {["Room Booking", "Contract Review", "Bank Account Setup", "Local SIM & WiFi"].map((item) => (
                                    <div key={item} className="flex items-center gap-2 mb-2">
                                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#b01c2e" }} />
                                        <span className="text-xs" style={{ color: "#1a2a6c", fontWeight: 600 }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Num color="#1a2a6c">06</Num>
                    </div>

                    {/* 7 — Alumni · dark navy */}
                    <div
                        className={cardBase}
                        style={{ backgroundColor: "#0a1235", color: "#fff", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                        <Icon bg="rgba(201,168,76,0.15)">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round">
                                <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                            </svg>
                        </Icon>
                        <Tag bg="rgba(201,168,76,0.15)" color="#c9a84c">Ongoing</Tag>
                        <h3 className="font-bold text-base mb-2">Alumni & Ongoing Support</h3>
                        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                            Connect with Arz alumni already living abroad. Get job leads, tips, and a community
                            that has your back long after you land.
                        </p>
                        <Num color="#fff">07</Num>
                    </div>

                    {/* 8 — Pre-Departure · slate */}
                    <div
                        className={cardBase}
                        style={{ backgroundColor: "#1e3a8a", color: "#fff" }}
                    >
                        <Icon bg="rgba(255,255,255,0.12)">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                            </svg>
                        </Icon>
                        <Tag bg="rgba(255,255,255,0.12)" color="#fff">Before You Fly</Tag>
                        <h3 className="font-bold text-base mb-2">Pre-Departure Orientation</h3>
                        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                            Packing lists, cultural briefings, health insurance setup, and a full airport walkthrough
                            so nothing surprises you on departure day.
                        </p>
                        <Num color="#fff">08</Num>
                    </div>

                </div>

                {/* FOOTER CTA */}
                <div
                    className="mt-4 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    style={{ background: "#1a2a6c" }}
                >
                    <div>
                        <p className="text-sm font-semibold text-white">Ready to take the first step?</p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                            Free consultation — no commitment required.
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/contact")}
                        className="px-6 py-2.5 rounded-full text-xs font-extrabold tracking-wide whitespace-nowrap border-none cursor-pointer"
                        style={{ backgroundColor: "#c9a84c", color: "#1a2a6c" }}
                    >
                        Book Free Consultation →
                    </button>
                </div>

            </div>
        </section>
    );
}