import axios from 'axios';

const API = axios.create({ baseURL: 'http://192.168.1.15:5000/api' });

export const login = (formData) => API.post('/users/login', formData);
export const register = (formData) => API.post('/users/register', formData);
export const getCategories = () => API.get('/categories');
export const getTransactions = (userId) => API.get(`/transactions/${userId}`);
export const addTransaction = (data) => API.post('/transactions', data);
export const deleteTransaction = (transactionId) => API.delete(`/transactions/${transactionId}`);
export const addCategory = (data) => API.post('/categories', data);
export const getGoals = (userId) => API.get(`/goals/${userId}`);
export const addGoal = (data) => API.post('/goals', data);
export const updateGoal = (goalId, data) => API.put(`/goals/${goalId}`, data);
export const getBalance = (userId) => API.get(`/balances/${userId}`);
export const createBalance = (data) => API.post('/balances', data);
export const updateBalance = (userId, totalBalance) => API.put(`/balances/${userId}`, { totalBalance });

