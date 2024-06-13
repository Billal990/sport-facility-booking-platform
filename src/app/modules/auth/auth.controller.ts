import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { authServices } from './auth.service';
import { Request, Response } from 'express';

const loginUser = catchAsync(async (req, res) => {
  const loginUserInfo = req.body;
  const result = await authServices.loginUserIntoDB(loginUserInfo);
  sendResponse(res, {
    message: 'Log in success!',
    success: true,
    data: result,
    statusCode: httpStatus.OK,
  });
});

const changePassword = catchAsync(async(req, res)=>{
const password = req.body;
const result = await authServices.changePasswordIntoDB(password, req.user);
sendResponse(res, {
    message:'Password changed successfully!',
    success:true,
    data:result,
    statusCode:httpStatus.OK,
})
})



export const authContollers = {
  loginUser,
  changePassword,
};
