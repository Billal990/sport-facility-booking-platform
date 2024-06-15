import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser  {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  address: string;
  _id?:Types.ObjectId;
};

export interface UserModel extends Model<TUser>{
  isExistsUser(email:string):Promise<TUser>
}

export type TUserRole = keyof typeof USER_ROLE;

