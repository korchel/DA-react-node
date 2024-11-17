import { Request, Response } from "express";
import { db } from "../db/db";
import {
  IdParam,
  IUserInputModel,
  IUserViewModel,
  RequestWithParams,
  RequestWithParamsAndBody,
} from "../interfaces";
import { STATUS } from "../statusCodes";
import { UsersModel } from "../models/UsersModel";
import { USER_ROLES } from "../utils/userRoles";

const usersModel = new UsersModel(db);
export const getUsers = async (
  req: Request,
  res: Response<IUserViewModel[]>
) => {
  try {
    console.log("GET USERS CALLED");
    const data = await usersModel.findAll();
    res.status(STATUS.OK_200).json(data);
  } catch (error) {
    res.sendStatus(STATUS.SERVER_ERROR_500);
  }
};

export const getUser = async (
  req: RequestWithParams<IdParam>,
  res: Response<IUserViewModel | string>
) => {
  console.log("GET USER CALLED");
  try {
    const id = +req.params.id;
    const requestedUser = await usersModel.findById(id);
    if (requestedUser) {
      res.status(STATUS.OK_200).json(requestedUser);
    } else {
      res.status(STATUS.NOT_FOUND_404).json("No such user");
    }
  } catch (error) {
    res.sendStatus(STATUS.SERVER_ERROR_500);
  }
};

export const deleteUser = async (
  req: RequestWithParams<IdParam>,
  res: Response
) => {
  console.log("DELETE USER CALLED");
  try {
    const id = +req.params.id;
    const user = req.user;
    const isAdmin = user?.role === USER_ROLES.ADMIN;
    if (!isAdmin) {
      res
        .status(STATUS.UNAUTHORIZED_401)
        .json({ message: "You are not admin!" });
    } else {
      const wasDeleted = await usersModel.removeById(id);
      if (wasDeleted) {
        res.sendStatus(STATUS.NO_CONTENT_204);
      } else {
        res.sendStatus(STATUS.NOT_FOUND_404);
      }
    }
  } catch (error) {
    res.sendStatus(STATUS.SERVER_ERROR_500);
  }
};

export const updateUser = async (
  req: RequestWithParamsAndBody<IdParam, IUserInputModel>,
  res: Response
) => {
  console.log("UPDATE USER CALLED");
  try {
    const id = +req.params.id;
    const data = req.body;
    const user = req.user;
    const isAdmin = user?.role === USER_ROLES.ADMIN;
    const updatedUser = await usersModel.update(id, data, isAdmin);
    if (updatedUser) {
      res.status(STATUS.OK_200).json(updatedUser);
    } else {
      res.sendStatus(STATUS.NOT_FOUND_404);
    }
  } catch (error) {
    res.sendStatus(STATUS.SERVER_ERROR_500);
  }
};
