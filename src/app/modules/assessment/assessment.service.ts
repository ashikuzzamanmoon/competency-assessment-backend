import httpStatus from 'http-status';
import AppError from '../../../errors/AppError';
import { Question } from '../question/question.model';
import { User } from '../user/user.model';
import { TAssessmentSubmission } from './assessment.interface';
import { Assessment } from './assessment.model';
import mongoose from 'mongoose';

const startAssessment = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Check if the user has already failed step 1
  if (user.currentStep === 0) {
    throw new AppError(httpStatus.FORBIDDEN, 'You have failed Step 1 and cannot retake the assessment.');
  }

  // Determine which levels to fetch questions from
  let levels: string[] = [];
  if (user.currentStep === 1) levels = ['A1', 'A2'];
  else if (user.currentStep === 2) levels = ['B1', 'B2'];
  else if (user.currentStep === 3) levels = ['C1', 'C2'];
  else {
    throw new AppError(httpStatus.BAD_REQUEST, 'You have already completed all steps!');
  }

  // Fetch 44 random questions from the determined levels
  const questions = await Question.aggregate([
    { $match: { level: { $in: levels } } },
    { $sample: { size: 44 } },
    { $project: { correctAnswerIndex: 0 } }, // Do not send correct answers to the client
  ]);

  if (questions.length < 44) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Not enough questions in the database to start the assessment.');
  }

  // Create a new assessment attempt
  const newAssessment = await Assessment.create({
    userId,
    step: user.currentStep,
    questions: questions.map((q) => q._id),
  });

  return {
    assessmentId: newAssessment._id,
    questions,
  };
};

const submitAssessment = async (
  userId: string,
  assessmentId: string,
  payload: TAssessmentSubmission,
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const assessment = await Assessment.findById(assessmentId).session(session);
    if (!assessment || assessment.userId.toString() !== userId) {
      throw new AppError(httpStatus.NOT_FOUND, 'Assessment not found!');
    }
    if (assessment.status === 'completed' || assessment.status === 'failed') {
        throw new AppError(httpStatus.BAD_REQUEST, 'This assessment has already been submitted.');
    }

    // Calculate score
    let correctAnswers = 0;
    const questionIds = payload.answers.map((a) => a.questionId);
    const correctQuestions = await Question.find({
      _id: { $in: questionIds },
    }).session(session);

    const answerMap = new Map(correctQuestions.map(q => [q._id.toString(), q.correctAnswerIndex]));

    for (const answer of payload.answers) {
        if (answer.selectedAnswerIndex === answerMap.get(answer.questionId.toString())) {
            correctAnswers++;
        }
    }

    const score = (correctAnswers / 44) * 100;

    // Update user's level based on score
    const user = await User.findById(userId).session(session);
    if(!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found during submission.');

    let newLevel = user.highestLevelAchieved;
    let newStep: (typeof user.currentStep) = user.currentStep;
    let assessmentStatus: 'completed' | 'failed' = 'completed';

    if (user.currentStep === 1) {
        if (score < 25) { newStep = 0; assessmentStatus = 'failed'; } // Fail, no retake
        else if (score < 50) newLevel = 'A1';
        else if (score < 75) newLevel = 'A2';
        else { newLevel = 'A2'; newStep = 2; }
    } else if (user.currentStep === 2) {
        if (score < 25) { /* Remain at A2 */ }
        else if (score < 50) newLevel = 'B1';
        else if (score < 75) newLevel = 'B2';
        else { newLevel = 'B2'; newStep = 3; }
    } else if (user.currentStep === 3) {
        if (score < 25) { /* Remain at B2 */ }
        else if (score < 50) newLevel = 'C1';
        else newLevel = 'C2';
        if (score >= 25) newStep = 4; // Mark as completed all steps
    }

    // Update user document
    user.highestLevelAchieved = newLevel;
    user.currentStep = newStep;
    await user.save({ session });

    // Update assessment document
    assessment.answers.push(...payload.answers);
    assessment.score = score;
    assessment.status = assessmentStatus;
    assessment.endTime = new Date();
    await assessment.save({ session });
    
    await session.commitTransaction();

    return {
        score,
        newLevel,
        newStep
    };

  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const AssessmentServices = {
  startAssessment,
  submitAssessment,
};