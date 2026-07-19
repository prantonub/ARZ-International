import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import { apiPost } from "../config/api";

// ─── Reusable Field Components ───────────────────────────────────────────────

const Label = ({ children, required }) => (
  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
    {children} {required && <span className="text-rose-500">*</span>}
  </label>
);

const Input = ({ invalid, ...props }) => (
  <input
    {...props}
    className={`w-full h-11 px-4 rounded-xl border bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 transition-all ${
      invalid
        ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
        : "border-slate-200 focus:border-[#0f2044] focus:ring-[#0f2044]/10"
    }`}
  />
);

const Select = ({ children, invalid, ...props }) => (
  <div className="relative">
    <select
      {...props}
      className={`w-full h-11 px-4 pr-10 rounded-xl border bg-white text-sm text-slate-800 appearance-none focus:outline-none focus:ring-2 transition-all cursor-pointer ${
        invalid
          ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
          : "border-slate-200 focus:border-[#0f2044] focus:ring-[#0f2044]/10"
      }`}
    >
      {children}
    </select>
    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M4 6l4 4 4-4"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>
);

const Textarea = (props) => (
  <textarea
    {...props}
    rows={4}
    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#0f2044] focus:ring-2 focus:ring-[#0f2044]/10 transition-all resize-none"
  />
);

const SubCard = ({ icon, title, children }) => (
  <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 space-y-4">
    <div className="flex items-center gap-2">
      <span className="text-base">{icon}</span>
      <h4 className="text-sm font-semibold text-[#0f2044]">{title}</h4>
    </div>
    {children}
  </div>
);

const Row = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
);

// ─── Step Indicator ───────────────────────────────────────────────────────────

const steps = [
  { label: "Personal Info" },
  { label: "Education" },
  { label: "Program & University" },
  { label: "Documents & Finance" },
];

// Fields that must be filled before the user can leave each step.
// Keys match the form state; labels are shown in the error summary.
const REQUIRED_BY_STEP = {
  1: [
    { key: "fullName", label: "Full Name" },
    { key: "dob", label: "Date of Birth" },
    { key: "gender", label: "Gender" },
    { key: "phone", label: "Mobile / WhatsApp" },
    { key: "email", label: "Email Address" },
    { key: "city", label: "District / City" },
  ],
  2: [{ key: "studyStatus", label: "Current Study Status" }],
  3: [
    { key: "program", label: "Program" },
    { key: "intake", label: "Preferred Intake Semester" },
    { key: "koreanLevel", label: "Current Korean Language Level" },
  ],
  4: [
    { key: "passport", label: "Passport status" },
    { key: "sponsor", label: "Sponsor" },
    { key: "referral", label: "How you heard about us" },
  ],
};

const StepIndicator = ({ current }) => {
  const pct = (current / steps.length) * 100;
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-[#0f2044]">
          Step {current} of {steps.length} — {steps[current - 1].label}
        </span>
        <span className="text-xs font-semibold text-slate-400">{pct}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden mb-4">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #0f2044 0%, #e8294a 100%)",
          }}
        />
      </div>

      {/* Step dots */}
      <div className="flex items-center">
        {steps.map((s, i) => {
          const n = i + 1;
          const done = n < current;
          const active = n === current;
          return (
            <div key={n} className="flex items-center flex-1 last:flex-none">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300 ${
                  done
                    ? "bg-teal-500 text-white shadow-md"
                    : active
                      ? "bg-[#0f2044] text-white shadow-lg scale-110"
                      : "bg-white border-2 border-slate-200 text-slate-400"
                }`}
              >
                {done ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2.5 7l3 3 6-6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  n
                )}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1 rounded-full transition-all duration-500 ${
                    done ? "bg-teal-400" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Navigation Buttons ───────────────────────────────────────────────────────

const NavButtons = ({ step, onBack, onNext, onSubmit, submitting }) => (
  <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
    {step > 1 ? (
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-[#0f2044] text-[#0f2044] text-sm font-semibold hover:bg-[#0f2044] hover:text-white transition-all duration-200"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 4l-4 4 4 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back
      </button>
    ) : (
      <div />
    )}

    {step < 4 ? (
      <button
        onClick={onNext}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #e8294a 0%, #c0182e 100%)",
        }}
      >
        Next: {steps[step].label}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M6 4l4 4-4 4"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    ) : (
      <button
        onClick={onSubmit}
        disabled={submitting}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-60"
        style={{
          background: "linear-gradient(135deg, #0f2044 0%, #1a3260 100%)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 8l10-6-3 6 3 6-10-6z" fill="white" />
        </svg>
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
    )}
  </div>
);

// ─── Step 1: Personal Information ─────────────────────────────────────────────

const Step1 = ({ data, onChange, errors = {} }) => (
  <div className="space-y-4">
    <SectionHeader icon="👤" title="Personal Information" />
    <Row>
      <div>
        <Label required>Full Name (English)</Label>
        <Input
          invalid={errors.fullName}
          placeholder="As written in passport"
          value={data.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
        />
      </div>
      <div>
        <Label required>Date of Birth</Label>
        <Input
          invalid={errors.dob}
          type="date"
          value={data.dob}
          onChange={(e) => onChange("dob", e.target.value)}
        />
      </div>
    </Row>
    <Row>
      <div>
        <Label required>Gender</Label>
        <Select
          invalid={errors.gender}
          value={data.gender}
          onChange={(e) => onChange("gender", e.target.value)}
        >
          <option value="">Select gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </Select>
      </div>
      <div>
        <Label required>Mobile / WhatsApp</Label>
        <Input
          invalid={errors.phone}
          placeholder="+880 13********"
          value={data.phone}
          onChange={(e) => onChange("phone", e.target.value)}
        />
      </div>
    </Row>
    <Row>
      <div>
        <Label required>Email Address</Label>
        <Input
          invalid={errors.email}
          type="email"
          placeholder="your@email.com"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </div>
      <div>
        <Label required>District / City</Label>
        <Input
          invalid={errors.city}
          placeholder="e.g. Dhaka, Sylhet"
          value={data.city}
          onChange={(e) => onChange("city", e.target.value)}
        />
      </div>
    </Row>
  </div>
);

// ─── Step 2: Educational Background ──────────────────────────────────────────

const Step2 = ({ data, onChange, errors = {} }) => (
  <div className="">
    <SectionHeader icon="🎓" title="Educational Background" />

    <div>
      <Label required>Current Study Status</Label>
      <Select
        invalid={errors.studyStatus}
        value={data.studyStatus}
        onChange={(e) => onChange("studyStatus", e.target.value)}
      >
        <option value="">Select your current status</option>
        <option>HSC Student</option>
        <option>HSC Completed</option>
        <option>Undergraduate Student</option>
        <option>Undergraduate Completed</option>
        <option>Postgraduate</option>
      </Select>
    </div>

    <SubCard icon="🎓" title="SSC Information">
      <Row>
        <div>
          <Label>SSC Year of Passing</Label>
          <Input
            placeholder="e.g. 2022"
            value={data.sscYear}
            onChange={(e) => onChange("sscYear", e.target.value)}
          />
        </div>
        <div>
          <Label>SSC GPA</Label>
          <Input
            placeholder="e.g. 5.00"
            value={data.sscGpa}
            onChange={(e) => onChange("sscGpa", e.target.value)}
          />
        </div>
      </Row>
      <Row>
        <div>
          <Label>SSC Group</Label>
          <Select
            value={data.sscGroup}
            onChange={(e) => onChange("sscGroup", e.target.value)}
          >
            <option value="">Select group</option>
            <option>Science</option>
            <option>Commerce</option>
            <option>Arts</option>
          </Select>
        </div>
        <div>
          <Label>School / Institute Name</Label>
          <Input
            placeholder="School name"
            value={data.sscSchool}
            onChange={(e) => onChange("sscSchool", e.target.value)}
          />
        </div>
      </Row>
    </SubCard>

    <SubCard icon="🎓" title="HSC Information">
      <Row>
        <div>
          <Label>HSC Year of Passing</Label>
          <Input
            placeholder="e.g. 2024 or Expected 2025"
            value={data.hscYear}
            onChange={(e) => onChange("hscYear", e.target.value)}
          />
        </div>
        <div>
          <Label>HSC GPA</Label>
          <Input
            placeholder="e.g. 5.00 or Awaited"
            value={data.hscGpa}
            onChange={(e) => onChange("hscGpa", e.target.value)}
          />
        </div>
      </Row>
      <Row>
        <div>
          <Label>HSC Group</Label>
          <Select
            value={data.hscGroup}
            onChange={(e) => onChange("hscGroup", e.target.value)}
          >
            <option value="">Select group</option>
            <option>Science</option>
            <option>Commerce</option>
            <option>Arts</option>
          </Select>
        </div>
        <div>
          <Label>College / Institute Name</Label>
          <Input
            placeholder="College name"
            value={data.hscCollege}
            onChange={(e) => onChange("hscCollege", e.target.value)}
          />
        </div>
      </Row>
    </SubCard>

    <SubCard icon="🏛️" title="University (if applicable)">
      <Row>
        <div>
          <Label>University / College Name</Label>
          <Input
            placeholder="University name (if enrolled)"
            value={data.uniName}
            onChange={(e) => onChange("uniName", e.target.value)}
          />
        </div>
        <div>
          <Label>Subject / Department</Label>
          <Input
            placeholder="e.g. Computer Science"
            value={data.uniSubject}
            onChange={(e) => onChange("uniSubject", e.target.value)}
          />
        </div>
      </Row>
      <Row>
        <div>
          <Label>Degree</Label>
          <Input
            placeholder="e.g. BSc, BBA, MBA"
            value={data.degree}
            onChange={(e) => onChange("degree", e.target.value)}
          />
        </div>
        <div>
          <Label>CGPA / Result</Label>
          <Input
            placeholder="e.g. 3.50 / 4.00"
            value={data.cgpa}
            onChange={(e) => onChange("cgpa", e.target.value)}
          />
        </div>
      </Row>
    </SubCard>
  </div>
);

// ─── Step 3: Program & University ────────────────────────────────────────────

const Step3 = ({ data, onChange, errors = {} }) => (
  <div className="space-y-4">
    <SectionHeader icon="🏫" title="Program & University Preference" />

    <div>
      <Label required>Which program are you interested in?</Label>
      <Select
        invalid={errors.program}
        value={data.program}
        onChange={(e) => onChange("program", e.target.value)}
      >
        <option value="">Select a program</option>
        <option>Language Course (Korean)</option>
        <option>Undergraduate Degree</option>
        <option>Postgraduate Degree</option>
        <option>Diploma / Vocational</option>
        <option>Exchange Program</option>
      </Select>
    </div>

    <Row>
      <div>
        <Label required>Preferred Intake Semester</Label>
        <Select
          invalid={errors.intake}
          value={data.intake}
          onChange={(e) => onChange("intake", e.target.value)}
        >
          <option value="">Select intake</option>
          <option>Spring 2025 (March)</option>
          <option>Fall 2025 (September)</option>
          <option>Spring 2026 (March)</option>
          <option>Fall 2026 (September)</option>
        </Select>
      </div>
      <div>
        <Label>Preferred Field / Subject</Label>
        <Input
          placeholder="e.g. Engineering, Business, IT"
          value={data.field}
          onChange={(e) => onChange("field", e.target.value)}
        />
      </div>
    </Row>

    <Row>
      <div>
        <Label required>Current Korean Language Level</Label>
        <Select
          invalid={errors.koreanLevel}
          value={data.koreanLevel}
          onChange={(e) => onChange("koreanLevel", e.target.value)}
        >
          <option value="">Select level</option>
          <option>None / Beginner</option>
          <option>TOPIK I (Level 1-2)</option>
          <option>TOPIK II (Level 3-4)</option>
          <option>TOPIK II (Level 5-6)</option>
        </Select>
      </div>
      <div>
        <Label>IELTS / TOEFL Score (if any)</Label>
        <Input
          placeholder="e.g. IELTS 5.5 or N/A"
          value={data.englishScore}
          onChange={(e) => onChange("englishScore", e.target.value)}
        />
      </div>
    </Row>
  </div>
);

// ─── Step 4: Documents & Finance ─────────────────────────────────────────────

const Step4 = ({ data, onChange, errors = {} }) => (
  <div className="space-y-5">
    <SectionHeader icon="📄" title="Documents & Financial Information" />

    <Row>
      <div>
        <Label required>Do you have a valid passport?</Label>
        <Select
          invalid={errors.passport}
          value={data.passport}
          onChange={(e) => onChange("passport", e.target.value)}
        >
          <option value="">Select</option>
          <option>Yes, valid</option>
          <option>No, will apply soon</option>
          <option>Expired</option>
        </Select>
      </div>
      <div>
        <Label>Passport Expiry Date (if available)</Label>
        <Input
          type="date"
          value={data.passportExpiry}
          onChange={(e) => onChange("passportExpiry", e.target.value)}
        />
      </div>
    </Row>

    <Row>
      <div>
        <Label>Have you ever applied to Korea before?</Label>
        <Select
          value={data.appliedKorea}
          onChange={(e) => onChange("appliedKorea", e.target.value)}
        >
          <option value="">Select</option>
          <option>No, first time</option>
          <option>Yes, approved</option>
          <option>Yes, rejected</option>
        </Select>
      </div>
      <div>
        <Label>Any visa rejection history (any country)?</Label>
        <Select
          value={data.visaRejection}
          onChange={(e) => onChange("visaRejection", e.target.value)}
        >
          <option value="">Select</option>
          <option>No</option>
          <option>Yes — Korea</option>
          <option>Yes — Other country</option>
        </Select>
      </div>
    </Row>

    <SubCard icon="💰" title="Financial Information">
      <Row>
        <div>
          <Label required>Who will sponsor your education?</Label>
          <Select
            invalid={errors.sponsor}
            value={data.sponsor}
            onChange={(e) => onChange("sponsor", e.target.value)}
          >
            <option value="">Select sponsor</option>
            <option>Father</option>
            <option>Mother</option>
            <option>Self-funded</option>
            <option>Scholarship</option>
            <option>Other relative</option>
          </Select>
        </div>
        <div>
          <Label>Sponsor's Occupation</Label>
          <Input
            placeholder="e.g. Business, Government Job"
            value={data.sponsorOccupation}
            onChange={(e) => onChange("sponsorOccupation", e.target.value)}
          />
        </div>
      </Row>
      <div>
        <Label>Approximate Annual Budget (USD)</Label>
        <Select
          value={data.budget}
          onChange={(e) => onChange("budget", e.target.value)}
        >
          <option value="">Select range</option>
          <option>Under $5,000</option>
          <option>$5,000 – $10,000</option>
          <option>$10,000 – $20,000</option>
          <option>Above $20,000</option>
        </Select>
      </div>
    </SubCard>

    <div>
      <Label required>How did you hear about ARZ International?</Label>
      <Select
        invalid={errors.referral}
        value={data.referral}
        onChange={(e) => onChange("referral", e.target.value)}
      >
        <option value="">Select</option>
        <option>Facebook</option>
        <option>Friend / Referral</option>
        <option>Google</option>
        <option>YouTube</option>
        <option>Walk-in</option>
      </Select>
    </div>

    <div>
      <Label>Any specific questions or concerns for our counselor?</Label>
      <Textarea
        placeholder="Write any questions, concerns, or specific requirements here..."
        value={data.notes}
        onChange={(e) => onChange("notes", e.target.value)}
      />
    </div>

    {/* Consent notice */}
    <div className="flex gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
      <div className="text-blue-500 mt-0.5 shrink-0">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="#3b82f6" strokeWidth="1.5" />
          <path
            d="M8 7v4M8 5v.5"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className="text-xs text-blue-600 leading-relaxed">
        By submitting this form you confirm that the information provided is
        accurate. Our counselor will contact you within 24 hours to schedule
        your free session. All information is kept strictly confidential.
      </p>
    </div>
  </div>
);

// ─── Section Header ───────────────────────────────────────────────────────────

const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-2">
    <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-base shrink-0">
      {icon}
    </div>
    <h3 className="text-base font-semibold text-[#0f2044]">{title}</h3>
  </div>
);

// ─── Success Screen ───────────────────────────────────────────────────────────

const SuccessScreen = ({ onReturnHome }) => (
  <div
    className="fixed inset-0 z-[80] flex items-center justify-center p-4"
    style={{ background: "rgba(15,32,68,0.55)", backdropFilter: "blur(4px)" }}
    role="dialog"
    aria-modal="true"
    aria-labelledby="application-success-title"
  >
    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full text-center py-10 px-6 animate-[fadeInScale_0.25s_ease-out]">
      <style>{`@keyframes fadeInScale { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }`}</style>
      <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-5">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="17" stroke="#0d9488" strokeWidth="2" />
          <path
            d="M10 18l5.5 5.5L26 12"
            stroke="#0d9488"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2
        id="application-success-title"
        className="text-2xl font-bold text-[#0f2044] mb-2"
      >
        Application Submitted!
      </h2>
      <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
        Thank you! Our counselor will contact you within 24 hours to schedule
        your free consultation session.
      </p>
      <button
        onClick={() => (window.location.href = "/")}
        className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f2044] text-white text-sm font-semibold cursor-pointer hover:bg-[#1a3260] transition-colors border-none"
      >
        Return to Home
      </button>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ApplicationForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    // Step 1
    fullName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    city: "",
    // Step 2
    studyStatus: "",
    sscYear: "",
    sscGpa: "",
    sscGroup: "",
    sscSchool: "",
    hscYear: "",
    hscGpa: "",
    hscGroup: "",
    hscCollege: "",
    uniName: "",
    uniSubject: "",
    degree: "",
    cgpa: "",
    // Step 3
    program: "",
    intake: "",
    field: "",
    koreanLevel: "",
    englishScore: "",
    // Step 4
    passport: "",
    passportExpiry: "",
    appliedKorea: "",
    visaRejection: "",
    sponsor: "",
    sponsorOccupation: "",
    budget: "",
    referral: "",
    notes: "",
  });

  const update = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    // Clear that field's error as soon as the user starts fixing it.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: false } : prev));
  };

  // Returns the list of {key, label} still missing for a given step.
  const getMissing = (stepNum, data = form) =>
    REQUIRED_BY_STEP[stepNum].filter(
      ({ key }) => !String(data[key] || "").trim(),
    );

  const validateStep = (stepNum) => {
    const missing = getMissing(stepNum);
    if (missing.length > 0) {
      setErrors((prev) => ({
        ...prev,
        ...Object.fromEntries(missing.map(({ key }) => [key, true])),
      }));
      setSubmitError(
        `Please complete: ${missing.map((m) => m.label).join(", ")}`,
      );
      return false;
    }
    setSubmitError("");
    return true;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, 4));
  };
  const back = () => {
    setSubmitError("");
    setStep((s) => Math.max(s - 1, 1));
  };

  const submit = async () => {
    // Final safety net: re-check every required field from every step,
    // in case someone went back and cleared something.
    for (const stepNum of [1, 2, 3, 4]) {
      const missing = getMissing(stepNum);
      if (missing.length > 0) {
        setErrors((prev) => ({
          ...prev,
          ...Object.fromEntries(missing.map(({ key }) => [key, true])),
        }));
        setSubmitError(
          `Please complete: ${missing.map((m) => m.label).join(", ")}`,
        );
        setStep(stepNum);
        return;
      }
    }

    setSubmitting(true);
    setSubmitError("");
    try {
      await apiPost("/applications", form);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err.message || "Couldn't submit your application. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const stepComponents = [
    <Step1 data={form} onChange={update} errors={errors} />,
    <Step2 data={form} onChange={update} errors={errors} />,
    <Step3 data={form} onChange={update} errors={errors} />,
    <Step4 data={form} onChange={update} errors={errors} />,
  ];

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        {!submitted && (
          <Header
            title={"Form"}
            subTitle={"Student Application &"}
            subTitle2={"Pre-Consultation Form"}
            text={
              "Please fill this form completely before your counseling session. This helps us give you the most accurate guidance."
            }
          ></Header>
        )}

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-6 py-7 sm:px-8">
          {submitted ? (
            <SuccessScreen onReturnHome={() => navigate("/")} />
          ) : (
            <>
              <StepIndicator current={step} />
              {stepComponents[step - 1]}
              {submitError && (
                <p className="mt-4 text-sm font-semibold text-rose-600">
                  {submitError}
                </p>
              )}
              <NavButtons
                step={step}
                onBack={back}
                onNext={next}
                onSubmit={submit}
                submitting={submitting}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
