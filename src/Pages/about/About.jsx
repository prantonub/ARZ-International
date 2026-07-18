import ApplyNow from "../../Component2/ApplyNow";

const values = [
    { title: "Honest Guidance", text: "We only recommend universities and programs that genuinely fit your grades, budget and goals — never the ones that pay the highest commission.", color: "#1a2a6c" },
    { title: "End-to-End Support", text: "From your first counseling session to the day you land on campus, one team stays with you through admissions, visa filing and pre-departure prep.", color: "#0f6e56" },
    { title: "Support Until Success", text: "Our job isn't done at the visa stamp. We stay reachable for accommodation, part-time work guidance and settling-in questions after you arrive.", color: "#b01c2e" },
];

const timeline = [
    { year: "Step 1", title: "Free Counseling", text: "We assess your academic background, budget and destination preferences." },
    { year: "Step 2", title: "University Shortlisting", text: "We match you with universities and programs where you're genuinely competitive." },
    { year: "Step 3", title: "Application & Documentation", text: "We prepare and submit your application, SOPs and supporting documents." },
    { year: "Step 4", title: "Visa & Departure", text: "We guide your visa filing, interview prep, and pre-departure orientation." },
];

export default function About() {
    return (
        <div className="bg-white">
            {/* Hero */}
            <div className="px-6 py-16 md:py-24 text-center" style={{ background: "linear-gradient(135deg,#101a47,#1a2a6c)" }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#e0c477" }}>About ARZ International</p>
                <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-5 max-w-3xl mx-auto">
                    Bangladesh's Trusted Partner for Studying Abroad
                </h1>
                <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    ARZ International helps students across Bangladesh get into the right university abroad — with honest counseling,
                    careful documentation, and support that continues long after the visa is stamped.
                </p>
                <div className="mt-8">
                    <ApplyNow className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-white cursor-pointer border-none bg-brand" />
                </div>
            </div>

            {/* Mission */}
            <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#c9a84c" }}>Our Mission</p>
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-4" style={{ color: "#1a2a6c" }}>
                        Support Until Success
                    </h2>
                    <p className="leading-relaxed mb-4" style={{ color: "#555" }}>
                        Choosing to study abroad is one of the biggest decisions a student and their family will make. We built ARZ
                        International to make that process transparent and manageable — clear requirements, realistic timelines, and a
                        team that answers the phone.
                    </p>
                    <p className="leading-relaxed" style={{ color: "#555" }}>
                        Today we work with students heading to South Korea, the United Kingdom, Australia and Europe, helping them
                        through university admissions, visa documentation and everything in between.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { value: "5,000+", label: "Students Placed" },
                        { value: "98%", label: "Visa Success Rate" },
                        { value: "40+", label: "Partner Universities" },
                        { value: "4", label: "Study Destinations" },
                    ].map((s) => (
                        <div key={s.label} className="rounded-2xl p-5 text-center" style={{ background: "#f8f9ff", border: "1px solid #eef0f8" }}>
                            <div className="font-display text-2xl font-black" style={{ color: "#1a2a6c" }}>{s.value}</div>
                            <div className="text-xs mt-1" style={{ color: "#888" }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Values */}
            <div className="px-6 py-16" style={{ background: "#f8f9ff" }}>
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#c9a84c" }}>What We Stand For</p>
                        <h2 className="font-display text-2xl md:text-3xl font-bold" style={{ color: "#1a2a6c" }}>Our Core Values</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {values.map((v) => (
                            <div key={v.title} className="bg-white rounded-2xl p-6" style={{ border: "1px solid #eef0f8" }}>
                                <div className="w-10 h-1.5 rounded-full mb-4" style={{ background: v.color }} />
                                <h3 className="font-display font-bold text-lg mb-2" style={{ color: "#1a2a6c" }}>{v.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: "#666" }}>{v.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Process timeline */}
            <div className="max-w-5xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#c9a84c" }}>How It Works</p>
                    <h2 className="font-display text-2xl md:text-3xl font-bold" style={{ color: "#1a2a6c" }}>Your Journey With Us</h2>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {timeline.map((t) => (
                        <div key={t.title} className="relative pl-5" style={{ borderLeft: "3px solid #eef0f8" }}>
                            <div className="text-xs font-bold uppercase mb-2" style={{ color: "#b01c2e" }}>{t.year}</div>
                            <h3 className="font-display font-bold mb-1.5" style={{ color: "#1a2a6c" }}>{t.title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: "#666" }}>{t.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
