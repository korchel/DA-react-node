import { Response } from "express";

import {
  ISigninInputModel,
  ISignUpInputModel,
  RequestWithBody,
} from "../interfaces";
import { db } from "../db/db";
import { STATUS } from "../statusCodes";
import { getJwtTokens } from "../utils/jwtHelpers";
import { UsersModel } from "../models/UsersModel";

const usersModel = new UsersModel(db);

export const signUp = async (
  req: RequestWithBody<ISignUpInputModel>,
  res: Response
) => {
  console.log("SIGNUP CALLED");
  try {
    const newUser = await usersModel.register(req.body);
    if (newUser) {
      res
        .status(STATUS.CREATED_201)
        .json({ message: `User ${newUser.username} has been created!` });
    } else {
      res
        .status(STATUS.BAD_REQUEST_400)
        .json({ message: `User name or email are already registered` });
    }
  } catch (error) {
    res.status(STATUS.SERVER_ERROR_500);
  }
};

export const signIn = async (
  req: RequestWithBody<ISigninInputModel>,
  res: Response
) => {
  console.log("SIGNIN CALLED");
  try {
    const foundUser = await usersModel.authenticate(req.body);
    console.log("FOUND USER", foundUser);
    if (foundUser) {
      const tokens = getJwtTokens(foundUser);
      const { id, role, username } = foundUser;
      console.log("TOKEN FOUND");
      res
        .cookie("token", tokens.token, { httpOnly: true })
        .status(STATUS.OK_200)
        .json({ user: { id, role, username } });
    } else {
      res
        .status(STATUS.FORBIDDEN_403)
        .json({
          message: "Wrong username or password",
          status: STATUS.FORBIDDEN_403,
        });
    }
  } catch (error) {
    res.status(STATUS.UNAUTHORIZED_401);
  }
};
