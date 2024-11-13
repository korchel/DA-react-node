export type RoleName = "ROLE_ADMIN" | "ROLE_USER" | "ROLE_MODERATOR";

export interface IUser {
  id: number;
  username: string;
  email: string;
  name: string;
  lastname: string;
  role: RoleName;
  password: string;
  creation_date: string;
  update_date: string;
}

export interface IUserViewModel {
  id: number;
  username: string;
  email: string;
  name: string;
  lastname: string;
  role: RoleName;
  creation_date?: string;
}

export interface IUserInputModel {
  username: string;
  email: string;
  name: string;
  lastname: string;
  role: RoleName;
}
