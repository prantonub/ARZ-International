import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CountryHero, UniversitiesGrid, ApplyModal } from "./CountryPageParts";
import { apiGet } from "../../config/api";
import europeImage from "../../assets/europe.png";

// Generic campus imagery — clean placeholder university pictures (kept original)
const campusImages = [
  "https://plus.unsplash.com/premium_photo-1697729711242-5fa79eaa8b08?q=80&w=1189&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1662930470616-f6ee42ebb6ce?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1689655451590-be38de8003e2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1673022177871-ef66893259ca?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1782437169290-e8010386ea73?q=80&w=1126&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1755694036479-15f7c3a2c55f?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function Europe() {
  const navigate = useNavigate();
  const [showApply, setShowApply] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset scroll position to top on page mount
    window.scrollTo(0, 0);

    // Fetch dynamic European university data directly from the backend database
    apiGet("/universities/europe")
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
        flag="eu"
        displayName="Europe"
        heroImage={europeImage}
        tagline="Discover affordable and low-tuition education across Europe's top academic hubs. Experience rich cultural diversity, post-study work visas, and seamless Schengen travel opportunities."
        onApply={openApply}
        onContact={() => navigate("/contact")}
      />

      {/* Render grid when university list is loaded from database */}
      {!loading && universities.length > 0 && (
        <UniversitiesGrid
          sectionTitle="Universities We Work With in Europe"
          universities={universities}
          campusImages={campusImages}
          onApply={openApply}
        />
      )}

      {/* Empty state when no records are found in the database */}
      {!loading && universities.length === 0 && (
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p style={{ color: "#888" }}>
            University listings for Europe are being updated — check back soon,
            or contact us directly.
          </p>
        </div>
      )}

      {showApply && <ApplyModal onClose={() => setShowApply(false)} />}
    </div>
  );
}
