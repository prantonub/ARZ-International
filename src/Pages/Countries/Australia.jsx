import CountryPageTemplate from "./CountryPageTemplate";
import australiaImage from "../../assets/australia.jpg";

const highlights = [
    { title: "Top-Ranked Education", text: "Several Australian universities consistently rank in the global top 100 across multiple disciplines.", icon: "🏆" },
    { title: "Work While You Study", text: "Eligible student visa holders can work part-time to help cover living expenses.", icon: "💼" },
    { title: "Post-Study Work Visa", text: "Graduates can apply for a Temporary Graduate visa to gain work experience after their degree.", icon: "📄" },
    { title: "Safe, High Quality of Life", text: "Consistently ranked among the world's most liveable countries for students and families.", icon: "🌿" },
];

const popularFields = ["Engineering", "Information Technology", "Nursing & Health Sciences", "Business & Accounting", "Hospitality & Tourism", "Agriculture"];

const universities = [
    { name: "Federation University", tag: "Popular", location: "Victoria" },
    { name: "Victoria University", tag: "Melbourne", location: "Melbourne, Victoria" },
    { name: "Central Queensland University", tag: "Affordable", location: "Queensland" },
    { name: "University of Southern Queensland", tag: "Research", location: "Queensland" },
    { name: "Edith Cowan University", tag: "Scholarships", location: "Perth, WA" },
    { name: "Torrens University Australia", tag: "Career-Focused", location: "Multiple Campuses" },
];

const requirements = [
    "Completed HSC/A-Levels (Bachelor's) or Bachelor's degree (Master's)",
    "IELTS Academic — typically 6.0–6.5 overall depending on program",
    "Genuine Temporary Entrant (GTE) statement",
    "Confirmation of Enrolment (CoE) from the university",
    "Evidence of sufficient funds for tuition and living costs (OSHC health cover included)",
    "Valid passport and completed visa health examination",
];

const intakes = ["February (Main Intake)", "July", "November (Selected Universities)"];

export default function Australia() {
    return (
        <CountryPageTemplate
            flag="au"
            name="Australia"
            heroImage={australiaImage}
            tagline="Globally ranked universities, generous part-time work rights, and a genuine post-study pathway make Australia a favourite among Bangladeshi students."
            overview="Australia combines high academic standards with one of the world's best qualities of life. From Melbourne to Perth, ARZ International helps you choose the right course and campus, prepare a strong GTE statement, and manage your Confirmation of Enrolment through to visa lodgement."
            highlights={highlights}
            popularFields={popularFields}
            universities={universities}
            requirements={requirements}
            intakes={intakes}
        />
    );
}
