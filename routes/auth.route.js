import express from "express";
import { signin, signup, logout } from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", signin);
router.post("/logout", auth, logout);

export default router;
