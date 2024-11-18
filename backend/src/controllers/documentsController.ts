import { Request, Response } from "express";
import {
  IDocumentInputModel,
  IDocumentViewModel,
  IdParam,
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
} from "../interfaces";
import { db } from "../db/db";
import { STATUS } from "../statusCodes";
import { DocumentsModel } from "../models/DocumentsModel";
import { USER_ROLES } from "../utils/userRoles";

const documentsModel = new DocumentsModel(db);

export const getDocuments = async (
  req: Request,
  res: Response<IDocumentViewModel[]>
) => {
  try {
    console.log("GET DOCUMENTS CALLED");
    const currentUser = req.user;
    if (currentUser) {
      const { id, role } = currentUser;
      switch (role) {
        case USER_ROLES.ADMIN: {
          const data = await documentsModel.findAll();
          res.status(STATUS.OK_200).json(data);
          return;
        }
        case USER_ROLES.MODER: {
          const data = await documentsModel.findAll();
          res.status(STATUS.OK_200).json(data);
          return;
        }
        default: {
          const data = await documentsModel.findAllForUser(id);
          res.status(STATUS.OK_200).json(data);
          return;
        }
      }
    } else {
      res.sendStatus(STATUS.FORBIDDEN_403);
    }
  } catch (error) {
    res.sendStatus(STATUS.SERVER_ERROR_500);
  }
};

export const getDocument = async (
  req: RequestWithParams<IdParam>,
  res: Response<IDocumentViewModel | Record<string, string>>
) => {
  console.log("GET ONE DOCUMENT CALLED");
  try {
    const id = +req.params.id;
    const currentUser = req.user;
    if (currentUser) {
      const { id: userId, role } = currentUser;
      let foundDocument = null;
      switch (role) {
        case USER_ROLES.ADMIN: {
          foundDocument = await documentsModel.findById(id);
          break;
        }
        case USER_ROLES.MODER: {
          foundDocument = await documentsModel.findById(id);
          break;
        }
        default: {
          foundDocument = await documentsModel.findByIdForUser(id, userId);
          break;
        }
      }
      if (foundDocument) {
        res.status(STATUS.OK_200).json(foundDocument);
      } else {
        res
          .status(STATUS.FORBIDDEN_403)
          .json({ message: `Not allowed for user ${currentUser.username}` });
      }
    }
  } catch (error) {
    res.sendStatus(STATUS.SERVER_ERROR_500);
  }
};

export const postDocument = async (
  req: RequestWithBody<IDocumentInputModel>,
  res: Response
) => {
  console.log("POST DOCUMENT CALLED");
  try {
    const recievedData = req.body;
    if (req.user) {
      const userId = req.user.id;
      const createdDocument = await documentsModel.create(userId, recievedData);
      res.status(STATUS.CREATED_201).json(createdDocument);
    } else {
      res.sendStatus(STATUS.UNAUTHORIZED_401);
    }
  } catch (error) {
    res.sendStatus(STATUS.SERVER_ERROR_500);
  }
};

export const deleteDocument = async (
  req: RequestWithParams<IdParam>,
  res: Response
) => {
  console.log("DELETE DOCUMENT CALLED");
  try {
    const id = +req.params.id;
    const currentUser = req.user;
    if (currentUser) {
      const { id: userId, role } = currentUser;
      let wasDeleted = false;
      switch (role) {
        case USER_ROLES.ADMIN: {
          wasDeleted = await documentsModel.removeById(id);
          break;
        }
        case USER_ROLES.MODER: {
          wasDeleted = await documentsModel.removeById(id);
          break;
        }
        default: {
          wasDeleted = await documentsModel.removeByIdForUser(userId, id);
        }
      }
      if (wasDeleted) {
        res
          .status(STATUS.OK_200)
          .json({ message: "Document has been removed" });
        return;
      } else {
        res.sendStatus(STATUS.NOT_FOUND_404);
        return;
      }
    } else {
      res
        .status(STATUS.FORBIDDEN_403)
        .json({ message: "You are not authorized to delete this document" });
    }
  } catch (error) {
    res.sendStatus(STATUS.SERVER_ERROR_500);
  }
};

export const updateDocument = async (
  req: RequestWithParamsAndBody<IdParam, IDocumentInputModel>,
  res: Response
) => {
  console.log("UPDATE DOCUMENT CALLED");
  try {
    const id = +req.params.id;
    const data = req.body;
    const currentUser = req.user;
    if (currentUser) {
      const { id: userId, role } = currentUser;
      switch (role) {
        case USER_ROLES.ADMIN: {
          const updatedDocument = await documentsModel.update(id, data);
          res.status(STATUS.OK_200).json(updatedDocument);
          return;
        }
        case USER_ROLES.MODER: {
          const updatedDocument = await documentsModel.update(id, data);
          res.status(STATUS.OK_200).json(updatedDocument);
          return;
        }
        default: {
          const updatedDocument = await documentsModel.updateForUser(
            userId,
            id,
            data
          );
          if (updatedDocument) {
            res.status(STATUS.OK_200).json(updatedDocument);
          } else {
            res
              .status(STATUS.FORBIDDEN_403)
              .json({ message: "You are not the author" });
          }
        }
      }
    }
  } catch (error) {
    res.sendStatus(STATUS.SERVER_ERROR_500);
  }
};
