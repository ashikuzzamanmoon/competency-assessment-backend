export type TUser = {
  name: string;
  email: string;
  password?: string;
  role: 'student' | 'admin' | 'supervisor';
  isVerified: boolean;
  highestLevelAchieved: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | null;
  currentStep: 0 | 1 | 2 | 3 | 4; // 0 for failed, 4 for completed
};
