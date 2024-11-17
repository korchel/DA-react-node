import { Router } from "express";

import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/usersController";

export const usersRouter = Router();

usersRouter.get("/", getUsers);  

usersRouter.get("/:id", getUser);

usersRouter.delete("/:id", deleteUser);

usersRouter.put("/:id", updateUser);
