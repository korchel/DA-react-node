import { Request, Response } from "express";
import {
  IFileFormdataModel,
  IFileInputModel,
  IFileViewModel,
} from "../interfaces/files";
import { db } from "../db/db";
import { STATUS } from "../statusCodes";
import { FilesModel } from "../models/FilesModel";
import { removeFileFromFs } from "../utils/removeFileFromFs";
import {
  IDocumentViewModel,
  IdParam,
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
} from "../interfaces";
import path from "path";
import { USER_ROLES } from "../utils/userRoles";

const filesModel = new FilesModel(db);

export const getFiles = async (
  req: Request,
  res: Response<IFileViewModel[]>
) => {
  try {
    console.log("GET FILES CALLED");
    const currentUser = req.user;
    if (currentUser) {
      const { id, role } = currentUser;
      if (role === USER_ROLES.ADMIN) {
        const data = await filesModel.findAllForAdmin();
        res.status(STATUS.OK_200).json(data);
      } else {
        const data = await filesModel.findAll(id);
        res.status(STATUS.OK_200).json(data);
      }
    } else {
      res.sendStatus(STATUS.FORBIDDEN_403);
    }
  } catch (error) {
    res.sendStatus(STATUS.SERVER_ERROR_500);
  }
};

export const getFile = async (
  req: RequestWithParams<IdParam>,
  res: Response<IFileViewModel | Record<string, string>>
) => {
  try {
    console.log("GET FILE CALLED");
    const id = +req.params.id;
    const currentUser = req.user;
    if (currentUser) {
      const foundFile = await filesModel.findById(id, currentUser.id);
      if (foundFile) {
        res.status(STATUS.OK_200).json(foundFile);
      } else {
        res.status(STATUS.NOT_FOUND_404).json({ message: "No such file" });
      }
    }
  } catch (error) {
    res.sendStatus(STATUS.SERVER_ERROR_500);
  }
};

export const downloadFile = async (
  req: RequestWithParams<IdParam>,
  res: Response<IDocumentViewModel | Record<string, string>>
) => {
  try {
    console.log("GET FILE CALLED");
    const id = +req.params.id;
    const currentUser = req.user;
    if (currentUser) {
      const fileData = await filesModel.findFileNameById(id, currentUser.id);
      if (fileData) {
        const dirname = path.resolve();
        const fullFilePath = path.join(
          dirname,
          "public/files/" + fileData.filename
        );
        res
          .status(STATUS.OK_200)
          .type(fileData.filetype)
          .sendFile(fullFilePath);
      } else {
        res.status(STATUS.NOT_FOUND_404).json({ message: "No such file" });
      }
    }
  } catch (error) {
    console.log("ERROR", error);
    res.sendStatus(STATUS.SERVER_ERROR_500);
  }
};

export const postFile = async (
  req: RequestWithBody<IFileFormdataModel>,
  res: Response
) => {
  console.log("POST FILE CALLED");
  try {
    if (req.file && req.user) {
      const userId = req.user.id;
      console.log("USER ID", userId);
      const file = req.file;
      const { filename, mimetype } = file;
      const params = JSON.parse(req.body.params);
      const { available_for, public_file } = params;
      const filepath = req.file.path;
      filesModel.create(
        userId,
        filepath,
        public_file,
        filename,
        mimetype,
        available_for
      );
      res.status(STATUS.CREATED_201).json({message: `File ${filename} has been uploaded!`});
    } else {
      res.sendStatus(STATUS.FORBIDDEN_403);
    }
  } catch (error) {
    console.log("ERROR", error);
    res.sendStatus(STATUS.SERVER_ERROR_500);
  }
};

export const deleteFile = async (
  req: RequestWithParams<IdParam>,
  res: Response
) => {
  console.log("DELETE FILE CALLED");
  try {
    const id = +req.params.id;
    const currentUser = req.user;
    if (currentUser) {
      const deletedFile = await filesModel.removeById(currentUser.id, id);
      console.log(deletedFile);
      if (deletedFile) {
        removeFileFromFs(deletedFile);
        res
          .status(STATUS.NO_CONTENT_204)
          .json({ message: "Successfully deleted!" });
      } else {
        res.sendStatus(STATUS.NOT_FOUND_404);
      }
    } else {
      res
        .status(STATUS.FORBIDDEN_403)
        .json({ message: "You are not the author" });
    }
  } catch (error) {
    res.sendStatus(STATUS.SERVER_ERROR_500);
  }
};

export const updateFile = async (
  req: RequestWithParamsAndBody<IdParam, IFileInputModel>,
  res: Response
) => {
  console.log("UPDATE FILE CALLED");
  try {
    const id = +req.params.id;
    const data = req.body;
    const userId = req.user?.id;
    if (userId) {
      const wasUpdated = await filesModel.update(userId, id, data);
      if (wasUpdated) {
        res.sendStatus(STATUS.NO_CONTENT_204);
      } else {
        res.sendStatus(STATUS.NOT_FOUND_404);
      }
    }
  } catch (error) {
    res.sendStatus(STATUS.SERVER_ERROR_500);
  }
};
