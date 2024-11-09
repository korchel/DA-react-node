import { DocumentType } from "../interfaces";

export const USER_ROLES = {
  ADMIN: "ROLE_ADMIN",
  MODER: "ROLE_MODERATOR",
  USER: "ROLE_USER",
};

export const DOCUMENT_TYPES: Record<string, DocumentType> = {
  NOTE: "NOTE",
  REPORT: "REPORT",
  PRESENTATION: "PRESENTATION",
  ARTICLE: "ARTICLE",
};
