import { ActionMeta } from 'react-select';

export type Entity = 'files' | 'documents' | 'users';

export type onSelect = (
  newValue: unknown,
  actionmeta: ActionMeta<unknown>,
) => void;

export interface ISelectOption {
  label: string;
  value: string | number;
}

export interface ITableColumn {
  label: string;
  accessor: string;
  sortable: boolean;
}

export interface ITableData {
  id: number;
  data: Record<string, string | number | undefined | Date>;
}

// USERS

export type RoleName = 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_MODERATOR';

export interface IUser {
  id: number;
  username: string;
  email: string;
  name: string;
  lastname: string;
  role: RoleName;
  creation_date: string;
}

// DOCUMENTS

export type DocumentType = 'NOTE' | 'REPORT' | 'PRESENTATION' | 'ARTICLE';

export interface IDocument {
  id: number;
  title: string;
  number: number;
  author: string;
  type: DocumentType;
  content: string;
  creation_date: string;
  update_date: string;
  public_document: boolean;
  available_for: { id: number; username: string }[];
}

// FILES

export interface IFile {
  id: number;
  filename: string;
  filetype: string;
  author: string;
  available_for: number[];
  public_file: boolean;
  creation_date: string;
  update_date: string;
}
