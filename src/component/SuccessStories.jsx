import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import { goToApplicationForm } from "../utils/scrollToForm";
import { apiGet } from "../config/api";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80";

const MAX_STORIES_SHOWN = 6;

// Helper: Extract YouTube video ID and generate high-quality thumbnail URL
function getYouTubeThumbnail(url) {
  if (!url) return FALLBACK_IMAGE;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
  }

  return FALLBACK_IMAGE;
}

export default function SuccessStories() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleApply = () => goToApplicationForm(navigate, location.pathname);

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/success-stories")
      .then((data) => setStories(data.slice(0, MAX_STORIES_SHOWN)))
      .catch(() => setStories([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-10 px-4" style={{ backgroundColor: "#f0f2f8" }}>
      <div className="max-w-6xl mx-auto">
        <Header
          title="Success Story"
          subTitle="Our students shared their"
          subTitle2={"visa success stories"}
          text="Real students, real results. Hear directly from those who achieved their dream of studying abroad with ARZ International."
        />

        {/* CARDS */}
        {!loading && stories.length === 0 && (
          <p className="text-center text-sm py-10" style={{ color: "#888" }}>
            Success stories are being added — check back soon!
          </p>
        )}

        {stories.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => {
              const videoThumbnail = getYouTubeThumbnail(story.image);

              return (
                <div
                  key={story._id}
                  className="card bg-white rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
                  style={{ boxShadow: "0 4px 24px rgba(26,42,108,0.10)" }}
                >
                  <div>
                    {/* YouTube Video Thumbnail Container */}
                    <figure className="relative h-56 overflow-hidden bg-slate-900">
                      <img
                        src={videoThumbnail}
                        alt={story.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(10,20,60,0.90) 0%, rgba(10,20,60,0.25) 55%, transparent 100%)",
                        }}
                      />

                      {/* YouTube Play Icon Center Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 rounded-full bg-red-600/90 group-hover:bg-red-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all duration-300">
                          <svg
                            className="w-6 h-6 fill-current translate-x-0.5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Student Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-bold text-base leading-tight">
                          {story.name}
                        </p>
                        <p
                          className="text-xs mt-0.5 flex items-center gap-1.5"
                          style={{ color: "#c8d0e0" }}
                        >
                          {story.flagCode && (
                            <img
                              src={`https://flagcdn.com/w20/${story.flagCode}.png`}
                              className="w-4 h-3 object-cover rounded-sm"
                              alt=""
                            />
                          )}
                          {story.city} {story.city && story.country ? "—" : ""}{" "}
                          {story.country}
                        </p>
                      </div>
                    </figure>

                    <div className="card-body p-4 gap-0">
                      <div>
                        <div className="flex justify-between">
                          <div>
                            <div className="flex items-start gap-2 mb-1.5">
                              <svg
                                className="mt-0.5 shrink-0"
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#1a2a6c"
                                strokeWidth="2.2"
                              >
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                              </svg>
                              <p
                                className="text-xs font-bold leading-tight"
                                style={{ color: "#1a2a6c" }}
                              >
                                {story.university}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg
                                className="shrink-0"
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#b01c2e"
                                strokeWidth="2.2"
                              >
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                <path d="M6 12v5c3 3 9 3 12 0v-5" />
                              </svg>
                              <p
                                className="text-md font-bold"
                                style={{ color: "#4b5563" }}
                              >
                                {story.course}
                              </p>
                            </div>
                          </div>
                          <div>
                            <span className="text-white bg-blue-800 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                              Visa Approved
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className="h-px w-full mb-3 mt-3"
                        style={{ backgroundColor: "#e8eaf6" }}
                      />

                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div
                          className="rounded-xl p-2.5 text-center border"
                          style={{ borderColor: "#e8eaf6" }}
                        >
                          <p className="text-xs text-red-800 font-bold">
                            {story.tuition || "N/A"}
                          </p>
                          <p className="text-xs mt-0.5">💰 Tuition / yr</p>
                        </div>
                        <div
                          className="rounded-xl p-2.5 text-center border"
                          style={{ borderColor: "#e8eaf6" }}
                        >
                          <p className="text-xs font-bold">
                            {story.intake || "N/A"}
                          </p>
                          <p className="text-xs mt-0.5">📅 Intake</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Replaced 'Start Your Journey' with 'View Success Story' opening YouTube URL */}
                  <div className="p-4 pt-0">
                    <a
                      href={story.image || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex bg-red-600 hover:bg-red-700 items-center justify-center gap-1.5 w-full rounded-full py-2 text-sm font-bold text-white transition-all hover:opacity-95 active:scale-95 no-underline"
                    >
                      View Success Story →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* BOTTOM CTA */}
        <div
          className="mt-14 rounded-2xl px-8 py-12 text-center"
          style={{
            background: "linear-gradient(135deg, #1a2a6c 0%, #b01c2e 100%)",
          }}
        >
          <h3 className="font-display text-2xl font-bold text-white mb-2">
            Ready to write your own success story?
          </h3>
          <p className="text-sm mb-6" style={{ color: "#dde3f5" }}>
            Join 5000+ students who trusted ARZ International for their study
            abroad journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleApply}
              className="btn rounded-full text-sm font-bold text-white border-2 border-white px-8 bg-transparent hover:bg-white hover:text-red-800 transition-all"
            >
              Apply Online →
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="btn rounded-full text-sm font-bold text-white border-2 border-white px-8 bg-transparent hover:bg-white hover:text-red-800 transition-all"
            >
              Free Counseling
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
