import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: 0,
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'supervisor'],
    default: 'student',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  highestLevelAchieved: {
    type: String,
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', null],
    default: null,
  },
  currentStep: {
    type: Number,
    enum: [0, 1, 2, 3, 4], // 0 for failed, 4 for completed
    default: 1,
  },
},
{
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const saltRounds = 12;
  this.password = await bcrypt.hash(this.password as string, saltRounds);
  next();
});

export const User = model<TUser>('User', userSchema);
