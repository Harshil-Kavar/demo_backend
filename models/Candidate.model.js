import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  workStatus: {
    type: String,
    required: true,
    enum: ["experienced", "fresher"],
  },
  location: {
    type: String,
    default: "",
  },
  skills: [
    {
      type: String,
    },
  ],
  companyName: {
    type: String,
    default: "",
  },
  jobTitle: {
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
  availabilityToJoin: {
    type: String,
    enum: ["15days", "1month", "2months", "3months", "morethan3months"],
    default: "1month",
  },
  profileImage: {
    type: String,
    default: "",
  },
  college: {
    type: String,
    default: "",
  },
  industry: {
    type: String,
    default: "",
  },
  dob: {
    type: String,
  },
  maritalStatus: {
    type: String,
    enum: ["married", "unmarried"],
    default: "unmarried",
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required:true,
  },
});

export const Candidate = mongoose.model("Candidate", candidateSchema);
