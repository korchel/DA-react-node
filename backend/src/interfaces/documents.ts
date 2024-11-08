export type DocumentType = "NOTE" | "REPORT" | "PRESENTATION" | "ARTICLE";

export interface IDocumentType {
  id: number;
  type: DocumentType;
}

export interface IDocumentInputModel {
  //TODO change in frontend
  title: string;
  number: number;
  type_id: number;
  content: string;
  public_document: boolean;
  available_for: number[];
}

export interface IDocumentViewModel {
  id: number;
  title: string;
  number: number;
  author: string; // IUser
  type: IDocumentType;
  content: string;
  creationDate: string;
  updateDate: string;
  public_document: boolean;
  available_for: number[];
}

export interface IDocument {
  id: number;
  title: string;
  number: number;
  authorId: number; // IUser
  type_id: IDocumentType;
  content: string;
  creationDate?: string;
  updateDate?: string;
  public_document: boolean;
  available_for: number[];
}
