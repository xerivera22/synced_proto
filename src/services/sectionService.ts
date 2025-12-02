// services/sectionService.ts
import axios from "axios";
import API_BASE_URL from "@/config/api";

// Define the Section interface
interface Section {
  id?: string;
  sectionName: string;
  sectionCode: string;
  instructorId: string;
  instructorName: string;
  room: string;
  schedule: string[];
  maxStudents: number;
  enrolledStudents: string[];
  status: "active" | "inactive" | "full";
}

export const sectionService = {
  // Get all sections
  async getSections(): Promise<Section[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/sections`);
      return response.data;
    } catch (error) {
      console.error("Error fetching sections:", error);
      throw error;
    }
  },

  // Get single section by ID
  async getSection(id: string): Promise<Section> {
    try {
      const response = await axios.get(`${API_BASE_URL}/sections/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching section ${id}:`, error);
      throw error;
    }
  },

  // Create a new section
  async createSection(data: Omit<Section, "id">): Promise<Section> {
    try {
      const response = await axios.post(`${API_BASE_URL}/sections`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating section:", error);
      throw error;
    }
  },

  // Update a section
  async updateSection(id: string, data: Partial<Section>): Promise<Section> {
    try {
      const response = await axios.put(`${API_BASE_URL}/sections/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating section:", error);
      throw error;
    }
  },

  // Delete a section
  async deleteSection(id: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/sections/${id}`);
    } catch (error) {
      console.error("Error deleting section:", error);
      throw error;
    }
  },
};
