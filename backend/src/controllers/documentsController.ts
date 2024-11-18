import { Request, Response } from "express";
import {
  IDocumentInputModel,
  IDocumentViewModel,
  IdParam,
  IUserViewModel,
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
} from "../interfaces";
import { db } from "../db/db";
import { STATUS } from "../statusCodes";
import { DocumentsModel } from "../models/DocumentsModel";
import { USER_ROLES } from "../utils/userRoles";
import { UsersModel } from "../models/UsersModel";

const documentsModel = new DocumentsModel(db);
const usersModel = new UsersModel(db);

export const getDocuments = async (
  req: Request,
  res: Response<IDocumentViewModel[]>
) => {
  try {
    console.log("GET DOCUMENTS CALLED");
    const currentUser = req.user;
    if (currentUser) {
      const { id, role } = currentUser;
      let foundDocuments = null;
      switch (role) {
        case USER_ROLES.ADMIN: {
          foundDocuments = await documentsModel.findAll();
          break;
        }
        case USER_ROLES.MODER: {
          foundDocuments = await documentsModel.findAll();
          break;
        }
        default: {
          foundDocuments = await documentsModel.findAllForUser(id);
          break;
        }
      }
      const documentsView = await Promise.all(
        foundDocuments.map(async (doc) => {
          const { author_id, available_for } = doc;
          const authorData = await usersModel.findById(author_id);
          const { username } = authorData as IUserViewModel;
          const availableForData = await usersModel.getUsernames(available_for);
          return { ...doc, author: username, available_for: availableForData };
        })
      )
      res.status(STATUS.OK_200).json(documentsView);
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
        const { author_id, available_for } = foundDocument;
        const availableForData = await usersModel.getUsernames(available_for);
        const author = await usersModel.findById(author_id);
        const authotUsername = author?.username;
        const documentView = { ...foundDocument, author: authotUsername, available_for: availableForData };
        res.status(STATUS.OK_200).json(documentView as IDocumentViewModel);
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
