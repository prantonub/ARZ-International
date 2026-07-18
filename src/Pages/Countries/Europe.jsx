import CountryPageTemplate from "./CountryPageTemplate";

const heroImage = "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1400&q=80";

const highlights = [
    { title: "Low or No Tuition Fees", text: "Many public universities across Europe offer tuition-free or low-cost programs, even for international students.", icon: "💶" },
    { title: "Schengen Access", text: "A single student visa often lets you travel across 27 Schengen countries during your studies.", icon: "🗺️" },
    { title: "English-Taught Programs", text: "A fast-growing number of Bachelor's and Master's programs are taught fully in English.", icon: "🗣️" },
    { title: "Strong Job Market", text: "Many countries offer post-study residence permits so graduates can search for skilled work.", icon: "💼" },
];

const popularFields = ["Engineering", "Computer Science", "Business & Management", "Architecture", "Renewable Energy", "Design"];

const universities = [
    { name: "University of Debrecen", tag: "Hungary", location: "Debrecen, Hungary" },
    { name: "University of Malta", tag: "Malta", location: "Msida, Malta" },
    { name: "Riga Technical University", tag: "Latvia", location: "Riga, Latvia" },
    { name: "University of Warsaw", tag: "Poland", location: "Warsaw, Poland" },
    { name: "Masaryk University", tag: "Czechia", location: "Brno, Czech Republic" },
    { name: "University of Cyprus", tag: "Cyprus", location: "Nicosia, Cyprus" },
];

const requirements = [
    "Completed HSC/A-Levels (Bachelor's) or Bachelor's degree (Master's)",
    "IELTS/English proficiency proof (varies by country and program)",
    "Motivation letter and academic transcripts, often notarised/apostilled",
    "Proof of funds or blocked account, depending on destination country",
    "Confirmed university admission letter for visa application",
    "Valid passport and, in some cases, national visa (Type D) appointment",
];

const intakes = ["September / October (Main Intake)", "February (Selected Countries)"];

export default function Europe() {
    return (
        <CountryPageTemplate
            flag="eu"
            name="Europe"
            heroImage={heroImage}
            tagline="Affordable, high-quality education, English-taught programs, and easy travel across the continent — Europe is a smart, budget-friendly path to an international degree."
            overview="From Hungary and Malta to Poland and the Baltics, Europe offers Bangladeshi students an increasingly accessible route into globally respected universities — often at a fraction of UK or Australian tuition costs. ARZ International helps you compare countries, prepare country-specific documentation, and navigate each destination's visa process."
            highlights={highlights}
            popularFields={popularFields}
            universities={universities}
            requirements={requirements}
            intakes={intakes}
        />
    );
}
