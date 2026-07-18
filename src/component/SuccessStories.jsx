import Header from "./Header";
import "../App.css";

const ytThumb = (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

const stories = [
  {
    id: 1,
    name: "Sakil Ahmed",
    university: "Hanseo University",
    city: "Seoul",
    country: "South Korea",
    flagCode: "kr",
    course: "EAP Program",
    tuition: "₩4,200,000",
    intake: "Mar 2026",
    year: "2026",
    youtubeId: "A4w7K7NDNgk",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
  },
  {
    id: 2,
    name: "Farhana Yasmin",
    university: "Macquarie University",
    city: "Sydney",
    country: "Australia",
    flagCode: "au",
    course: "Master of Business Analytics",
    tuition: "AUD 41,200",
    intake: "July 2026",
    youtubeId: "sMwrWUwV_mc",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=80",
  },
  {
    id: 3,
    name: "Ahsan Habib",
    university: "Coventry University",
    city: "Coventry",
    country: "United Kingdom",
    flagCode: "gb",
    course: "MBA (Global Business)",
    tuition: "£18,250",
    intake: "Jan 2027",
    youtubeId: "Isuts0buNFw",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
];

export default function SuccessStories() {
  return (
    <section className="py-10 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <Header
          title="Success Story"
          subTitle="Our students shared their"
          subTitle2={"visa success stories"}
          text="Real students, real results. Hear directly from those who achieved their dream of studying abroad with ARZ International."
        />

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => {
            const cardImage = story.youtubeId
              ? ytThumb(story.youtubeId)
              : story.image;
            return (
              <div
                key={story.id}
                className="card bg-white dark:bg-slate-800 rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 shadow-lg border border-slate-100 dark:border-slate-700/50"
              >
                {/* THUMBNAIL */}
                <figure className="relative h-56 overflow-hidden">
                  <img
                    src={cardImage}
                    alt={story.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

                  {/* Play button — links to YouTube directly */}
                  {story.youtubeId && (
                    <a
                      href={`https://www.youtube.com/watch?v=${story.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-14 h-14 rounded-full flex items-center justify-center bg-red-600/90 shadow-xl shadow-red-600/30 transition-all duration-200 group-hover:scale-110">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </a>
                  )}

                  {/* Name + university overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-bold text-base leading-tight">
                      {story.name}
                    </p>
                    <p className="text-xs mt-0.5 flex items-center gap-1.5 text-slate-200">
                      <img
                        src={`https://flagcdn.com/w20/${story.flagCode}.png`}
                        className="w-4 h-3 object-cover rounded-sm"
                        alt=""
                      />
                      {story.city} — {story.country}
                    </p>
                  </div>
                </figure>

                {/* CARD BODY */}
                <div className="card-body p-4 gap-0">
                  <div>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        {/* University */}
                        <div className="flex items-start gap-2">
                          <svg
                            className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                          >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                          <p className="text-xs font-bold leading-tight text-blue-900 dark:text-blue-300">
                            {story.university}
                          </p>
                        </div>

                        {/* Course */}
                        <div className="flex items-center gap-2">
                          <svg
                            className="shrink-0 text-amber-500"
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                          >
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                          </svg>
                          <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
                            {story.course}
                          </p>
                        </div>
                      </div>

                      <div>
                        {/* Tag badge */}
                        <span className="text-white bg-emerald-600 text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full">
                          Visa Approved
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full my-3 bg-slate-100 dark:bg-slate-700" />

                  {/* Tuition + Intake grid */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="rounded-xl p-2.5 text-center border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                      <p className="text-xs text-red-600 dark:text-red-400 font-bold">
                        {story.tuition ?? "N/A"}
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 uppercase tracking-wide font-semibold">
                        💰 Tuition / yr
                      </p>
                    </div>
                    <div className="rounded-xl p-2.5 text-center border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {story.intake ?? "N/A"}
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 uppercase tracking-wide font-semibold">
                        📅 Intake
                      </p>
                    </div>
                  </div>

                  {/* Watch button — opens YouTube directly */}
                  {story.youtubeId && (
                    <a
                      href={`https://www.youtube.com/watch?v=${story.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 items-center justify-center gap-1.5 w-full rounded-full py-2 text-xs font-bold text-white transition-all active:scale-95"
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Watch Story
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-14 rounded-2xl px-8 py-12 text-center bg-slate-900 dark:bg-slate-800 border border-slate-800 dark:border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-2">
            Ready to write your own success story?
          </h3>
          <p className="text-sm mb-6 text-slate-400">
            Join 5000+ students who trusted ARZ International for their study
            abroad journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="rounded-full text-sm font-bold text-white border-2 border-slate-700 px-8 py-2.5 bg-transparent hover:bg-white hover:text-slate-950 hover:border-white transition-all">
              Apply Online →
            </button>
            <button className="rounded-full text-sm font-bold text-white border-2 border-slate-700 px-8 py-2.5 bg-transparent hover:bg-white hover:text-slate-950 hover:border-white transition-all">
              Free Counseling
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
