import { Users } from "./userInterface";
import { Request } from "express";

export interface newRequest extends Request { 
    user?: Users;
    file?: any;
}