// src/app/routes/index.ts (Corrected)

import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { QuestionRoutes } from '../modules/question/question.route';
import { AssessmentRoutes } from '../modules/assessment/assessment.route';

const router = express.Router();

// --- FINAL DEBUGGING LOG ---
// এই লগটি আমাদের প্রতিটি API রিকোয়েস্টের জন্য টার্মিনালে একটি মেসেজ দেখাবে।
router.use((req, res, next) => {
  console.log(`--> Request Received: ${req.method} ${req.originalUrl}`);
  next();
});
// --- END FINAL DEBUGGING LOG ---


const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/questions',
    route: QuestionRoutes,
  },
  {
    path: '/assessments',
    route: AssessmentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;