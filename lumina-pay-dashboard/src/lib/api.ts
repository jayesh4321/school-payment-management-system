import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://api.schoolpay.com' 
    : 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const transactionAPI = {
  getAllTransactions: (params?: {
    page?: number;
    limit?: number;
    status?: string;
    school_id?: string;
    date_from?: string;
    date_to?: string;
    search?: string;
  }) => api.get('/payment/transactions', { params }),
  
  getTransactionsBySchool: (schoolId: string, params?: any) => 
    api.get(`/payment/transactions/school/${schoolId}`, { params }),
  
  checkTransactionStatus: (customOrderId: string) => 
    api.get(`/payment/transaction-status/${customOrderId}`),
  
  getTransactionStats: () => api.get('/payment/transactions/stats'),
  
  getSchools: () => api.get('/schools'),
};

export default api;