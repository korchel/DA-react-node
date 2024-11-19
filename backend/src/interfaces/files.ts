export interface IFile {
  id: number;
  filename: string;
  filetype: string;
  mimetype: string;
  author_id: number;
  available_for: number[];
  public_file: boolean;
  creation_date: string;
  update_date: string;
  filepath: string;
  thumbnail_path: string;
}

export interface IFileViewModel {
  id: number;
  filetype: string;
  author: string;
  available_for: { id: number; username: string }[];
  public_file: boolean;
  creation_date: string;
  update_date: string;
  filename: string;
}

export interface IFileFormdataModel {
  params: string;
  // params: {
  //   available_for: number[];
  //   public_file: boolean; //TODO change in frontend
  // };
}

export interface IFileInputModel {
  available_for: number[];
  public_file: boolean; //TODO change in frontend
}
