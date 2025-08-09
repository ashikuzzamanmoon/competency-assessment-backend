import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import { User } from "../app/modules/user/user.model";
import catchAsync from "../app/utils/catchAsync";

// একটি কাস্টম রিকোয়েস্ট টাইপ তৈরি করা হচ্ছে, যাতে আমরা user অবজেক্ট যোগ করতে পারি।
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

const auth = (...requiredRoles: ("student" | "admin" | "supervisor")[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // টোকেন পাঠানো হয়েছে কি না তা চেক করা হচ্ছে
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    // টোকেনটি ভ্যালিড কি না তা যাচাই করা হচ্ছে
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, userId } = decoded;

    // ব্যবহারকারী ডাটাবেসে আছে কি না তা চেক করা হচ্ছে
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }

    // ব্যবহারকারীর ভূমিকা (role) অনুযায়ী অ্যাক্সেস দেওয়া হচ্ছে
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized to access this route!"
      );
    }

    req.user = decoded; // রিকোয়েস্টে user তথ্য যোগ করা হচ্ছে
    next();
  });
};

export default auth;
