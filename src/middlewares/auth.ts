// src/middlewares/auth.ts (With Debugging)

import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import { User } from '../app/modules/user/user.model';
import catchAsync from '../app/utils/catchAsync';
import AppError from '../errors/AppError';
import config from '../config';

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

const auth = (...requiredRoles: ('student' | 'admin' | 'supervisor')[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized! (No token)');
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId } = decoded;

    // --- DEBUGGING LOGS START ---
    console.log('--- Auth Middleware Debug ---');
    console.log('Decoded Role from Token:', role);
    console.log('Required Roles for Route:', requiredRoles);
    // --- DEBUGGING LOGS END ---

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized! (Role mismatch)',
      );
    }

    req.user = decoded;
    next();
  });
};

export default auth;