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
  const response = await apiClient.post<LoginResponse>("/api/auth/login", credentials);
  return response.data;
};

/**
 * POST /api/auth/logout
 * Logout current user
 */
export const logoutUser = async (): Promise<{ success: boolean }> => {
  const response = await apiClient.post<{ success: boolean }>("/api/auth/logout");
  return response.data;
};

/**
 * GET /api/auth/me
 * Get current user info
 */
export const getCurrentUser = async () => {
  const response = await apiClient.get("/api/auth/me");
  return response.data;
};
