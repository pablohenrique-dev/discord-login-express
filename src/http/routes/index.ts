import { Router } from "express";
import { discordRouter } from "./discord.router";

export const routes = Router();

routes.use("/api", discordRouter);