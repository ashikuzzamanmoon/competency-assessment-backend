import express from "express";
import { UserControllers } from "./user.controller";
import auth from "../../../middlewares/auth";

const router = express.Router();

router.post("/register", UserControllers.createUser);

// এই রুটটি এখন সুরক্ষিত। শুধুমাত্র লগইন করা student এবং admin এটি অ্যাক্সেস করতে পারবে।
router.get(
  "/me",
  auth("student", "admin"), // auth মিডলওয়্যার ব্যবহার করা হচ্ছে
  UserControllers.getMe
);

export const UserRoutes = router;
