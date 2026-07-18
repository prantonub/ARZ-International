import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        // Step 1 — Personal info
        fullName: { type: String, required: true, trim: true },
        dob: String,
        gender: String,
        phone: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        city: String,

        // Step 2 — Academic background
        studyStatus: String,
        sscYear: String,
        sscGpa: String,
        sscGroup: String,
        sscSchool: String,
        hscYear: String,
        hscGpa: String,
        hscGroup: String,
        hscCollege: String,
        uniName: String,
        uniSubject: String,
        degree: String,
        cgpa: String,

        // Step 3 — Program preference
        program: String,
        intake: String,
        field: String,
        koreanLevel: String,
        englishScore: String,

        // Step 4 — Documents & sponsorship
        passport: String,
        passportExpiry: String,
        appliedKorea: String,
        visaRejection: String,
        sponsor: String,
        sponsorOccupation: String,
        budget: String,
        referral: String,
        notes: String,

        status: {
            type: String,
            enum: ["new", "contacted", "in-progress", "closed"],
            default: "new",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
