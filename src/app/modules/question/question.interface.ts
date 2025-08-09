export type TQuestion = {
  competency: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
};
