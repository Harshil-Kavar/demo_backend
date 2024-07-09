import mongoose from "mongoose";

const googleUserSchema = mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const GoogleUser = mongoose.model("GoogleUser", googleUserSchema);
