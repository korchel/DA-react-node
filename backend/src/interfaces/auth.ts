export interface ISignUpInputModel {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface ISigninInputModel {
  username: string;
  password: string;
}
