import express from "express";
import { QuestionControllers } from "./question.controller";
import auth from "../../../middlewares/auth";

const router = express.Router();

// শুধুমাত্র 'admin' এই রুটটি অ্যাক্সেস করতে পারবে।
router.post(
  "/create-question",
  auth("admin"),
  QuestionControllers.createQuestion
);

// লগইন করা যেকোনো ব্যবহারকারী প্রশ্নগুলো দেখতে পারবে।
router.get(
  "/",
  auth("admin", "student", "supervisor"),
  QuestionControllers.getAllQuestions
);

export const QuestionRoutes = router;
