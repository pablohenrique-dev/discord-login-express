import { Router } from "express";
import { UserController } from "../controllers/user";
import { verifyJwt } from "../middlewares/verify-jwt";

export const userRouter = Router();

const userController = new UserController();

userRouter.get("/profile", verifyJwt, userController.profile);
