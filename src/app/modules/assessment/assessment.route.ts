import express from 'express';
import auth from '../../../middlewares/auth';
import { AssessmentControllers } from './assessment.controller';

const router = express.Router();

router.post(
  '/start',
  auth('student'),
  AssessmentControllers.startAssessmentController,
);

router.post(
  '/submit/:assessmentId',
  auth('student'),
  AssessmentControllers.submitAssessmentController,
);

export const AssessmentRoutes = router;
