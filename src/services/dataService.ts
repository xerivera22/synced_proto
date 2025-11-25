/* eslint-disable @typescript-eslint/no-unused-vars */
import apiClient from "./apiClient";

export interface DataResponse {
  admin: {
    studentRecords: Record<string, unknown>;
    announcements: Record<string, unknown>;
    events: Record<string, unknown>;
    faculty: Record<string, unknown>;
    payments: Record<string, unknown>;
    settings: Record<string, unknown>;
  };
  student: {
    dashboard: Record<string, unknown>;
    academicProgress: Record<string, unknown>;
    attendance: Record<string, unknown>;
    schedule: Record<string, unknown>;
    profile: Record<string, unknown>;
    settings: Record<string, unknown>;
  };
  teacher: {
    overview: Record<string, unknown>;
    announcements: Record<string, unknown>;
    classes: Record<string, unknown>;
    attendance: Record<string, unknown>;
    profile: Record<string, unknown>;
    settings: Record<string, unknown>;
  };
  parent: {
    dashboard: Record<string, unknown>;
    children: Record<string, unknown>;
    communications: Record<string, unknown>;
    profile: Record<string, unknown>;
  };
}

/**
 * Fetch all application data
 * GET /api/data
 */
export const fetchAllData = async (): Promise<DataResponse> => {
  return apiClient("/api/data", {
    method: "GET",
  });
};

/**
 * Fetch admin data only
 * GET /api/data (filtered from cached dataset)
 */
export const fetchAdminData = async () => {
  const data = await fetchAllData();
  return data.admin;
};

/**
 * Fetch student data only
 * GET /api/data (filtered from cached dataset)
 */
export const fetchStudentData = async () => {
  const data = await fetchAllData();
  return data.student;
};

/**
 * Fetch teacher data only
 * GET /api/data (filtered from cached dataset)
 */
export const fetchTeacherData = async () => {
  const data = await fetchAllData();
  return data.teacher;
};

/**
 * Fetch parent data only
 * GET /api/data (filtered from cached dataset)
 */
export const fetchParentData = async () => {
  const data = await fetchAllData();
  return data.parent;
};
