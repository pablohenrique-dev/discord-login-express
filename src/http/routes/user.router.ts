import { Router } from "express";
import { verifyJwt } from "../middlewares/verify-jwt";
import { UserController } from "../controllers/user";

export const userRouter = Router();

const userController = new UserController();

userRouter.get("/profile", verifyJwt, userController.profile);
