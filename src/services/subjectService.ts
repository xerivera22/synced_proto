import axios from "axios";
import API_BASE_URL from "@/config/api";

export interface Subject {
  _id: string;
  subjectName: string;
  subjectCode: string;
  department: string;
  schedules: string[];
  sectionId?: string;
  sectionName?: string;
}

export const subjectService = {
  // Get all subjects
  async getSubjects(): Promise<Subject[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/subjects`);
      return response.data;
    } catch (error) {
      console.error("Error fetching subjects:", error);
      throw error;
    }
  },

  // Get single subject by ID
  async getSubject(id: string): Promise<Subject> {
    try {
      const response = await axios.get(`${API_BASE_URL}/subjects/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching subject ${id}:`, error);
      throw error;
    }
  },

  // Create a new subject
  async createSubject(data: Omit<Subject, "_id">): Promise<Subject> {
    try {
      const response = await axios.post(`${API_BASE_URL}/subjects`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating subject:", error);
      throw error;
    }
  },

  // Update a subject
  async updateSubject(id: string, data: Partial<Subject>): Promise<Subject> {
    try {
      const response = await axios.put(`${API_BASE_URL}/subjects/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating subject:", error);
      throw error;
    }
  },

  // Delete a subject
  async deleteSubject(id: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/subjects/${id}`);
    } catch (error) {
      console.error("Error deleting subject:", error);
      throw error;
    }
  },
};
