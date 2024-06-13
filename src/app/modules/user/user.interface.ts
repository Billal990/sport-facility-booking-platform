import { Model } from "mongoose";

export interface TUser  {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  address: string;
};

export interface UserModel extends Model<TUser>{
  isExistsUser(email:string):Promise<TUser>
}


