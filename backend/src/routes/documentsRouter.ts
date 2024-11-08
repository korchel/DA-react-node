import { Router } from "express";

import {
  deleteDocument,
  getDocument,
  getDocuments,
  postDocument,
  updateDocument,
} from "../controllers/documentsController";
import { isAuthor } from "../middleWare/isAuthor";

export const documentsRouter = Router();

documentsRouter.get("/", getDocuments); //done

// /for-users path is not used

documentsRouter.post("/", postDocument); //done

documentsRouter.get("/:id", getDocument); //done

documentsRouter.delete("/:id", deleteDocument); //done

documentsRouter.put("/:id", updateDocument); //done
