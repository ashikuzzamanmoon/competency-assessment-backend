import { TQuestion } from "./question.interface";
import { Question } from "./question.model";

const createQuestionIntoDB = async (payload: TQuestion) => {
  const result = await Question.create(payload);
  return result;
};

const getAllQuestionsFromDB = async () => {
  const result = await Question.find();
  return result;
};

export const QuestionServices = {
  createQuestionIntoDB,
  getAllQuestionsFromDB,
};
