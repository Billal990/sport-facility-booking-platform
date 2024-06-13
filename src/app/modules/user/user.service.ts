import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import config from '../../config';

const createUserIntoDB = async (payload: TUser) => {
  //check if user already exists
  if (await User.isExistsUser(payload.email)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This user already exists!');
  }

  //hash the password before storing into DB
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.salt_round),
  );

  const result = await User.create({ ...payload, password: hashedPassword });
  return result;
};

export const userServices = {
  createUserIntoDB,
};
