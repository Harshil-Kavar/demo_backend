import { CustomError } from "./errorHandler.js";
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;
    if (!token) {
      req.headers.Authorization
        ? req.headers.Authorization.split(" ")[1]
        : null;
    }

    if (!token) throw new CustomError(401, "Token Required");

    const decodedJWT = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          throw new CustomError(401, "Unauthorized");
        }
        return decoded;
      }
    );

    if (!decodedJWT) throw new CustomError(401, "Unauthorized");

    const user = {
      id: decodedJWT._id,
      email: decodedJWT.email,
    };
    console.log(user)
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
