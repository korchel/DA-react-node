export interface IFile {
  id: number;
  filename: string;
  filetype: string;
  authorId: number;
  available_for: number[];
  public_file: boolean;
  creation_date: string;
  update_date: string;
  filepath: string;
}

export interface IFileViewModel {
  id: number;
  filename: string;
  filetype: string;
  author: string;
  available_for: number[];
  public_file: boolean;
  creation_date: string;
  update_date: string;
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