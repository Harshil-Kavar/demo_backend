import express from "express";
import cors from "cors";
import path from "path";
import candidatehRoutes from "./routes/candidate.route.js";
import { connectToDatabase } from "./db/database.js";
import { auth } from "./middlewares/auth.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
connectToDatabase();
const app = express();


app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.use("/api/candidate", candidatehRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
