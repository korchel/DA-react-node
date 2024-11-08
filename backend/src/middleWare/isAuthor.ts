import { NextFunction, Request, Response } from "express";
import { IdParam, RequestWithParams } from "../interfaces";
import { STATUS } from "../statusCodes";

export const isAuthor = async (
  req: RequestWithParams<IdParam>,
  res: Response,
  next: NextFunction
) => {
  console.log("ISAUTHOR CALLED");
  try {
    const entityId = +req.params.id;
    const currentUserId = req.user?.id;
    if (!(entityId === currentUserId)) {
      res.status(STATUS.UNAUTHORIZED_401).json("You are not the author");
    }
    req.isAuthor = true;
    next();
  } catch (error) {
    res.sendStatus(STATUS.SERVER_ERROR_500);
  }
};
