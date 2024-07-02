import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
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
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    workStatus: {
      type: String,
      enum: ["experienced", "fresher"],
      required: true,
    },
    sendNotifications: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Candidate = mongoose.model("Candidate", candidateSchema);
