import { useState } from "react";
import "../../App.css";

const reviewsData = [
  {
    id: 1,
    name: "Sakil Ahmed",
    destination: "South Korea",
    university: "Hanseo University",
    flagCode: "kr",
    rating: 5,
    date: "March 2026",
    profileImg:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    comment:
      "Alhamdulillah, I got my student visa for South Korea through ARZ International! Their guidance for the EAP program application and visa documentation was flawless. They explained the profile requirements so clearly, and the processing was faster than I expected. Highly recommended for anyone dreaming of studying in Korea!",
    tag: "Visa Approved",
  },
  {
    id: 2,
    name: "Farhana Yasmin",
    destination: "Australia",
    university: "Macquarie University",
    flagCode: "au",
    rating: 5,
    date: "June 2026",
    profileImg:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&q=80",
    comment:
      "Getting an Australian study visa can be really complicated with the latest GTE/GS requirements, but the team at ARZ made it stress-free. From university admission to organizing my financial papers, they checked every single detail. I am so grateful for their support until my success!",
    tag: "IELTS 7.5 | Visa Approved",
  },
  {
    id: 3,
    name: "Ahsan Habib",
    destination: "United Kingdom",
    university: "Coventry University",
    flagCode: "gb",
    rating: 5,
    date: "January 2026",
    profileImg:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    comment:
      "Outstanding consultancy service! They helped me secure my admission for MBA at Coventry University with a partial scholarship. The counselors are extremely knowledgeable about UK visa regulations and mock interviews. They answered my late-night texts patiently. Five stars all the way!",
    tag: "Scholarship Winner",
  },
  {
    id: 4,
    name: "Tanvir Rahman",
    destination: "United Kingdom",
    university: "University of Hertfordshire",
    flagCode: "gb",
    rating: 5,
    date: "May 2026",
    profileImg:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80",
    comment:
      "ARZ International is the best choice for UK processing from Bangladesh. They didn't hide any costs and guided me step-by-step through the CAS letter and pre-departure tasks. Their transparency and honest profile assessment helped me achieve my MSc goal seamlessly.",
    tag: "Visa Approved",
  },
  {
    id: 5,
    name: "Nusrat Jahan",
    destination: "Europe (Germany)",
    university: "IU International University",
    flagCode: "eu",
    rating: 4,
    date: "February 2026",
    profileImg:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    comment:
      "I applied for a European block account and visa process with them. Though the appointment collection took some time due to embassy rushes, the ARZ team maintained excellent communication throughout. Their interview preparation structure was incredibly detailed and professional.",
    tag: "Highly Professional",
  },
  {
    id: 6,
    name: "Imran Khan",
    destination: "Australia",
    university: "Deakin University",
    flagCode: "au",
    rating: 5,
    date: "April 2026",
    profileImg:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80",
    comment:
      "Amazing support from start to finish! The team helped me format my SOP perfectly for Deakin University. Australia's rules are tight right now, but their precise file arrangement made sure my application sailed through without a single hitch.",
    tag: "Visa Approved",
  },
  {
    id: 7,
    name: "Sadia Sultana",
    destination: "South Korea",
    university: "Kyung Hee University",
    flagCode: "kr",
    rating: 5,
    date: "May 2026",
    profileImg:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80",
    comment:
      "ARZ International handles South Korean profiles with high expertise. They helped me get my admission with a partial Topik scholarship and guided me meticulously with the apostille and bank balance procedures. I am so glad I trusted them!",
    tag: "Scholarship Awardee",
  },
  {
    id: 8,
    name: "Rakibul Islam",
    destination: "United Kingdom",
    university: "Northumbria University",
    flagCode: "gb",
    rating: 5,
    date: "June 2026",
    profileImg:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
    comment:
      "I had a gap in my study history, and many agencies turned me down. ARZ evaluated my case properly, highlighted my professional experience in the application, and helped me get into a great program at Northumbria. True life-changers!",
    tag: "Study Gap Handled",
  },
  {
    id: 9,
    name: "Mehedi Hasan",
    destination: "Australia",
    university: "Swinburne University",
    flagCode: "au",
    rating: 5,
    date: "March 2026",
    profileImg:
      "https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=150&q=80",
    comment:
      "Very transparent service. They map out all tuition expectations, health coverage fees, and embassy updates directly on day one. Thanks to their structured documentation style, my priority Australian visa came back approved within just 3 weeks!",
    tag: "IELTS 7.0 | Visa Approved",
  },
  {
    id: 10,
    name: "Ayesha Siddiqua",
    destination: "Europe (Finland)",
    university: "Tampere University",
    flagCode: "eu",
    rating: 5,
    date: "April 2026",
    profileImg:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    comment:
      "Processing my admission to Finland was seamlessly handled by ARZ International. They perfectly structured my transcripts, mapped my credits, and gave me excellent advice for the residence permit interview. Couldn't be happier with their professionalism!",
    tag: "Visa Approved",
  },
  {
    id: 11,
    name: "Tariqul Islam",
    destination: "United Kingdom",
    university: "University of Bedfordshire",
    flagCode: "gb",
    rating: 5,
    date: "July 2026",
    profileImg:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
    comment:
      "My visa processing with ARZ International was smooth. They perfectly organized my bank statements and gave me solid mock interviews for the credibility check. Even with recent policy updates in the United Kingdom, my visa arrived completely on schedule!",
    tag: "Visa Approved",
  },
  {
    id: 12,
    name: "Mst. Rokea Khatun",
    destination: "Australia",
    university: "Flinders University",
    flagCode: "au",
    rating: 5,
    date: "July 2026",
    profileImg:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&q=80",
    comment:
      "I applied for my Master of Nursing at Flinders through ARZ. They completely simplified the profile submission loop, helped track down my translation documents, and clearly verified the regional pathway perks. Outstanding support!",
    tag: "Nursing Profile | Approved",
  },
];

export default function ReviewPage() {
  const [filter, setFilter] = useState("All");

  const filteredReviews =
    filter === "All"
      ? reviewsData
      : reviewsData.filter((r) => r.destination.includes(filter));

  return (
    <section className="py-14 px-4 bg-slate-50 dark:bg-slate-900 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        {/* HEADER SECTION */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-extrabold px-3 py-1 bg-blue-50 text-blue-900 rounded-full dark:bg-slate-800 dark:text-blue-300">
            Student Testimonials
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-3 text-slate-900 dark:text-white">
            What Our Successful Students Say
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Real experiences shared by students from Bangladesh who achieved
            their dream visas with the direct assistance of ARZ International.
          </p>
        </div>

        {/* INTERACTIVE DESTINATION FILTER BADGES */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["All", "South Korea", "United Kingdom", "Australia", "Europe"].map(
            (dest) => (
              <button
                key={dest}
                onClick={() => setFilter(dest)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  filter === dest
                    ? "bg-slate-900 text-white border-slate-900 dark:bg-slate-700 dark:border-slate-700"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                }`}
              >
                {dest}
              </button>
            ),
          )}
        </div>

        {/* REVIEWS GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700/50 flex flex-col justify-between hover:shadow-lg transition-shadow duration-200"
            >
              <div>
                {/* Card Top: Stars & Status Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {review.tag}
                  </span>
                </div>

                {/* Main Quote Content */}
                <p className="text-slate-600 dark:text-slate-300 text-xs md:text-sm italic leading-relaxed mb-6">
                  "{review.comment}"
                </p>
              </div>

              {/* Card Bottom: User Meta */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                <img
                  src={review.profileImg}
                  alt={review.name}
                  className="w-11 h-11 rounded-full object-cover shrink-0 ring-2 ring-slate-100 dark:ring-slate-700"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {review.name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <img
                      src={`https://flagcdn.com/w20/${review.flagCode}.png`}
                      alt=""
                      className="w-3.5 h-2.5 object-cover rounded-sm shrink-0"
                    />
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium truncate">
                      {review.university} ({review.destination})
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NO RESULTS FALLBACK CONTAINER */}
        {filteredReviews.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-400">
              No reviews found for this specific destination option yet.
            </p>
          </div>
        )}

        {/* ACTION SECTION */}
        <div className="mt-14 bg-slate-900 dark:bg-slate-800 rounded-2xl p-8 md:p-10 text-center text-white border border-slate-800 dark:border-slate-700">
          <h2 className="text-2xl font-bold mb-3">
            Begin Your Visa Journey Today
          </h2>
          <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto mb-6">
            Don't let confusing application paperwork slow down your dreams.
            Join thousands of successful candidates from Bangladesh supported by
            ARZ International.
          </p>
          <div className="flex justify-center">
            <button className="px-6 py-2.5 rounded-full text-xs font-bold bg-white text-slate-950 hover:bg-slate-100 transition-colors active:scale-95">
              Book Assessment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
