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
        return res.status(401).json({
            success:false,
            statusCode:httpStatus.UNAUTHORIZED,
            message:'Token missing from header !'
        })
    }

    // verify token 
    const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

    //check authorization
    if(!roles.includes(decoded.role)){
       return res.status(401).json({
            success:false,
            statusCode:httpStatus.UNAUTHORIZED,
            message:'You have no access to this route'
        })
    }
    req.user = decoded as JwtPayload;
    next()
   })
}