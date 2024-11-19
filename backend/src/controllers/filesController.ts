import { Request, Response } from "express";
import sharp from "sharp";
import path from "path";

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
  IUserViewModel,
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
} from "../interfaces";
import { USER_ROLES } from "../utils/userRoles";
import { UsersModel } from "../models/UsersModel";

const filesModel = new FilesModel(db);
const usersModel = new UsersModel(db);

export const getFiles = async (
  req: Request,
  res: Response<IFileViewModel[]>
) => {
  try {
    console.log("GET FILES CALLED");
    const currentUser = req.user;
    if (currentUser) {
      const { id, role } = currentUser;
      let foundFiles = null;
      switch (role) {
        case USER_ROLES.ADMIN: {
          foundFiles = await filesModel.findAll();
          break;
        }
        case USER_ROLES.MODER: {
          foundFiles = await filesModel.findAll();
          break;
        }
        default: {
          foundFiles = await filesModel.findAllForUser(id);
          break;
        }
      }
      const filesView = await Promise.all(
        foundFiles.map(async (file) => {
          const { author_id, available_for } = file;
          const authorData = await usersModel.findById(author_id);
          const { username } = authorData as IUserViewModel;
          const availableForData = await usersModel.getUsernames(available_for);
          const { mimetype, filepath, thumbnail_path, ...fileView } = file;
          return {
            ...fileView,
            author: username,
            available_for: availableForData,
          };
        })
      );
      res.status(STATUS.OK_200).json(filesView);
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
      const { id: userId, role } = currentUser;
      let foundFile = null;
      switch (role) {
        case USER_ROLES.ADMIN: {
          foundFile = await filesModel.findById(id);
          break;
        }
        case USER_ROLES.MODER: {
          foundFile = await filesModel.findById(id);
          break;
        }
        default: {
          foundFile = await filesModel.findByIdForUser(id, userId);
          break;
        }
      }
      if (foundFile) {
        const { author_id, available_for } = foundFile;
        const availableForData = await usersModel.getUsernames(available_for);
        const author = await usersModel.findById(author_id);
        const authotUsername = author?.username;
        const documentView = {
          ...foundFile,
          author: authotUsername,
          available_for: availableForData,
        };
        res.status(STATUS.OK_200).json(documentView as IFileViewModel);
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
  res: Response
) => {
  try {
    console.log("GET FILE CALLED");
    const id = +req.params.id;
    const currentUser = req.user;
    if (currentUser) {
      const fileData = await filesModel.findById(id);
      if (fileData) {
        const dirname = path.resolve();
        const fullFilePath = path.join(dirname, fileData.filepath as string);
        console.log(fullFilePath);
        res
          .status(STATUS.OK_200)
          .type(fileData.mimetype as string)
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
      const file = req.file;
      const { mimetype } = file;
      const params = JSON.parse(req.body.params);
      const { available_for, public_file } = params;
      const filepath = file.path;
      const filename = file.originalname;
      console.log("FILE NAME", file);
      const filetype = filename
        .substring(filename.lastIndexOf("."))
        .toLowerCase();
      const thumbnail_path =
        "./public/thumbnails/" + "thumbnail-" + Date.now() + file.originalname;
      filesModel.create(
        userId,
        filepath,
        public_file,
        filename,
        mimetype,
        available_for,
        thumbnail_path,
        filetype
      );
      if (mimetype === "image/jpeg" || mimetype == "image/png") {
        sharp(file.path)
          .resize(100, 100)
          .toFile(
            thumbnail_path,
            (err: Error, resizeImage: sharp.OutputInfo) => {
              if (err) {
                console.log(err);
              } else {
                console.log(resizeImage);
              }
            }
          );
      }
      res
        .status(STATUS.CREATED_201)
        .json({ message: `File ${filename} has been uploaded!` });
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
      const { id: userId, role } = currentUser;
      let deletedFile = null;
      switch (role) {
        case USER_ROLES.ADMIN: {
          deletedFile = await filesModel.removeById(id);
          break;
        }
        case USER_ROLES.MODER: {
          deletedFile = await filesModel.removeById(id);
          break;
        }
        default: {
          deletedFile = await filesModel.removeByIdForUser(userId, id);
        }
      }
      if (deletedFile) {
        removeFileFromFs(deletedFile.filepath);
        removeFileFromFs(deletedFile.thumbnail_path);
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
    const currentUser = req.user;
    if (currentUser) {
      const { id: userId, role } = currentUser;
      let wasUpdated = false;
      switch (role) {
        case USER_ROLES.ADMIN: {
          wasUpdated = await filesModel.update(id, data);
          break;
        }
        case USER_ROLES.MODER: {
          wasUpdated = await filesModel.update(id, data);
          break;
        }
        default: {
          wasUpdated = await filesModel.updateForUser(userId, id, data);
        }
      }
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

export const getThumbnail = async (
  req: RequestWithParams<IdParam>,
  res: Response<IDocumentViewModel | Record<string, string>>
) => {
  try {
    console.log("GET THUMBNAIL CALLED");
    const id = +req.params.id;
    const currentUser = req.user;
    if (currentUser) {
      const fileData = await filesModel.findById(id);

      if (fileData) {
        const dirname = path.resolve();
        const fullFilePath = path.join(
          dirname,
          fileData.thumbnail_path as string
        );
        res
          .status(STATUS.OK_200)
          .type(fileData.mimetype as string)
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
