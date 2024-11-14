import { Router } from "express";
import passport from "passport";
import { UserController } from "../controllers/user";

export const discordRouter = Router();
const userController = new UserController();

discordRouter.get(
  "/discord",
  passport.authenticate("discord", { scope: ["identify", "email"] })
);

discordRouter.get("/logout", userController.logout);

discordRouter.get(
  "/discord/redirect",
  passport.authenticate("discord", { session: false }),
  userController.authenticate
);
