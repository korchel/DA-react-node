import { NextFunction, Request, Response } from "express";
import { STATUS } from "../statusCodes";
import { IdParam, RequestWithParams } from "../interfaces";
import { USER_ROLES } from "../utils/userRoles";

export const isAdmin = async (
  req: RequestWithParams<IdParam>,
  res: Response,
  next: NextFunction
) => {
  console.log("ISADMIN CALLED");
  try {
    const currentUser = req.user;
    console.log("CURRENT USER:", currentUser);
    if (!(currentUser?.role === USER_ROLES.ADMIN)) {
      req.isAdmin = false;
    } else {
      req.isAdmin = true;
    }
    next();
  } catch (error) {
    res.sendStatus(STATUS.SERVER_ERROR_500);
  }
};
