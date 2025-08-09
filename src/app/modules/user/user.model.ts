import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser } from './user.interface';

// Mongoose Schema তৈরি করা হচ্ছে
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
    select: 0, // ডিফল্টভাবে ডাটাবেস থেকে ইউজার খোঁজার সময় পাসওয়ার্ড আসবে না।
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
    enum: [1, 2, 3],
    default: 1,
  },
},
{
  timestamps: true, // createdAt এবং updatedAt ফিল্ড স্বয়ংক্রিয়ভাবে যোগ হবে।
});


// Mongoose pre-save middleware/hook
// ডাটাবেসে সেভ করার আগে পাসওয়ার্ড হ্যাশ করার জন্য এই হুক ব্যবহার করা হচ্ছে।
userSchema.pre('save', async function (next) {
  // শুধুমাত্র যদি পাসওয়ার্ড পরিবর্তন করা হয়, তবেই এটি কাজ করবে।
  if (!this.isModified('password')) return next();

  const saltRounds = 12; // .env ফাইল থেকে নেওয়া ভালো অনুশীলন।
  this.password = await bcrypt.hash(this.password as string, saltRounds);
  next();
});

// Mongoose মডেল তৈরি করা হচ্ছে
export const User = model<TUser>('User', userSchema);
