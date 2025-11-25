import apiClient from "./apiClient";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    role: "student" | "parent" | "admin" | "teacher";
    token?: string;
  };
}

/**
 * POST /api/auth/login
 * Authenticate user with email and password
 */
export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  return apiClient("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

/**
 * POST /api/auth/logout
 * Logout current user
 */
export const logoutUser = async (): Promise<{ success: boolean }> => {
  return apiClient("/api/auth/logout", {
    method: "POST",
  });
};

/**
 * GET /api/auth/me
 * Get current user info
 */
export const getCurrentUser = async () => {
  return apiClient("/api/auth/me", {
    method: "GET",
  });
};
