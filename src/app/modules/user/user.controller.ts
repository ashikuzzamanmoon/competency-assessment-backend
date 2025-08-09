import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUserIntoDB(req.body);

  // পাসওয়ার্ড ছাড়া ইউজার ডেটা পাঠানো হচ্ছে
  const userResponse = result.toObject();
  delete userResponse.password;

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: userResponse,
  });
});

export const UserControllers = {
  createUser,
};