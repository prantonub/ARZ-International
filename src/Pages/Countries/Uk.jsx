import CountryPageTemplate from "./CountryPageTemplate";
import ukImage from "../../assets/Uk.jpg";

const highlights = [
    { title: "World-Ranked Universities", text: "Home to globally recognised institutions across every major field of study.", icon: "🎓" },
    { title: "Shorter Degrees", text: "Bachelor's degrees typically take 3 years and Master's just 1 year, saving time and cost.", icon: "⏱️" },
    { title: "Post-Study Work Visa", text: "Graduates can stay and work in the UK for up to 2 years after finishing their degree.", icon: "💼" },
    { title: "Multicultural Campuses", text: "A large, welcoming Bangladeshi and South Asian student community across major cities.", icon: "🌍" },
];

const popularFields = ["Business & Management", "Computer Science", "Engineering", "Law", "Health & Nursing", "Data Science", "Hospitality"];

const universities = [
    { name: "University of East London", tag: "London", location: "London, England" },
    { name: "Coventry University", tag: "Popular", location: "Coventry, England" },
    { name: "University of Bedfordshire", tag: "Affordable", location: "Luton, England" },
    { name: "Cardiff Metropolitan University", tag: "Business", location: "Cardiff, Wales" },
    { name: "University of Sunderland", tag: "Scholarships", location: "Sunderland, England" },
    { name: "Ulster University", tag: "Research", location: "Belfast, N. Ireland" },
];

const requirements = [
    "Completed HSC/A-Levels (Bachelor's) or Bachelor's degree (Master's)",
    "IELTS/UKVI — typically 6.0 overall, no band below 5.5",
    "Statement of Purpose (SOP) outlining study and career goals",
    "Proof of funds covering tuition and living costs (28 days' bank statement)",
    "Confirmation of Acceptance for Studies (CAS) from the university",
    "Valid passport with at least 6 months' validity",
];

const intakes = ["September (Main Intake)", "January", "May (Selected Universities)"];

export default function Uk() {
    return (
        <CountryPageTemplate
            flag="gb"
            name="the United Kingdom"
            heroImage={ukImage}
            tagline="From centuries-old universities to modern career-focused programs, the UK offers a fast track to a globally respected degree — plus two years to work after you graduate."
            overview="The United Kingdom remains one of the top destinations for Bangladeshi students thanks to its shorter degree lengths, world-class teaching and the Graduate Route post-study work visa. ARZ International helps you shortlist the right university, prepare a strong application, and manage every visa document from CAS to your final biometric appointment."
            highlights={highlights}
            popularFields={popularFields}
            universities={universities}
            requirements={requirements}
            intakes={intakes}
        />
    );
}
