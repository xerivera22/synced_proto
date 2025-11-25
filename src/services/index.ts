/* eslint-disable @typescript-eslint/no-unused-vars */

import { getCurrentUser, loginUser, logoutUser } from "./authService";
import {
  fetchAdminData,
  fetchAllData,
  fetchParentData,
  fetchStudentData,
  fetchTeacherData,
} from "./dataService";
import {
  downloadDocument,
  fetchDocumentById,
  fetchStudentDocuments,
  uploadDocument,
} from "./documentService";

export const dataAPI = {
  // GET /api/data - Fetch all application data
  getAll: fetchAllData,

  // GET /api/data - Fetch admin portal data
  getAdminData: fetchAdminData,

  // GET /api/data - Fetch student portal data
  getStudentData: fetchStudentData,

  // GET /api/data - Fetch teacher portal data
  getTeacherData: fetchTeacherData,

  // GET /api/data - Fetch parent portal data
  getParentData: fetchParentData,
};

export const authAPI = {
  // POST /api/auth/login - User login
  login: loginUser,

  // POST /api/auth/logout - User logout
  logout: logoutUser,

  // GET /api/auth/me - Get current user
  getCurrentUser: getCurrentUser,
};

export const documentAPI = {
  // GET /api/documents - Fetch all documents
  getAll: fetchStudentDocuments,

  // GET /api/documents/:documentId - Fetch specific document
  getById: fetchDocumentById,

  // POST /api/documents/upload - Upload document
  upload: uploadDocument,

  // GET /api/documents/:documentId/download - Download document
  download: downloadDocument,
};

export default { dataAPI, authAPI, documentAPI };
