import { authConfig } from "@/config/auth";
import { env } from "@/env";
import { userTokenParamSchema } from "@/schemas/controller/user";
import { makeGetProfileUseCase } from "@/use-cases/factories/make-get-profile-use-case";
import { User } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export class UserController {
  async authenticate(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const { id, role } = req.user as User;

      const accessToken = jwt.sign({ role }, authConfig.secret, {
        subject: id,
        expiresIn: authConfig.expiresIn["1h"],
      });

      const refreshToken = jwt.sign({ role }, authConfig.secret, {
        subject: id,
        expiresIn: authConfig.expiresIn["7d"],
      });

      const MILLISECONDS_IN_ONE_HOUR = 1000 * 60 * 60;
      const MILLISECONDS_IN_SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;

      res.cookie("accessToken", accessToken, {
        path: "/",
        secure: true,
        sameSite: "none",
        httpOnly: true,
        maxAge: MILLISECONDS_IN_ONE_HOUR,
      });

      res.cookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: "none",
        httpOnly: true,
        maxAge: MILLISECONDS_IN_SEVEN_DAYS,
      });

      return res.redirect(env.BASE_CLIENT_URL + "/");
    } catch (error) {}
  }

  async logout(req: Request, res: Response) {
    res.clearCookie("accessToken", {
      path: "/",
      secure: true,
      sameSite: "strict",
      httpOnly: true,
    });

    res.clearCookie("refreshToken", {
      path: "/",
      secure: true,
      sameSite: "strict",
      httpOnly: true,
    });

    return res.redirect(env.BASE_CLIENT_URL + "/");
  }

  async profile(req: Request, res: Response) {
    const { id } = userTokenParamSchema.parse(req.user);

    try {
      const getProfileUseCase = makeGetProfileUseCase();

      const { user } = await getProfileUseCase.execute({ userId: id });

      return res.status(200).json({ user });
    } catch (error) {
      throw new Error("Ocorreu um erro");
    }
  }
}
