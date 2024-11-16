import express from "express";
import "@/config/passport";
import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";
import { routes } from "./http/routes";

export const app = express();

const CORS_ALLOWED_ORIGINS = ["http://localhost:5173"]

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: CORS_ALLOWED_ORIGINS,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true,
  })
);
app.use(passport.initialize());

app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello world!");
});
