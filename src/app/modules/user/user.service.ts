import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getMeFromDB = async (userId: string) => {
  const result = await User.findById(userId);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getMeFromDB,
};
