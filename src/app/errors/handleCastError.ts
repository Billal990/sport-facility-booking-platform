import mongoose from "mongoose";
import { TErrorSource } from "../interfaces/error.interface";
import { TGenericErrorResponse } from "../interfaces/genericeErrorResponse.inerface";

export const handleCastError = (error:mongoose.Error.CastError):TGenericErrorResponse=>{
    const errorMessages:TErrorSource = [
        {
            path:error.path,
            message:error.message
        }
    ]

    const statusCode = 400;

    return {
        statusCode,
        message:'Invalid ID',
        errorMessages
    }
}