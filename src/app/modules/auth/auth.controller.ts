import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { catchAsync } from '../../utils/catchAsync';
import { User } from '../user/user.model';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import config from '../../config';

const login = catchAsync(async (req, res) => {
  const {email, password} = req.body;
  const existingUser = await User.isExistsUser(email);

  // check if user exists 
  if(!existingUser){
    throw new AppError(httpStatus.NOT_FOUND, `User not found with your email '${email}'`)
  }

  //check if password match
  const isMatchedPassword = await bcrypt.compare(password, existingUser.password);
  if(!isMatchedPassword){
    throw new AppError(httpStatus.BAD_REQUEST, 'Your password does not match !')
  }

  //Login success and response to the user
  const result = await User.findOne({
    email:existingUser.email,
    role:existingUser.role
  })

  //generate jwt access token
  const jwtTokenPayload = {
    email:existingUser.email,
    role:existingUser.role
  }
 const token = jwt.sign(jwtTokenPayload, config.jwt_access_secret as string, {expiresIn:config.jwt_access_expire_time});

  res.json({
    success:true,
    statusCode:httpStatus.OK,
    message:'User logged in successfully',
    token:token,
    data:result
  })

});

export const authContollers = {
  login,
};
