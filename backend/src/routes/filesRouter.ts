import { Router } from "express";
import {
  deleteFile,
  downloadFile,
  getFile,
  getFiles,
  getThumbnail,
  postFile,
  updateFile,
} from "../controllers/filesController";
import { fileUpload } from "../middleWare/fileUpload";

export const filesRouter = Router();

filesRouter.get("/", getFiles);
filesRouter.post("/", fileUpload.single("file"), postFile);
filesRouter.get("/:id", getFile);
filesRouter.delete("/:id", deleteFile);
filesRouter.put("/:id", updateFile);
filesRouter.get("/download/:id", downloadFile);
filesRouter.get('/:id/thumbnail', getThumbnail);
