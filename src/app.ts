import express from "express";
import { routes } from "./routes";
import "@/config/passport";
import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

const CORS_ALLOWED_ORIGINS = ["http://localhost:3000"]

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use(
  cors({
    origin: CORS_ALLOWED_ORIGINS,
    credentials: true,
  })
);

app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello world!");
});
