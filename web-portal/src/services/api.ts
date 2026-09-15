import axios from 'axios';

export const ACCOUNTING_BASE_URL = import.meta.env.VITE_ACCOUNTING_API || 'http://localhost:8081';
export const MOBILE_BASE_URL = import.meta.env.VITE_MOBILE_API || 'http://localhost:8082';

export const accountingClient = axios.create({
  baseURL: ACCOUNTING_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const mobileClient = axios.create({
  baseURL: MOBILE_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json'
  }
});
