import { Schema, model } from "mongoose";
import { TQuestion } from "./question.interface";

const questionSchema = new Schema<TQuestion>(
  {
    competency: {
      type: String,
      required: [true, "Competency is required"],
    },
    level: {
      type: String,
      enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
      required: [true, "Level is required"],
    },
    questionText: {
      type: String,
      required: [true, "Question text is required"],
    },
    options: {
      type: [String],
      required: [true, "Options are required"],
      validate: {
        validator: (v: string[]) => v.length === 4,
        message: "There must be exactly 4 options.",
      },
    },
    correctAnswerIndex: {
      type: Number,
      required: [true, "Correct answer index is required"],
      min: 0,
      max: 3,
    },
  },
  {
    timestamps: true,
  }
);

export const Question = model<TQuestion>("Question", questionSchema);
