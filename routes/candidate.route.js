import express from "express";
import {
  candidateSignIn,
  candidateSignOut,
  candidateSignUp,
} from "../controllers/candidate.controller.js";
import { auth } from "../middlewares/auth.js";
import {
  getCandidateDetails,
  updateCandidateDetails,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.post("/signup", candidateSignUp);
router.post("/login", candidateSignIn);
router.get("/logout", auth, candidateSignOut);
router.get("/profile", auth, getCandidateDetails);
router.put("/profile", auth, updateCandidateDetails);

export default router;
