import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import httpStatus from "http-status";
import { catchAsync } from "../utils/catchAsync";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";


export const auth = (...roles:TUserRole[])=>{
   return catchAsync(async(req, res, next)=>{

    const token = req.headers.authorization?.split(' ')[1];
    //check if token provided from client side
    if(!token){
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
    }

    // verify token 
    var decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

    //check authorization
    if(!roles.includes(decoded.role)){
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
    }
    req.user = decoded as JwtPayload
    next()
   })
}