export type TUser = {
  name: string;
  email: string;
  password?: string; // রেজিস্ট্রেশনের সময় পাসওয়ার্ড থাকবে, কিন্তু ক্লায়েন্টকে পাঠানোর সময় আমরা এটি বাদ দেব।
  role: 'student' | 'admin' | 'supervisor';
  isVerified: boolean;
  highestLevelAchieved: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | null;
  currentStep: 1 | 2 | 3;
};