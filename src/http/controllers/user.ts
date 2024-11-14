import { authConfig } from "@/config/auth";
import { env } from "@/env";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export class UserController {
  async authenticate(req: Request, res: Response) {
    try {
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
      const { user } = req;
    } catch (error) {}
  }
}
