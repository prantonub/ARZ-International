import { useState } from "react";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    id: 1,
    question: "How is get admission in abroad university?",
  },
  {
    id: 2,
    question: "Do you offer complete solution for students?",
  },
  {
    id: 3,
    question: "Which country is safe and better for higher study?",
  },
  {
    id: 4,
    question: "Which country offer PR after study getting job?",
  },
  {
    id: 5,
    question: "Can i get scholarship with my low cGPA?",
  },
  {
    id: 6,
    question: "Do you allow accomadation for students in abroad?",
  },
];

const answers = {
  1: "We guide you through every step of the university admission process — from shortlisting universities to submitting your application and obtaining your offer letter.",
  2: "Yes! We provide end-to-end services including counseling, university selection, application, visa processing, accommodation, and pre-departure support.",
  3: "South Korea, the UK, Australia and Europe are all consistently ranked safe and excellent for higher studies, each offering great education and post-study opportunities.",
  4: "Australia and the UK both offer post-study work visas, giving graduates a genuine pathway to work experience — and in some European countries, a residence permit — after completing their studies.",
  5: "Absolutely! Many universities and scholarship programs consider other factors beyond CGPA, such as work experience, language scores, and personal statements. We help you find the right fit.",
  6: "Yes, we assist students in finding safe and affordable accommodation near their university campus, including homestays, student hostels, and shared apartments.",
};

export default function Fqa() {
  const [openId, setOpenId] = useState(null);
  const navigate = useNavigate();

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <section
      id="faq"
      className="min-h-screen flex items-center justify-center px-6 py-20"
      style={{ backgroundColor: "#f0eeec" }}
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6">
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "#6b63d4" }}
          >
            FAQ
          </span>

          <h2
            className="font-display text-4xl font-bold leading-tight"
            style={{ color: "#1a1a2e" }}
          >
            Frequently asked <br /> question
          </h2>

          {/* Divider */}
          <div
            className="w-10 h-0.5"
            style={{ backgroundColor: "#1a1a2e" }}
          />

          <p
            className="text-base leading-relaxed"
            style={{ color: "#555" }}
          >
            Still do you have any questions to know? <br />
            Feel free to ask our experts here.
          </p>

          <div className="mt-4">
            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-3 border text-sm font-semibold tracking-widest uppercase transition-all duration-200 hover:bg-gray-200 cursor-pointer"
              style={{
                borderColor: "#1a1a2e",
                color: "#1a1a2e",
                backgroundColor: "transparent",
                letterSpacing: "0.12em",
              }}
            >
              Ask Your Questions
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN — Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: "#ffffff",
                  boxShadow: isOpen
                    ? "0 4px 20px rgba(0,0,0,0.08)"
                    : "0 1px 4px rgba(0,0,0,0.06)",
                }}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200"
                  style={{ backgroundColor: "transparent" }}
                >
                  <span
                    className="text-sm md:text-base"
                    style={{
                      color: "#1a1a2e",
                      fontWeight: isOpen ? "600" : "400",
                    }}
                  >
                    {faq.id}. {faq.question}
                  </span>
                  <span
                    className="ml-4 text-xl font-light transition-transform duration-300 flex-shrink-0"
                    style={{
                      color: "#1a1a2e",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>

                {/* Answer */}
                <div
                  style={{
                    maxHeight: isOpen ? "200px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.35s ease",
                  }}
                >
                  <p
                    className="px-5 pb-4 text-sm leading-relaxed"
                    style={{ color: "#666" }}
                  >
                    {answers[faq.id]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}