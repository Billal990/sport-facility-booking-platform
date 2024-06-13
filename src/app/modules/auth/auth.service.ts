import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser, TPassword } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';

const loginUserIntoDB = async (payload: TLoginUser) => {
  // check if user exists
  const user = await User.isExistsUser(payload.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // // check if user already deleted
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // // check if user already blocked
  if (user.status == 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
  }

  // //check if password correct
  console.log(user);
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password is not correct !');
  }

  //create json webtoken
  const jsonWebTokenPayload = {
    userId: user.id,
    role: user.role,
  };
  console.log('User data======> ', jsonWebTokenPayload);
  const accessToken = jwt.sign(
    jsonWebTokenPayload,
    config.jwt_access_secret as string,
    { expiresIn: '1h' },
  );

  return {
    accessToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

const changePasswordIntoDB = async (payload: TPassword, user: JwtPayload) => {
  const userData = await User.findOne({
    id: user.userId,
    role: user.role,
  }).select('+password');

  // check if oldPassword is verified
  if (
    !(await User.isPasswordMatched(
      payload.oldPassword,
      userData?.password as string,
    ))
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Your old password is not correct !',
    );
  }

  const hash = bcrypt.hashSync(payload.newPassword, Number(config.salt_round));

  await User.findOneAndUpdate(
    { id: user?.userId, role: user.role },
    { password: hash, passwordChangedAt:new Date(), needsPasswordChange: false },
    { new: true },
  );
  return null;
};

export const authServices = {
  loginUserIntoDB,
  changePasswordIntoDB,
};
