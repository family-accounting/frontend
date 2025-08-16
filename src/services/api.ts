import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { useAuthStore } from 'src/stores/auth-store';
import type {
  ApiResponse,
  LoginCredentials,
  User,
  Account,
  Transaction,
  Loan,
  Member,
  CreateAccountData,
  CreateTransactionData,
  CreateLoanData,
  CreateMemberData,
} from 'src/types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NODE_ENV === 'production' 
        ? 'http://localhost:3000/api' 
        : 'http://localhost:3000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add JWT token
    this.api.interceptors.request.use(
      (config) => {
        const authStore = useAuthStore();
        if (authStore.token) {
          config.headers.Authorization = `Bearer ${authStore.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(new Error(error?.message || 'Request error'));
      }
    );

    // Response interceptor to handle 401 errors
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === 401) {
          const authStore = useAuthStore();
          authStore.logout();
          window.location.href = '/auth/login';
        }
        return Promise.reject(new Error(error?.message || 'Response error'));
      }
    );
  }

  // Auth endpoints
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ token: string; user: User }>> {
    const response = await this.api.post('/auth/login', credentials);
    return response.data;
  }

  async getProfile(): Promise<ApiResponse<User>> {
    const response = await this.api.get('/auth/profile');
    return response.data;
  }

  // Account endpoints
  async getAccounts(): Promise<ApiResponse<Account[]>> {
    const response = await this.api.get('/accounts');
    return response.data;
  }

  async createAccount(data: CreateAccountData): Promise<ApiResponse<Account>> {
    const response = await this.api.post('/accounts', data);
    return response.data;
  }

  async updateAccount(id: string, data: Partial<CreateAccountData>): Promise<ApiResponse<Account>> {
    const response = await this.api.put(`/accounts/${id}`, data);
    return response.data;
  }

  async deleteAccount(id: string): Promise<ApiResponse<void>> {
    const response = await this.api.delete(`/accounts/${id}`);
    return response.data;
  }

  // Transaction endpoints
  async getTransactions(params?: {
    type?: string;
    memberId?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<{ transactions: Transaction[]; total: number }>> {
    const response = await this.api.get('/transactions', { params });
    return response.data;
  }

  async createTransaction(data: CreateTransactionData): Promise<ApiResponse<Transaction>> {
    const response = await this.api.post('/transactions', data);
    return response.data;
  }

  async updateTransaction(id: string, data: Partial<CreateTransactionData>): Promise<ApiResponse<Transaction>> {
    const response = await this.api.put(`/transactions/${id}`, data);
    return response.data;
  }

  async deleteTransaction(id: string): Promise<ApiResponse<void>> {
    const response = await this.api.delete(`/transactions/${id}`);
    return response.data;
  }

  // Loan endpoints
  async getLoans(): Promise<ApiResponse<Loan[]>> {
    const response = await this.api.get('/loans');
    return response.data;
  }

  async createLoan(data: CreateLoanData): Promise<ApiResponse<Loan>> {
    const response = await this.api.post('/loans', data);
    return response.data;
  }

  async updateLoan(id: string, data: Partial<CreateLoanData>): Promise<ApiResponse<Loan>> {
    const response = await this.api.put(`/loans/${id}`, data);
    return response.data;
  }

  async deleteLoan(id: string): Promise<ApiResponse<void>> {
    const response = await this.api.delete(`/loans/${id}`);
    return response.data;
  }

  async markLoanRepaid(id: string, repaidAmount: number): Promise<ApiResponse<Loan>> {
    const response = await this.api.patch(`/loans/${id}/repay`, { repaidAmount });
    return response.data;
  }

  // Member endpoints
  async getMembers(): Promise<ApiResponse<Member[]>> {
    const response = await this.api.get('/members');
    return response.data;
  }

  async createMember(data: CreateMemberData): Promise<ApiResponse<Member>> {
    const response = await this.api.post('/members', data);
    return response.data;
  }

  async updateMember(id: string, data: Partial<CreateMemberData>): Promise<ApiResponse<Member>> {
    const response = await this.api.put(`/members/${id}`, data);
    return response.data;
  }

  async deleteMember(id: string): Promise<ApiResponse<void>> {
    const response = await this.api.delete(`/members/${id}`);
    return response.data;
  }

  // Dashboard endpoints
  async getDashboardStats(): Promise<ApiResponse<{
    totalAssets: number;
    totalLiabilities: number;
    netWorth: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    memberBalances: { memberId: string; balance: number }[];
  }>> {
    const response = await this.api.get('/dashboard/stats');
    return response.data;
  }

  async getMonthlyChartData(year: number, month: number): Promise<ApiResponse<{
    income: number;
    expenses: number;
    transfers: number;
    loans: number;
  }>> {
    const response = await this.api.get(`/dashboard/monthly-chart/${year}/${month}`);
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;
