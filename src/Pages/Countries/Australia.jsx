import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CountryHero, UniversitiesGrid, ApplyModal } from "./CountryPageParts";
import { apiGet } from "../../config/api";
import australiaImage from "../../assets/australia.jpg";

// Generic campus imagery fallback when specific university photo is missing
const campusImages = [
  "https://images.unsplash.com/photo-1603437119287-4a3732b685f9?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  "https://images.unsplash.com/photo-1670860149444-3f68ef14b6cc?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  "https://images.unsplash.com/photo-1572810833916-e5e44570cb2e?q=80&w=1090&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  "https://images.unsplash.com/photo-1607714889367-313a76173e20?q=80&w=1494&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  "https://images.unsplash.com/photo-1593944117776-784fe294a032?q=80&w=1246&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  "https://images.unsplash.com/photo-1721314678234-fb6b27dac858?q=80&w=1126&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function Australia() {
  const navigate = useNavigate();
  const [showApply, setShowApply] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset scroll position to top on page mount
    window.scrollTo(0, 0);

    // Fetch dynamic Australian university data directly from the backend database
    apiGet("/universities/australia")
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
        flag="au"
        displayName="Australia"
        heroImage={australiaImage}
        tagline="Unlock globally recognized qualifications, flexible part-time work rights, and lucrative post-study work pathways. Australia combines prestigious Group of 8 universities with an unrivaled lifestyle."
        onApply={openApply}
        onContact={() => navigate("/contact")}
      />

      {/* Render grid when university list is loaded from database */}
      {!loading && universities.length > 0 && (
        <UniversitiesGrid
          sectionTitle="Universities We Work With in Australia"
          universities={universities}
          campusImages={campusImages}
          onApply={openApply}
        />
      )}

      {/* Empty state when no records are found in the database */}
      {!loading && universities.length === 0 && (
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p style={{ color: "#888" }}>
            University listings for Australia are being updated — check back
            soon, or contact us directly.
          </p>
        </div>
      )}

      {showApply && <ApplyModal onClose={() => setShowApply(false)} />}
    </div>
  );
}
