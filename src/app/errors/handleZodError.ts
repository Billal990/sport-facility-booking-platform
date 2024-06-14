import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interfaces/error.interface";

export  const handleZodError = (error:ZodError)=>{
    const errorMessages:TErrorSource = error.issues.map((issue:ZodIssue)=>{
        return {
            path:issue?.path[issue.path.length-1],
            message:issue.message
        }
    })

    const statusCode = 400;
    return {
      statusCode,
      message:'Validation Error',
      errorMessages
    }
}