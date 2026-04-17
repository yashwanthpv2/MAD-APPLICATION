// src/services/api.js
import axios from 'axios';

// Mock base URL — swap for real backend
const BASE_URL = 'http://10.0.2.2:5000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach auth token
api.interceptors.request.use(
  config => {
    // const token = store.getState().auth.token;
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  response => response.data,
  error => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// ── Auth ──────────────────────────────────────────
export const authService = {
  signIn: async (email, password) => {
    // Mock: simulate API delay
    await new Promise(r => setTimeout(r, 800));
    if (!email.includes('@')) throw new Error('Invalid email format');
    if (password.length < 6) throw new Error('Password too short');
    return {
      user: { id: 'u1', name: 'Rahul Sharma', email, initials: email.slice(0, 2).toUpperCase() },
      token: 'mock-jwt-token-xyz',
    };
  },

  signUp: async (name, email, password) => {
    await new Promise(r => setTimeout(r, 1000));
    const existingEmails = ['rahul@example.com', 'admin@daydude.com'];
    if (existingEmails.includes(email)) throw new Error('Email already exists');
    if (password.length < 6) throw new Error('Password must be at least 6 characters');
    return {
      user: { id: 'u2', name, email, initials: name.slice(0, 2).toUpperCase() },
      token: 'mock-jwt-token-new',
    };
  },
};

// ── Documents ─────────────────────────────────────
export const documentService = {
  getAll: async () => {
    await new Promise(r => setTimeout(r, 500));
    return []; // Return from local store in real app
  },

  create: async docData => {
    await new Promise(r => setTimeout(r, 600));
    return { ...docData, id: 'DOC' + Date.now(), createdAt: new Date().toISOString() };
  },

  update: async (id, docData) => {
    await new Promise(r => setTimeout(r, 400));
    return { id, ...docData };
  },

  delete: async id => {
    await new Promise(r => setTimeout(r, 300));
    return { success: true };
  },

  markPaid: async id => {
    await new Promise(r => setTimeout(r, 400));
    return { id, paid: true, lastPaid: new Date().toISOString() };
  },
};

export default api;
