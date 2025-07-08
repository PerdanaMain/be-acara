import jwt from "jsonwebtoken";
import { IUser } from "../models/user.model";
import { Types } from "mongoose";
import { SECRET } from "./env";
export interface IUserToken
  extends Omit<
    IUser,
    | "password"
    | "activationCode"
    | "isActivationCode"
    | "isActive"
    | "email"
    | "fullName"
    | "profilePicture"
    | "username"
  > {
  id?: Types.ObjectId;
} // Define the IUserToken interface based on your user, Omit mean remove some properties

export const generateToken = (user: IUserToken): string => {
  const token = jwt.sign(user, SECRET, {
    expiresIn: "1h",
  });

  return token;
};

export const getUserData = (token: string) => {
  const user = jwt.verify(token, SECRET) as IUserToken;
  return user;
};
