import { CustomError } from "../middlewares/errorHandler.js";
import { User } from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const {
      fullName,
      mobileNumber,
      email,
      password,
      workStatus,
      sendNotifications,
    } = req.body;

    if (!fullName || !email || !password || !mobileNumber || !workStatus)
      throw new CustomError(400, "All fields are required.");

    const isExistingUser = await User.findOne({ email });

    if (isExistingUser) throw new CustomError(409, "User already exists.");

    const hasedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      mobileNumber,
      email,
      password: hasedPassword,
      workStatus,
      sendNotifications,
    });
    user.password = null;

    res
      .status(201)
      .json({ success: true, message: "User registerd successfully.", user });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new CustomError(400, "All fields are required.");
    const user = await User.findOne({ email });
    if (!user) throw new CustomError(404, "User not found.");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new CustomError(401, "Invalid credentials.");

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({ success: true, message: "User logged in successfully.", token });
  } catch (error) {
    next(error);
  }
};
