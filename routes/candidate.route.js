import express from "express";
import {
  candidateSignIn,
  candidateSignUp,
  getCandidateDetails,
} from "../controllers/candidate.controller.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", candidateSignUp);
router.post("/login", candidateSignIn);
router.get("/get-candidate-profile/:id",auth, getCandidateDetails);

export default router;
