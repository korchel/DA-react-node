import { Router } from "express";

import {
  deleteDocument,
  getDocument,
  getDocuments,
  postDocument,
  updateDocument,
} from "../controllers/documentsController";

export const documentsRouter = Router();

documentsRouter.get("/", getDocuments);

documentsRouter.post("/", postDocument);

documentsRouter.get("/:id", getDocument);

documentsRouter.delete("/:id", deleteDocument);

documentsRouter.put("/:id", updateDocument);
