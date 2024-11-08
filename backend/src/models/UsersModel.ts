import {
  ISigninInputModel,
  ISignUpInputModel,
  IUser,
  IUserInputModel,
  IUserViewModel,
} from "../interfaces";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import { USER_ROLES } from "../utils/userRoles";

interface IUserModel {
  findAll(): Promise<IUserViewModel[]>;
  findById(id: number): Promise<IUserViewModel | null>;
  removeById(id: number): Promise<boolean>;
  update(
    id: number,
    data: IUserInputModel,
    isAdmin: boolean
  ): Promise<IUserViewModel>;
  register(data: ISignUpInputModel): Promise<IUserViewModel | null>;
  authenticate(data: ISigninInputModel): Promise<IUser | null>;
}

export class UsersModel implements IUserModel {
  private database: Pool;

  constructor(db: Pool) {
    this.database = db;
  }

  async findAll(): Promise<IUserViewModel[]> {
    const data = await this.database.query("SELECT * FROM users");
    const usersView = data.rows.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      role: user.role,
    }));
    return usersView;
  }

  async findById(id: number): Promise<IUserViewModel | null> {
    const data = await this.database.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    if (data.rows.length === 0) {
      return null;
    }
    const requestedUser = data.rows[0];
    const { username, email, name, lastname, role } = requestedUser;
    return { id: requestedUser.id, username, email, name, lastname, role };
  }

  async removeById(id: number): Promise<boolean> {
    const wasDeleted = await this.database.query(
      "DELETE FROM users WHERE id = $1",
      [id]
    );
    return !!wasDeleted;
  }

  async update(
    id: number,
    data: IUserInputModel,
    isAdmin: boolean
  ): Promise<IUserViewModel> {
    let updatedData;
    if (isAdmin) {
      const { username, email, name, lastname, role } = data;
      updatedData = await this.database.query(
        `UPDATE users
        SET username = $1, email = $2, name = $3, lastname = $4, role = $5
        WHERE id = $6 RETURNING *`,
        [username, email, name, lastname, role, id]
      );
    } else {
      const { username, email, name, lastname } = data;
      updatedData = await this.database.query(
        `UPDATE users
        SET username = $1, email = $2, name = $3, lastname = $4
        WHERE id = $5 RETURNING *`,
        [username, email, name, lastname, id]
      );
    }
    const updatedUser = updatedData.rows[0];
    const { username, email, name, lastname, role } = updatedUser;
    return {
      id: updatedUser.id,
      username,
      email,
      name,
      lastname,
      role,
    };
  }

  async register(data: ISignUpInputModel): Promise<IUserViewModel | null> {
    const { name, lastname, username, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newUserData = await this.database.query(
        `INSERT INTO users
        (name, lastname, username, email, password, role)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [name, lastname, username, email, hashedPassword, USER_ROLES.USER]
      );
      const newUser = newUserData.rows[0];
      return {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        name: newUser.name,
        lastname: newUser.lastname,
        role: newUser.role,
      };
    } catch (error) {
      return null;
    }
  }

  async authenticate(data: ISigninInputModel): Promise<IUser | null> {
    const { username, password } = data;
    const users = await this.database.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );
    if (users.rows.length === 0) {
      return null;
    }
    const foundUser: IUser = users.rows[0];

    const passwordIsValid = await bcrypt.compare(password, foundUser.password);

    if (!passwordIsValid) {
      return null;
    }
    return foundUser;
  }
}
