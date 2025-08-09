import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../../config';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import AppError from '../../../errors/AppError';
import httpStatus from 'http-status';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password as string,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  // Check if JWT secrets and expiration times are defined
  if (
    !config.jwt_access_secret ||
    !config.jwt_access_expires_in ||
    !config.jwt_refresh_secret ||
    !config.jwt_refresh_expires_in
  ) {
    throw new Error('JWT configuration is missing in .env file');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  // Create Access Token with proper typing
  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_secret,
    {
      expiresIn: config.jwt_access_expires_in,
    } as jwt.SignOptions
  );

  // Create Refresh Token with proper typing
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret,
    {
      expiresIn: config.jwt_refresh_expires_in,
    } as jwt.SignOptions
  );

  const userResponse = user.toObject();
  delete userResponse.password;

  return {
    accessToken,
    refreshToken,
    user: userResponse,
  };
};

export const AuthServices = {
  loginUser,
};