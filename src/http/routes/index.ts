import { Router } from "express";
import { discordRouter } from "./discord.router";
import { userRouter } from "./user.router";

export const routes = Router();

routes.use("/api", discordRouter);
routes.use("/api", userRouter);