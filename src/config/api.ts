// Centralized API configuration for SyncED
// This uses Vite's environment variable system
// In development: reads from .env
// In production: reads from .env.production or deployment platform env vars

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Export both the base URL and a full API endpoint
export const API_ENDPOINTS = {
  base: API_BASE_URL,
  api: `${API_BASE_URL}/api`,
  auth: {
    admin: `${API_BASE_URL}/api/auth/admin`,
    student: `${API_BASE_URL}/api/auth/student`,
    teacher: `${API_BASE_URL}/api/auth/teacher`,
    parent: `${API_BASE_URL}/api/auth/parent`,
  },
  students: `${API_BASE_URL}/api/student-profiles`,
  teachers: `${API_BASE_URL}/api/teacher-profiles`,
  parents: `${API_BASE_URL}/api/parent-profiles`,
  subjects: `${API_BASE_URL}/api/subjects`,
  sections: `${API_BASE_URL}/api/sections`,
  events: `${API_BASE_URL}/api/events`,
  announcements: `${API_BASE_URL}/api/announcements`,
  payments: `${API_BASE_URL}/api/payment-records`,
};

// Default export for backward compatibility
export default `${API_BASE_URL}/api`;

// Log API configuration in development
if (import.meta.env.DEV) {
  console.log('🔗 API Configuration:', {
    baseURL: API_BASE_URL,
    environment: import.meta.env.MODE,
  });
}
