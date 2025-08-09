import { Request, Response } from "express";
import { QuestionServices } from "./question.service";
import catchAsync from "../../utils/catchAsync";

const createQuestion = catchAsync(async (req: Request, res: Response) => {
  const result = await QuestionServices.createQuestionIntoDB(req.body);

  res.status(201).json({
    success: true,
    statusCode: 201,
    message: "Question created successfully",
    data: result,
  });
});

const getAllQuestions = catchAsync(async (req: Request, res: Response) => {
  const result = await QuestionServices.getAllQuestionsFromDB();

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Questions retrieved successfully",
    data: result,
  });
});

export const QuestionControllers = {
  createQuestion,
  getAllQuestions,
};
