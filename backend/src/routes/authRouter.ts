import { Router } from "express";
import { signIn, signUp } from "../controllers/authController";

export const authRouter = Router();

authRouter.post("/sign-in", signIn);

authRouter.post("/sign-up", signUp);
