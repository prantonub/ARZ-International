import { useNavigate } from "react-router-dom";
import koreaimg from "../assets/southkorea.jpg";
import ukimg from "../assets/Uk.jpg";
import ausimg from "../assets/australia.jpg";

const europeimg = "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80";

import ARZ_LOGO_URL from "../assets/arzlogo.jpeg";
import Header from "./Header";

const destinations = [
  { id: 1, name: "South Korea", placeImg: koreaimg, code: "kr", path: "/southkorea", universities: "20+", avgTuition: "$4,000/yr", intake: "Mar & Sep", badge: "Most Popular" },
  { id: 2, name: "United Kingdom", placeImg: ukimg, code: "gb", path: "/uk", universities: "40+", avgTuition: "$18,000/yr", intake: "Sep & Jan", badge: "Fast Process" },
  { id: 3, name: "Australia", placeImg: ausimg, code: "au", path: "/australia", universities: "30+", avgTuition: "$16,000/yr", intake: "Feb & Jul", badge: "PR Friendly" },
  { id: 4, name: "Europe", placeImg: europeimg, code: "eu", path: "/europe", universities: "25+", avgTuition: "$3,000/yr", intake: "Sep & Feb", badge: "Affordable" },
];

// Inject keyframe animation into <head> once
const styleId = "arz-logo-anim";
if (typeof document !== "undefined" && !document.getElementById(styleId)) {
  const style = document.createElement("style");
  style.id = styleId;
  style.innerHTML = `
    @keyframes arzFloat {
      0%   { transform: translate(-50%, -50%) translateX(0px)   translateY(0px)   rotate(0deg);   }
      25%  { transform: translate(-50%, -50%) translateX(28px)  translateY(-20px) rotate(3deg);   }
      50%  { transform: translate(-50%, -50%) translateX(10px)  translateY(22px)  rotate(-2deg);  }
      75%  { transform: translate(-50%, -50%) translateX(-24px) translateY(-10px) rotate(2deg);   }
      100% { transform: translate(-50%, -50%) translateX(0px)   translateY(0px)   rotate(0deg);   }
    }
  `;
  document.head.appendChild(style);
}

export default function TopDestinations() {
  const navigate = useNavigate();

  return (
    <section
      className="py-12 px-4 relative overflow-hidden"
      style={{ backgroundColor: "#f0f2f8" }}
    >
      {/* ANIMATED ARZ LOGO WATERMARKS */}
      {[{ top: "13%", left: "15%" }, { top: "13%", left: "87%" }, { top: "50%", left: "50%" }].map((pos, i) => (
        <img
          key={i}
          src={ARZ_LOGO_URL}
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            top: pos.top,
            left: pos.left,
            width: "480px",
            maxWidth: "75%",
            opacity: 0.15,
            filter: "grayscale(100%)",
            zIndex: 0,
            animation: "arzFloat 10s ease-in-out infinite",
            willChange: "transform",
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto relative" style={{ zIndex: 1 }}>

        <Header title={"Countries"} subTitle={"Top "} subTitle2={"Destinations"} text={"We have quality partners across four study destinations. Choose your dream country and start your journey today."} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {destinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => navigate(dest.path)}
              className="relative bg-white rounded-2xl p-4 flex flex-col overflow-hidden text-left cursor-pointer border-none"
              style={{
                border: "1.5px solid #e8eaf2",
                boxShadow: "0 2px 10px rgba(26,42,108,0.07)",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(26,42,108,0.14)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(26,42,108,0.07)";
              }}
            >
              <div className="relative flex flex-col flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white bg-slate-800 text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                    {dest.badge}
                  </span>
                  <div className="flex flex-col items-center gap-1">
                    <img
                      src={`https://flagcdn.com/w80/${dest.code}.png`}
                      alt={`${dest.name} flag`}
                      className="rounded-md object-cover flex-shrink-0"
                      style={{ width: "40px", height: "27px", border: "1px solid #e8eaf2" }}
                    />
                    <span className="text-xs font-bold text-center" style={{ color: "#1a2a6c" }}>
                      {dest.name}
                    </span>
                  </div>
                </div>

                <div className="w-full p-4">
                  <img src={dest.placeImg} alt={dest.name} className="w-full h-32 rounded-xl object-cover" />
                </div>

                <div className="flex flex-col gap-1 flex-1">
                  {[
                    { label: "Universities", value: dest.universities },
                    { label: "Avg. Tuition", value: dest.avgTuition },
                    { label: "Intake", value: dest.intake },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center py-0.5">
                      <span className="text-xs" style={{ color: "#555" }}>{row.label}</span>
                      <span className="text-xs font-bold" style={{ color: "#1a2a6c" }}>{row.value}</span>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-3 w-full bg-slate-800 py-2 rounded-xl text-xs font-bold text-white tracking-wide text-center"
                >
                  View Details →
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
