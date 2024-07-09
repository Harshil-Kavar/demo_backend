import { GoogleUser } from "../models/Google.user.model.js";

export const createGoogleUser = async ({ googleId, email, fullName, picture }) => {
  const googleUser = await GoogleUser.create({ googleId, email, fullName, picture});
  return googleUser;
};
