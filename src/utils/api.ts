/**
 * SyncED API Utility
 * Centralized API client with error handling and request helpers
 * Uses Axios for better error handling and interceptors
 */

import { API_ENDPOINTS } from "@/config/api";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_ENDPOINTS.api,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable if using cookies/sessions
});

// =============================================================================
// REQUEST INTERCEPTOR
// =============================================================================
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`🔵 ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// =============================================================================
// RESPONSE INTERCEPTOR
// =============================================================================
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log(`🟢 ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error: AxiosError) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;

      switch (status) {
        case 401:
          console.error("❌ Unauthorized - Please login again");
          // Clear auth token
          localStorage.removeItem("authToken");
          // Redirect to login
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          break;
        case 403:
          console.error("❌ Forbidden - You don't have permission");
          break;
        case 404:
          console.error("❌ Not Found - Resource doesn't exist");
          break;
        case 500:
          console.error("❌ Server Error - Please try again later");
          break;
        default:
          console.error(`❌ Error ${status}:`, error.response.data);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error("❌ Network Error - Please check your connection");
    } else {
      // Something else happened
      console.error("❌ Error:", error.message);
    }

    return Promise.reject(error);
  }
);

// =============================================================================
// API HELPER FUNCTIONS
// =============================================================================

/**
 * Generic GET request
 */
export const get = async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.get<T>(url, config);
  return response.data;
};

/**
 * Generic POST request
 */
export const post = async <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
};

/**
 * Generic PUT request
 */
export const put = async <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
};

/**
 * Generic PATCH request
 */
export const patch = async <T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiClient.patch<T>(url, data, config);
  return response.data;
};

/**
 * Generic DELETE request
 */
export const del = async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.delete<T>(url, config);
  return response.data;
};

// =============================================================================
// AUTHENTICATION HELPERS
// =============================================================================

/**
 * Set authentication token
 */
export const setAuthToken = (token: string) => {
  localStorage.setItem("authToken", token);
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

/**
 * Clear authentication token
 */
export const clearAuthToken = () => {
  localStorage.removeItem("authToken");
  delete apiClient.defaults.headers.common["Authorization"];
};

/**
 * Get current auth token
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

// =============================================================================
// EXAMPLE USAGE IN SERVICES
// =============================================================================

// Example: Student Service
export const studentService = {
  // Get all students
  getAll: () => get("/student-profiles"),

  // Get student by ID
  getById: (id: string) => get(`/student-profiles/${id}`),

  // Create new student
  create: (data: Record<string, unknown>) => post("/student-profiles", data),

  // Update student
  update: (id: string, data: Record<string, unknown>) => put(`/student-profiles/${id}`, data),

  // Delete student
  delete: (id: string) => del(`/student-profiles/${id}`),
};

// Example: Authentication Service
export const authService = {
  // Student login
  studentLogin: (email: string, password: string) =>
    post("/auth/student/login", { email, password }),

  // Teacher login
  teacherLogin: (email: string, password: string) =>
    post("/auth/teacher/login", { email, password }),

  // Parent login
  parentLogin: (email: string, password: string) => post("/auth/parent/login", { email, password }),

  // Admin login
  adminLogin: (email: string, password: string) => post("/auth/admin/login", { email, password }),

  // Logout
  logout: () => {
    clearAuthToken();
  },
};

// Export axios instance for advanced usage
export default apiClient;

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface ApiError {
  message: string;
  status?: number;
  data?: unknown;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
