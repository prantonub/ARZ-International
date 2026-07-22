import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CountryHero, UniversitiesGrid, ApplyModal } from "./CountryPageParts";
import { apiGet } from "../../config/api";
import southKoreaImage from "../../assets/southkoria_main.png";

// Generic campus imagery fallback when specific university photo is missing
const campusImages = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1692776691970-39dc4edfd870?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542404937-2132aa1fa6fc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function SouthKorea() {
  const navigate = useNavigate();
  const [showApply, setShowApply] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset scroll position to top on page mount
    window.scrollTo(0, 0);

    // Fetch dynamic South Korean university data directly from the backend database
    apiGet("/universities/south-korea")
      .then((data) => {
        if (Array.isArray(data)) {
          setUniversities(data);
        }
      })
      .catch((err) => {
        console.error("Couldn't fetch universities from API:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const openApply = () => setShowApply(true);

  return (
    <div className="bg-white min-h-screen">
      <CountryHero
        flag="kr"
        displayName="South Korea"
        heroImage={southKoreaImage}
        tagline="Experience high-tech innovation, world-class campuses, and vibrant cultural trends. South Korea offers top-tier global programs, robust scholarship opportunities (like GKS), and great post-graduation career horizons."
        onApply={openApply}
        onContact={() => navigate("/contact")}
      />

      {/* Render grid when university list is loaded from database */}
      {!loading && universities.length > 0 && (
        <UniversitiesGrid
          sectionTitle="Universities We Work With in South Korea"
          universities={universities}
          campusImages={campusImages}
          onApply={openApply}
        />
      )}

      {/* Empty state when no records are found in the database */}
      {!loading && universities.length === 0 && (
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p style={{ color: "#888" }}>
            University listings for South Korea are being updated — check back
            soon, or contact us directly.
          </p>
        </div>
      )}

      {showApply && <ApplyModal onClose={() => setShowApply(false)} />}
    </div>
  );
}
