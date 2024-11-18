export type DocumentType = "NOTE" | "REPORT" | "PRESENTATION" | "ARTICLE";

export interface IDocumentType {
  id: number;
  type: DocumentType;
}

export interface IDocumentInputModel {
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
  author: string;
  type: IDocumentType;
  content: string;
  creation_date: string;
  update_date: string;
  public_document: boolean;
  available_for: { id: number; username: string }[];
}

export interface IDocument {
  id: number;
  title: string;
  number: number;
  author_id: number;
  type: IDocumentType;
  content: string;
  creation_date: string;
  update_date: string;
  public_document: boolean;
  available_for: number[];
}
