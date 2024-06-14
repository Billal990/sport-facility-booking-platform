import { TErrorSource } from "./error.interface";

export type TGenericErrorResponse = {
    statusCode:number;
    message:string;
    errorMessages:TErrorSource
  }