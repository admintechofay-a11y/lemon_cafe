// Centralized API Base URL
// In production (Vercel Services), relative '/api' routes directly to the server service on the same domain.
// In local development, Vite proxies '/api' to 'http://localhost:5000/api' or uses VITE_API_BASE_URL.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
