import { Router } from "express";

import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/usersController";
import { isAdmin } from "../middleWare/isAdmin";

export const usersRouter = Router();

usersRouter.get("/", getUsers);  

usersRouter.get("/:id", getUser);

usersRouter.delete("/:id", isAdmin, deleteUser);

usersRouter.put("/:id", isAdmin, updateUser);
