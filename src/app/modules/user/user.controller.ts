import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUserIntoDB(req.body);

  // পাসওয়ার্ড ছাড়া ইউজার ডেটা পাঠানো হচ্ছে
  const userResponse = result.toObject();
  delete userResponse.password;

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: userResponse,
  });
});

<<<<<<< HEAD
const getMe = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const result = await UserServices.getMeFromDB(userId);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User profile retrieved successfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getMe,
};
=======
export const UserControllers = {
  createUser,
};
>>>>>>> 62e5a74e95768bbf1ab9f69ad361c32de48bb0d5
