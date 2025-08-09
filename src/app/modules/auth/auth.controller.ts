import { Request, Response } from 'express';
import { AuthServices } from './auth.service';
import catchAsync from '../../utils/catchAsync';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken, user } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    data: {
      user,
      accessToken,
    },
  });
});

export const AuthControllers = {
  loginUser,
};