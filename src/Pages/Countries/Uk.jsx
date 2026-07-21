import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CountryHero, UniversitiesGrid, ApplyModal } from "./CountryPageParts";
import { apiGet } from "../../config/api";
import ukImage from "../../assets/Uk.jpg";

// Generic campus imagery — not claimed to be each university's real
// campus, just a visual placeholder until you add a real photo per
// university via the admin dashboard.
const campusImages = [
  "https://images.unsplash.com/photo-1595685833450-b63451efcf01?q=80&w=1229&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1754262140581-91752fe8fe01?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=700&q=80",
  "https://images.unsplash.com/photo-1598058921517-81a452bc7cce?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1586881141091-1014c7c2cb79?q=80&w=1168&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1627742162586-55f1eda05ae9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function Uk() {
  const navigate = useNavigate();
  const [showApply, setShowApply] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/universities/uk")
      .then(setUniversities)
      .catch(() => setUniversities([]))
      .finally(() => setLoading(false));
  }, []);

  const openApply = () => setShowApply(true);

  return (
    <div className="bg-white">
      <CountryHero
        flag="gb"
        displayName="the United Kingdom"
        heroImage={ukImage}
        tagline="From centuries-old universities to modern career-focused programs, the UK offers a fast track to a globally respected degree — plus two years to work after you graduate."
        onApply={openApply}
        onContact={() => navigate("/contact")}
      />

      {!loading && universities.length > 0 && (
        <UniversitiesGrid
          sectionTitle="Universities We Work With in the UK"
          universities={universities}
          campusImages={campusImages}
          onApply={openApply}
        />
      )}

      {!loading && universities.length === 0 && (
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p style={{ color: "#888" }}>
            University listings for the UK are being updated — check back soon,
            or contact us directly.
          </p>
        </div>
      )}

      {showApply && <ApplyModal onClose={() => setShowApply(false)} />}
    </div>
  );
}
