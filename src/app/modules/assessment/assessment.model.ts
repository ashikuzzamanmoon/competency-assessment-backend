import { Schema, model } from 'mongoose';

const assessmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    step: {
      type: Number,
      required: true,
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Question',
      },
    ],
    answers: [
      {
        questionId: {
          type: Schema.Types.ObjectId,
          ref: 'Question',
        },
        selectedAnswerIndex: Number,
      },
    ],
    score: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['in-progress', 'completed', 'failed'],
      default: 'in-progress',
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export const Assessment = model('Assessment', assessmentSchema);