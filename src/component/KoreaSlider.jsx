import { useNavigate, useLocation } from "react-router-dom";
import YOUR_IMAGE_1 from "../assets/Studyinkorea (1).png";
import { goToApplicationForm } from "../utils/scrollToForm";

// 🔁 Change this to whichever image you want on the right
const heroImage = YOUR_IMAGE_1;

const benefits = [
    { icon: "🎓", text: "World-ranked universities with English programs" },
    { icon: "💰", text: "GKS full scholarship available for Bangladeshi students" },
    { icon: "🛂", text: "98% visa success rate with ARZ International" },
    { icon: "✈️", text: "Free airport pick-up on arrival day" },
    { icon: "🏠", text: "Verified dormitory & accommodation arranged" },
    { icon: "🌏", text: "Post-study work visa & PR pathway available" },
];

export default function KoreaHero() {
    const navigate = useNavigate();
    const location = useLocation();
    const applyNow = () => goToApplicationForm(navigate, location.pathname);
    return (
        <section
            className="w-full px-6 md:px-12 py-2 md:py-4"
            style={{ backgroundColor: "#f8f9ff", fontFamily: "'DM Sans', sans-serif" }}
        >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-14">

                {/* ── LEFT: Text content ── */}
                <div className="flex-1 flex flex-col gap-5">

                    {/* Label */}
                    <div
                        className="inline-flex items-center gap-2 self-start text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
                        style={{ background: "#1a2a6c", color: "#c9a84c" }}
                    >
                        <img
                            src="https://flagcdn.com/w40/kr.png"
                            alt="South Korea"
                            className="rounded-sm object-cover"
                            style={{ width: "18px", height: "12px" }}
                        />
                        South Korea
                    </div>

                    {/* Heading */}
                    <h1
                        className="font-black leading-tight"
                        style={{
                            fontFamily: "'Fraunces', serif",
                            fontSize:   "clamp(2rem, 4vw, 3rem)",
                            color:      "#1a2a6c",
                        }}
                    >
                        Study in{" "}
                        <span style={{ color: "#b01c2e" }}>South Korea</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-sm leading-relaxed" style={{ color: "#666", maxWidth: "420px" }}>
                        South Korea offers world-class education, rich culture, and incredible career opportunities.
                        ARZ International guides you from application to arrival — every step of the way.
                    </p>

                    {/* Benefits list */}
                    <ul className="flex flex-col gap-2.5">
                        {benefits.map((b, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm" style={{ color: "#444" }}>
                                <span
                                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-base"
                                    style={{ background: "#eef0fb" }}
                                >
                                    {b.icon}
                                </span>
                                {b.text}
                            </li>
                        ))}
                    </ul>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-2">
                        <button
                            onClick={applyNow}
                            className="px-4 py-2 rounded-full text-sm font-bold text-white transition-all duration-200 border-none cursor-pointer"
                            style={{ background: "#b01c2e", boxShadow: "0 4px 16px rgba(176,28,46,0.35)", fontFamily: "inherit" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#8e1422")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "#b01c2e")}
                        >
                            Apply Now →
                        </button>
                        <button
                            onClick={() => navigate("/contact")}
                            className="px-7 py-3 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer"
                            style={{ background: "transparent", color: "#1a2a6c", border: "2px solid #1a2a6c", fontFamily: "inherit" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#1a2a6c"; e.currentTarget.style.color = "#fff"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1a2a6c"; }}
                        >
                            Free Counseling
                        </button>
                    </div>
                </div>

                {/* ── RIGHT: Single image ── */}
                <div className="w-full md:w-1/2 flex-shrink-0" >
                    <img
                        src={heroImage}
                        alt="Study in South Korea"
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>

            </div>
        </section>
    );
}