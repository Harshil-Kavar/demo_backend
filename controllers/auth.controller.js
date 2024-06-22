import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "No such user registered yet" });
  }
  const decodedPassword = await bcrypt.compare(password, user.password);
  if (!decodedPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Your password is not valid" });
  }
  const token = jwt.sign({ id: user._id }, "DemoJesonWebTokenSecret");
  return res
    .status(200)
    .cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    })
    .json({ succsess: true, message: "Loggedin Successfully", token });
};

export const createDemoUser = async (req, res) => {
  try {
    const hasedPassword = await bcrypt.hash("admin", 12);
    const user = await User.create({
      email: "admin@gmail.com",
      password: hasedPassword,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
