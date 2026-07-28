import { useEffect, useState } from "react";
import { apiGet } from "../../config/api";

/* ─────────────────────────────────────────────────────────
   Success Story feed — styled like a social media post:
   avatar + name/meta header, the student's own caption as
   the post body, a full-width photo, then a compact strip
   of the "important information" (university, course, etc).
   ───────────────────────────────────────────────────────── */

function initialsOf(name = "") {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase();
}

// Matches the admin panel exactly: the "image" field on a success story
// holds a YouTube video URL, not a direct photo — this turns that URL
// into a thumbnail image.
function getYouTubeThumbnail(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
  }
  return null;
}

function timeAgo(dateString) {
  if (!dateString) return "";
  const diffMs = Date.now() - new Date(dateString).getTime();
  const days = Math.floor(diffMs / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

function InfoChip({ icon, children }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
      style={{ background: "#f0f2f8", color: "#444" }}
    >
      {icon}
      {children}
    </span>
  );
}

function StoryPost({ story, onApply }) {
  return (
    <article
      className="rounded-2xl overflow-hidden bg-white"
      style={{
        border: "1px solid #eef0f8",
        boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
      }}
    >
      {/* ── Post header: avatar, name, meta, "posted" timestamp ── */}
      <div className="flex items-center gap-3 p-4">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-sm text-white"
          style={{ background: "linear-gradient(135deg, #1a2a6c, #2b3d8f)" }}
        >
          {initialsOf(story.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-bold text-sm text-navy truncate">
              {story.name}
            </span>
            {story.flagCode && (
              <img
                src={`https://flagcdn.com/w40/${story.flagCode}.png`}
                alt=""
                className="w-4 h-3 rounded-sm object-cover flex-shrink-0"
              />
            )}
          </div>
          <p className="text-xs truncate" style={{ color: "#999" }}>
            {story.university}
            {story.country ? ` · ${story.country}` : ""}
            {story.createdAt ? ` · ${timeAgo(story.createdAt)}` : ""}
          </p>
        </div>
        <span
          className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full flex-shrink-0"
          style={{ background: "#eafaf0", color: "#1a8a4c" }}
        >
          Visa Approved
        </span>
      </div>

      {/* ── Post body: the student's own words ── */}
      {story.story && (
        <p
          className="px-4 pb-3 text-sm leading-relaxed"
          style={{ color: "#333" }}
        >
          {story.story}
        </p>
      )}

      {/* ── Post photo (YouTube thumbnail, if a video URL was set) ── */}
      {getYouTubeThumbnail(story.image) && (
        <a
          href={story.image}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block group"
        >
          <img
            src={getYouTubeThumbnail(story.image)}
            alt={story.name}
            className="w-full max-h-[420px] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/15 group-hover:bg-black/25 transition-colors">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg">
              <svg
                className="w-5 h-5 fill-current translate-x-0.5"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </a>
      )}

      {/* ── Important information strip ── */}
      <div className="flex flex-wrap gap-2 px-4 pt-4">
        {story.course && (
          <InfoChip
            icon={
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a2a6c"
                strokeWidth="2.2"
              >
                <path d="M22 10l-10-6L2 10l10 6 10-6z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            }
          >
            {story.course}
          </InfoChip>
        )}
        {story.tuition && (
          <InfoChip
            icon={
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#b01c2e"
                strokeWidth="2.2"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v10M9 9.5c0-1.4 1.3-2.5 3-2.5s3 1.1 3 2.5-1.3 2-3 2.5-3 1.1-3 2.5 1.3 2.5 3 2.5 3-1.1 3-2.5" />
              </svg>
            }
          >
            {story.tuition}
          </InfoChip>
        )}
        {story.intake && (
          <InfoChip
            icon={
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a4863a"
                strokeWidth="2.2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            }
          >
            {story.intake}
          </InfoChip>
        )}
      </div>

      {/* ── Footer: decorative engagement + real CTA ── */}
      <div
        className="flex items-center justify-between px-4 py-3 mt-3"
        style={{ borderTop: "1px solid #f0f2f8" }}
      >
        <div
          className="flex items-center gap-1.5 text-xs"
          style={{ color: "#999" }}
        >
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center text-white"
            style={{ background: "#1a2a6c" }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 21h4V9H2v12zM22 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L12.83 1 7.41 6.41C7.15 6.68 7 7.05 7 7.45V19a2 2 0 002 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
            </svg>
          </span>
          Congratulations from the ARZ team
        </div>
        <button
          onClick={onApply}
          className="text-sm font-bold text-brand border-none bg-transparent cursor-pointer"
        >
          Start your journey →
        </button>
      </div>
    </article>
  );
}

export default function SuccessStoriesSection({ onApply }) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/success-stories")
      .then(setStories)
      .catch(() => setStories([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && stories.length === 0) return null;

  return (
    <section className="px-6 py-16 md:py-20 max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full bg-navy/5 text-navy border border-navy/10">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12,2 15.1,8.3 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 8.9,8.3" />
            </svg>
            From Our Students
          </span>
        </div>
        <h2 className="font-display font-bold text-2xl md:text-4xl text-navy mb-4">
          Success Stories
        </h2>
        <p className="text-slate-500">
          Real students, real placements — updated as new students land their
          offers.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-10 text-sm" style={{ color: "#999" }}>
          Loading...
        </div>
      ) : (
        <div className="space-y-5">
          {stories.map((story) => (
            <StoryPost key={story._id} story={story} onApply={onApply} />
          ))}
        </div>
      )}
    </section>
  );
}
