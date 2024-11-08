import jwt from "jsonwebtoken";
import { IUser } from "../interfaces";

export const getJwtTokens = (user: IUser) => {
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || "TEST", {
    expiresIn: "24h",
  });
  return { token };
};
