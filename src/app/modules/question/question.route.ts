// src/app/modules/question/question.route.ts (With Debugging)

import express from "express";
import { QuestionControllers } from "./question.controller";
import auth from "../../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-question",
  auth("admin"),
  QuestionControllers.createQuestion
);

router.get(
  "/",
  auth("admin", "student", "supervisor"),
  QuestionControllers.getAllQuestions
);

export const QuestionRoutes = router;
