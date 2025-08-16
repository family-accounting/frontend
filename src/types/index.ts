export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'MEMBER' | 'VIEWER';
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'CASH' | 'BANK';
  currency: string;
  balance: number;
  memberId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER' | 'LOAN';
  amount: number;
  currency: string;
  fromAccountId?: string;
  toAccountId?: string;
  memberId: string;
  date: string;
  description: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Loan {
  id: string;
  type: 'GIVEN' | 'RECEIVED';
  amount: number;
  currency: string;
  fromMemberId: string;
  toMemberId: string;
  description: string;
  date: string;
  isRepaid: boolean;
  repaidAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MEMBER' | 'VIEWER';
  totalBalance: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface CreateAccountData {
  name: string;
  type: 'CASH' | 'BANK';
  currency: string;
  memberId?: string;
}

export interface CreateTransactionData {
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER' | 'LOAN';
  amount: number;
  currency: string;
  fromAccountId?: string;
  toAccountId?: string;
  memberId: string;
  date: string;
  description: string;
  category?: string;
}

export interface CreateLoanData {
  type: 'GIVEN' | 'RECEIVED';
  amount: number;
  currency: string;
  fromMemberId: string;
  toMemberId: string;
  description: string;
  date: string;
}

export interface CreateMemberData {
  name: string;
  email: string;
  role: 'ADMIN' | 'MEMBER' | 'VIEWER';
}
