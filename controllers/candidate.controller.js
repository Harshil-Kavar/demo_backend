import { CustomError } from "../middlewares/errorHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Candidate } from "../models/Candidate.model.js";
import { client } from "../index.js";
import { GoogleUser } from "../models/Google.user.model.js";

export const candidateSignUp = async (req, res, next) => {
  try {
    const {
      fullName,
      mobileNumber,
      email,
      password,
      workStatus,
      location,
      companyName,
      jobTitle,
      experience,
      salary,
      availabilityToJoin,
      profileImage,
      college,
      industry,
      dob,
      maritalStatus,
      gender,
    } = req.body;

    if (
      !fullName ||
      !mobileNumber ||
      !email ||
      !password ||
      !workStatus ||
      !gender
    )
      throw new CustomError(400, "All fields are required.");

    const isExistingCandidate = await Candidate.findOne({ email });

    if (isExistingCandidate)
      throw new CustomError(409, "Candidate already exists.");

    const hasedPassword = await bcrypt.hash(password, 10);

    const candidate = await Candidate.create({
      fullName: fullName,
      mobileNumber: mobileNumber,
      email: email,
      password: hasedPassword,
      workStatus: workStatus,
      location: location || "",
      companyName: companyName || "",
      jobTitle: jobTitle || "",
      experience: experience || "",
      salary: salary || "",
      availabilityToJoin: availabilityToJoin || "1month",
      profileImage: profileImage || "",
      college: college || "",
      industry: industry || "",
      dob: dob || "",
      maritalStatus: maritalStatus,
      gender: gender,
    });
    candidate.password = null;
    res.status(201).json({
      success: true,
      message: "Candidate registerd successfully.",
      candidate,
    });
  } catch (error) {
    next(error);
  }
};
export const candidateSignIn = async (req, res, next) => {
  try {
    const { email, password, type, token } = req.body;

    if (type == "google") {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];

      let isCandidateExist = await GoogleUser.findOne({ googleId: userid });

      console.log("payload", payload);

      if (!isCandidateExist) {
        const googleUser = GoogleUser.create({
          googleId: userid,
          email: payload["email"],
          name: payload["name"],
          picture: payload["picture"],
        });

        console.log("new google user : ", googleUser);

        const authToken = jwt.sign(
          { _id: googleUser._id },
          process.env.JWT_SECRET,
          {
            expiresIn: 24 * 60 * 60,
          }
        );
        res.cookie("jwt", authToken, {
          httpOnly: true,
          maxAge: 1 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
          status: "success",
          message: "Login via google successful",
          data: {
            userid: googleUser._id,
            token: authToken,
          },
        });
      } else {
        return res.status(500).json({ message: "Please try again" });
      }
    }

    if (!email || !password)
      throw new CustomError(400, "All fields are required.");
    const candidate = await Candidate.findOne({ email });
    if (!candidate) throw new CustomError(404, "Candidate not found.");
    const isPasswordValid = await bcrypt.compare(password, candidate.password);
    if (!isPasswordValid) throw new CustomError(401, "Invalid credentials.");
    const authToken = jwt.sign(
      { _id: candidate._id, email: candidate.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).cookie("token", authToken, { httpOnly: true }).json({
      success: true,
      message: "Candidate logged in successfully.",
      token: authToken,
    });
  } catch (error) {
    next(error);
  }
};
export const getCandidateDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new CustomError(400, "Candidate ID is required.");
    const candidate = await Candidate.findById(id);
    if (!candidate) throw new CustomError(404, "Candidate not found.");
    res.status(200).json({
      success: true,
      message: "Candidate details fetched successfully.",
      candidate,
    });
  } catch (error) {
    next(error);
  }
};
