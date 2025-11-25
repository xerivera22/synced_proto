import apiClient from "./apiClient";

export interface Document {
  id: string;
  name: string;
  description: string;
  status: "available" | "pending" | "rejected";
  uploadDate: string | null;
  size: string | null;
  type?: string;
  issueDate?: string;
  url?: string;
}

export interface DocumentsResponse {
  success: boolean;
  requiredDocuments: Document[];
  certificates: Document[];
  recentActivity: Array<{
    action: string;
    document: string;
    date: string;
  }>;
}

/**
 * GET /api/documents
 * Fetch all student documents (required docs, certificates, recent activity)
 */
export const fetchStudentDocuments = async (): Promise<DocumentsResponse> => {
  return apiClient("/api/documents", {
    method: "GET",
  });
};

/**
 * GET /api/documents/:documentId
 * Fetch specific document details
 */
export const fetchDocumentById = async (documentId: string): Promise<Document> => {
  return apiClient(`/api/documents/${documentId}`, {
    method: "GET",
  });
};

/**
 * POST /api/documents/upload
 * Upload a new document
 */
export const uploadDocument = async (
  file: File,
  documentType: string,
): Promise<{ success: boolean; documentId: string }> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("documentType", documentType);

  return apiClient("/api/documents/upload", {
    method: "POST",
    body: formData,
    headers: {}, // Let browser set Content-Type for FormData
  });
};

/**
 * GET /api/documents/:documentId/download
 * Download a document
 */
export const downloadDocument = async (documentId: string): Promise<Blob> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL || "http://localhost:4000"}/api/documents/${documentId}/download`,
  );
  if (!response.ok) {
    throw new Error(`Download failed: ${response.statusText}`);
  }
  return response.blob();
};
