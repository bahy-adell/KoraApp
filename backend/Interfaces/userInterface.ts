import { Document } from "mongoose";
type Role = 'manager' | 'admin' | 'user'
export interface Users extends Document {
  email: string;
  password: string;
  name: string;
  phoneNum:string;
  image: string;
  role: Role;
  active: boolean;
  passwordChangedAt: Date | number;
  resetCode: string | undefined;
  resetCodeExpireTime: Date | number | undefined;
  resetCodeVerify: boolean | undefined;
}