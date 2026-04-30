export interface IFinancialGoal {
  financialGoalId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  remainingAmount: number;
  progressPercent: number;
  deadline: string | null;
  description: string | null;
  icon: string | null;
  isCompleted: boolean;
  createdAt: string;
}

export interface ICreateGoalRequest {
  name: string;
  targetAmount: number;
  deadline: string | null;
  description: string | null;
  icon: string | null;
}

export interface IUpdateGoalRequest {
  name: string;
  targetAmount: number;
  deadline: string | null;
  description: string | null;
  icon: string | null;
}

export interface IGoalDepositRequest {
  amount: number;
}

export interface IGoalWithdrawRequest {
  amount: number;
}
