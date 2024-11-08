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
      if (role === USER_ROLES.ADMIN) {
        const data = await documentsModel.findAllForAdmin();
        res.status(STATUS.OK_200).json(data);
      } else {
        const data = await documentsModel.findAll(id);
        res.status(STATUS.OK_200).json(data);
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
      const requestedDocument = await documentsModel.findById(
        id,
        currentUser.id
      );
      if (requestedDocument) {
        res.status(STATUS.OK_200).json(requestedDocument);
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
      const wasDeleted = await documentsModel.removeById(currentUser.id, id);
      if (wasDeleted) {
        res
          .status(STATUS.OK_200)
          .json({ message: "Document has been removed" });
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

export const updateDocument = async (
  req: RequestWithParamsAndBody<IdParam, IDocumentInputModel>,
  res: Response
) => {
  console.log("UPDATE DOCUMENT CALLED");
  try {
    const id = +req.params.id;
    const data = req.body;
    const userId = req.user?.id;
    if (userId) {
      const updatedDocument = await documentsModel.update(userId, id, data);
      if (updatedDocument) {
        res.status(STATUS.OK_200).json(updatedDocument);
      } else {
        res
          .status(STATUS.FORBIDDEN_403)
          .json({ message: "You are not the author" });
      }
    }
  } catch (error) {
    res.sendStatus(STATUS.SERVER_ERROR_500);
  }
};
