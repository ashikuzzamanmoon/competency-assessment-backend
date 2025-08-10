// src/app/modules/question/question.route.ts (With Debugging)

import express from 'express';
import { QuestionControllers } from './question.controller';
import auth from '../../../middlewares/auth';

const router = express.Router();

// --- DEBUGGING LOG FOR THIS ROUTE ---
router.use('/create-question', (req, res, next) => {
  console.log('--> Request reached /create-question route definition.');
  next();
});
// --- END DEBUGGING LOG ---

// শুধুমাত্র 'admin' এই রুটটি অ্যাক্সেস করতে পারবে।
router.post(
  '/create-question',
  auth('admin'),
  QuestionControllers.createQuestion,
);

// লগইন করা যেকোনো ব্যবহারকারী প্রশ্নগুলো দেখতে পারবে।
router.get('/', auth('admin', 'student', 'supervisor'), QuestionControllers.getAllQuestions);

export const QuestionRoutes = router;