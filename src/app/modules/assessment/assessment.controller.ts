import { Request, Response } from 'express';
import { AssessmentServices } from './assessment.service';
import catchAsync from '../../utils/catchAsync';

const startAssessmentController = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const result = await AssessmentServices.startAssessment(userId);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Assessment started successfully',
    data: result,
  });
});

const submitAssessmentController = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { assessmentId } = req.params;
  const result = await AssessmentServices.submitAssessment(userId, assessmentId, req.body);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Assessment submitted successfully',
    data: result,
  });
});

export const AssessmentControllers = {
  startAssessmentController,
  submitAssessmentController,
};
