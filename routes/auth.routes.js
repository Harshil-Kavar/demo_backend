import express from "express";
import { createDemoUser, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.get("/createdemouser", createDemoUser);

export default router;
