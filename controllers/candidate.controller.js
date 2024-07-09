import { CustomError } from "../middlewares/errorHandler.js";
import bcrypt from "bcrypt";
import { Candidate } from "../models/Candidate.model.js";
import { GoogleUser } from "../models/Google.user.model.js";
import getAuthToken from "../utils/getAuthToken.js";
import { createCandidate } from "../repository/candidate.repo.js";
import { createProfile } from "../repository/profile.repo.js";
import { createGoogleUser } from "../repository/google.user.repo.js";
import { customResponse } from "../utils/cutomResponse.js";

export const candidateSignUp = async (req, res, next) => {
  try {
    const {fullName,mobileNumber,email,password,workStatus,sendNotifications} = req.body;

    if (!fullName || !email || !password || !mobileNumber || !workStatus)
      throw new CustomError(400, "All fields are required.");

    const isExistingCandidate = await Candidate.findOne({ email });

    if (isExistingCandidate)
      throw new CustomError(409, "Candidate already exists.");

    const candidate = await createCandidate(fullName,mobileNumber,email,password,workStatus,sendNotifications);

    const profile = await createProfile(candidate);

    const authToken = getAuthToken(candidate._id, candidate.email);

    res
      .status(200)
      .json(
        customResponse(
          true,
          "Candidate registerd successfully.",
          {token:authToken,candidate}
        )
      );
  } catch (error) {
    next(error);
  }
};

export const candidateSignIn = async (req, res, next) => {
  try {
    const { email, password, type, googleId, name, picture } = req.body;

    if (type == "google") {
      let isCandidateExist = await GoogleUser.findOne({ googleId: googleId });

      if (!isCandidateExist) {
        const googleUser = await createGoogleUser(googleId,email,name,picture);

        const profile = await createProfile(googleUser);

        const authToken = getAuthToken(googleUser._id, googleUser.email);

        return res.status(200).json(
          customResponse(true, "Login via google successful",  {
            token:authToken,
            id: googleUser._id,
          })
        );
      } else {
        const authToken = getAuthToken(
          isCandidateExist._id,
          isCandidateExist.email
        );

        return res.status(200).json(
          customResponse(true, "Login via google successful", {
            token:authToken,
            id: isCandidateExist._id,
          })
        );
      }
    }

    if (!email || !password)
      throw new CustomError(400, "All fields are required.");

    const candidate = await Candidate.findOne({ email });

    if (!candidate) throw new CustomError(404, "Candidate not found.");

    const isPasswordValid = await bcrypt.compare(password, candidate.password);

    if (!isPasswordValid) throw new CustomError(401, "Invalid credentials.");

    const authToken = getAuthToken(candidate._id, candidate.email);

    res.status(200).json(
      customResponse(true, "Candidate logged in successfully.", {
        token:authToken,
        id: candidate._id,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const candidateSignOut = async (req, res, next) => {
  try {
    res
      .status(200)
      .json(customResponse(true, "Candidate logged out successfully.", {}));
  } catch (error) {
    next(error);
  }
};
