import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        candidateID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Candidate",
            required: true,
        },
        fullName: {
            type: String,
            default: "",
        },
        jobTitle: {
            type: String,
            default: "",
        },
        companyName: {
            type: String,
            default: "",
        },
        lastUpdatedAt: {
            type: Date,
            default: Date.now(),
        },
        location: {
            type: String,
            default: "",
        },
        experience: {
            type: String,
            default: "0",
        },
        salary: {
            type: String,
            default: "",
        },
        mobileNumber: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            default: "",
        },
        availabilityToJoin: {
            type: String,
            enum: ["15days", "1month", "2months", "3months", "morethan3months"],
            default: "1month",
        },

        employment: {
            isCurrentEmployement: {
                type: Boolean,
            },
            employmentType: {
                type: String,
                enum: ["fulltime", "parttime", "internship"],
            },
            personalDetails: {
                gender: {
                    type: String,
                    enum: ["male", "female", "transgender"],
                },
                maritalStatus: {
                    type: String,
                    enum: [
                        "married",
                        "unmarried",
                        "widowed",
                        "divorced",
                        "separated",
                        "other",
                    ],
                },
                dob: {
                    type: String,
                },
                category: {
                    type: String,
                    enum: [
                        "general",
                        "scheduled-cast",
                        "scheduled-tribe",
                        "obc-creamy",
                        "obc-non-creamy",
                        "other",
                    ],
                },
                abled: {
                    type: Boolean,
                },
                type: {
                    type: String,
                },
                workplaceAssistance: {
                    type: String,
                },
                address: {
                    type: String,
                },
                city: {
                    type: String,
                },
                pincode: {
                    type: Number,
                },
            },
        },
    },
    {
        timestamps: true,
    }
);

export const Profile = mongoose.model("Profile", profileSchema);
