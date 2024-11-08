import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { STATUS } from "../statusCodes";
import { IUser } from "../interfaces";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("ISAUTHENTICATED CALLED");
  try {
    const token = req.cookies.token;
    if (!token) {
      console.log("NO TOKEN");
      res.status(STATUS.UNAUTHORIZED_401).json("Not authorized");
      return;
    }
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || "TEST"
    );
    req.user = decoded as IUser;
    next();
  } catch (error) {
    res.status(STATUS.FORBIDDEN_403).json("wrong token");
  }
};
