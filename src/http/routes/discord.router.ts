import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { authConfig } from "@/config/auth";
import { env } from "@/env";

export const discordRouter = Router();

discordRouter.get(
  "/discord",
  passport.authenticate("discord", { scope: ["identify", "email"] })
);

discordRouter.get("/logout", (req, res) => {
  res.send("Logout");
});

discordRouter.get(
  "/discord/redirect",
  passport.authenticate("discord", { session: false }),
  (req, res) => {
    console.log("req", req.user);

    const accessToken = jwt.sign({}, authConfig.secret, {
      subject: req.user.id,
      expiresIn: authConfig.expiresIn["7d"],
    });

    const refreshToken = jwt.sign({}, authConfig.secret, {
      subject: req.user.id,
      expiresIn: authConfig.expiresIn["7d"],
    });

    const MILLISECONDS_IN_ONE_DAY = 1000 * 60 * 60 * 24;
    const MILLISECONDS_IN_SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;

    res.cookie("accessToken", accessToken, {
      path: "/",
      secure: true,
      sameSite: "strict",
      httpOnly: true,
      maxAge: MILLISECONDS_IN_ONE_DAY,
    });

    res.cookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: "strict",
      httpOnly: true,
      maxAge: MILLISECONDS_IN_SEVEN_DAYS,
    });

    res.redirect(env.BASE_CLIENT_URL + "/");
  }
);
