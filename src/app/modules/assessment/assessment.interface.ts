export type TAnswer = {
  questionId: string;
  selectedAnswerIndex: number;
};

export type TAssessmentSubmission = {
  answers: TAnswer[];
};