import { Candidate } from "../models/Candidate.model.js";
import bcrypt from "bcrypt";

export const createCandidate = async (fullName, mobileNumber, email, password, workStatus, sendNotifications ) => {
    
  const hasedPassword = await bcrypt.hash(password, 10);

  const candidate = await Candidate.create({
    fullName,
    mobileNumber,
    email,
    password: hasedPassword,
    workStatus,
    sendNotifications,
  });
  candidate.password = null;

  return candidate;
};
