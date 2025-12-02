import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Plus,
  Pencil,
  Trash2,
  Users,
  Calendar,
  User,
  Hash,
  Building,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Banner from "@/components/shared/Banner";
import { teacherProfileService } from "@/services/teacherProfileService";
import { sectionService } from "@/services/sectionService";
import { toast } from "sonner";

// Define the Section interface - Updated to match MongoDB model
interface Section {
  _id?: string; // MongoDB ID
  sectionCode: string;
  sectionName: string;
  instructorId: string;
  instructorName: string;
  room: string;
  schedule: string[];
  maxStudents: number;
  enrolledStudents: string[];
  status: "active" | "inactive" | "full";
}

// Teacher interface
interface Teacher {
  id: string; // This will be the employeeId from MongoDB
  name: string;
  teacherId: string; // Also employeeId
  email?: string;
  department?: string;
}

// Component to display enrolled students with dropdown
const StudentsDisplay = ({
  students,
  totalEnrolled,
  maxStudents,
}: {
  students: string[];
  totalEnrolled: number;
  maxStudents: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (students.length === 0) {
    return <div className="text-sm text-gray-500 italic">No students</div>;
  }

  if (students.length === 1) {
    return (
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Users size={14} className="text-gray-500" />
          <div className="text-sm text-gray-900">{students[0]}</div>
        </div>
        <div className="text-xs text-gray-500">1/{maxStudents}</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={14} className="text-gray-500" />
          <div className="text-sm text-gray-900">{students[0]}</div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2 p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      <div className="text-xs text-gray-500">
        +{students.length - 1} more
        <span className="block">
          {totalEnrolled}/{maxStudents}
        </span>
      </div>

      {isExpanded && (
        <div className="mt-2 pt-2 border-t border-gray-200 space-y-2">
          {students.slice(1).map((student, index) => (
            <div
              key={index + 1}
              className="flex items-center gap-2 text-sm pl-6"
            >
              <User size={12} className="text-gray-400" />
              <span className="text-gray-700">{student}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Status badge component
const StatusBadge = ({ status }: { status: Section["status"] }) => {
  const colors = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    full: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Modal component for adding/editing sections
const SectionModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  teachers,
  loading = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Section, "_id">) => Promise<void>;
  initialData?: Section | null;
  teachers: Teacher[];
  loading?: boolean;
}) => {
  const [formData, setFormData] = useState<Omit<Section, "_id">>({
    sectionCode: "",
    sectionName: "",
    instructorId: "",
    instructorName: "",
    room: "",
    schedule: [],
    maxStudents: 30,
    enrolledStudents: [],
    status: "active",
  });

  const [newSchedule, setNewSchedule] = useState("Monday 09:00-10:30");
  const [newStudentId, setNewStudentId] = useState("");

  // Set form data when modal opens
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        sectionCode: "",
        sectionName: "",
        instructorId: "",
        instructorName: "",
        room: "",
        schedule: [],
        maxStudents: 30,
        enrolledStudents: [],
        status: "active",
      });
    }
    setNewSchedule("Monday 09:00-10:30");
    setNewStudentId("");
  }, [initialData, isOpen]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Special handling for instructor selection
    if (name === "instructorId") {
      const selectedTeacher = teachers.find((t) => t.id === value);
      if (selectedTeacher) {
        setFormData((prev) => ({
          ...prev,
          instructorId: selectedTeacher.id,
          instructorName: selectedTeacher.name,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          instructorId: "",
          instructorName: "",
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add schedule
  const handleAddSchedule = () => {
    if (!newSchedule.trim()) {
      alert("Please enter a schedule");
      return;
    }

    if (formData.schedule.includes(newSchedule)) {
      alert("This schedule already exists");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      schedule: [...prev.schedule, newSchedule],
    }));
    setNewSchedule("Monday 09:00-10:30");
  };

  // Remove schedule
  const handleRemoveSchedule = (index: number) => {
    const updatedSchedules = formData.schedule.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, schedule: updatedSchedules }));
  };

  // Add student
  const handleAddStudent = () => {
    if (!newStudentId.trim()) {
      alert("Please enter a student ID");
      return;
    }

    if (formData.enrolledStudents.includes(newStudentId)) {
      alert("Student already enrolled");
      return;
    }

    if (formData.enrolledStudents.length >= formData.maxStudents) {
      alert("Section is full");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      enrolledStudents: [...prev.enrolledStudents, newStudentId],
    }));
    setNewStudentId("");
  };

  // Remove student
  const handleRemoveStudent = (index: number) => {
    const updatedStudents = formData.enrolledStudents.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({ ...prev, enrolledStudents: updatedStudents }));
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.sectionCode ||
      !formData.sectionName ||
      !formData.instructorId
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (formData.schedule.length === 0) {
      alert("Please add at least one schedule");
      return;
    }

    // Update status based on enrollment
    const updatedData = {
      ...formData,
      status:
        formData.enrolledStudents.length >= formData.maxStudents
          ? "full"
          : formData.status,
    };

    await onSubmit(updatedData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          {initialData ? "Edit Section" : "Add New Section"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Code *
              </label>
              <input
                type="text"
                name="sectionCode"
                value={formData.sectionCode}
                onChange={handleChange}
                placeholder="SEC-101"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Name *
              </label>
              <input
                type="text"
                name="sectionName"
                value={formData.sectionName}
                onChange={handleChange}
                placeholder="Morning Class"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instructor *
              </label>
              <select
                name="instructorId"
                value={formData.instructorId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={loading}
              >
                <option value="">Select a teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
              {formData.instructorName && (
                <div className="mt-1 text-xs text-gray-500">
                  Selected: {formData.instructorName}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room *
              </label>
              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleChange}
                placeholder="Room 101"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Students *
              </label>
              <input
                type="number"
                name="maxStudents"
                value={formData.maxStudents}
                onChange={handleChange}
                min="1"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="border-t pt-6">
            <label className="block text-sm font-semibold text-gray-900 mb-4">
              Schedule *
            </label>

            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={newSchedule}
                  onChange={(e) => setNewSchedule(e.target.value)}
                  placeholder="e.g., Monday 09:00-10:30"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                />
              </div>
              <button
                type="button"
                onClick={handleAddSchedule}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                Add
              </button>
            </div>

            {/* Schedule List */}
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {formData.schedule.map((schedule, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                >
                  <span className="text-sm">{schedule}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSchedule(index)}
                    className="p-1 text-gray-400 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {formData.schedule.length === 0 && (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No schedules added
                </div>
              )}
            </div>
          </div>

          {/* Students Section */}
          <div className="border-t pt-6">
            <label className="block text-sm font-semibold text-gray-900 mb-4">
              Enroll Students ({formData.enrolledStudents.length}/
              {formData.maxStudents})
            </label>

            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={newStudentId}
                  onChange={(e) => setNewStudentId(e.target.value)}
                  placeholder="Enter student ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                />
              </div>
              <button
                type="button"
                onClick={handleAddStudent}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                Add
              </button>
            </div>

            {/* Student List */}
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {formData.enrolledStudents.map((studentId, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                >
                  <span className="text-sm">{studentId}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStudent(index)}
                    className="p-1 text-gray-400 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {formData.enrolledStudents.length === 0 && (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No students enrolled
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {initialData ? "Update" : "Add"} Section
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Sections = () => {
  // State for sections data
  const [sections, setSections] = useState<Section[]>([]);
  // State for teachers data
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  // State for search term
  const [searchTerm, setSearchTerm] = useState("");
  // State for status filter
  const [statusFilter, setStatusFilter] = useState("all");
  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for editing section
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  // State for loading teachers
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  // State for loading sections
  const [loadingSections, setLoadingSections] = useState(true);
  // State for form submission loading
  const [submitting, setSubmitting] = useState(false);

  // Fetch sections from API
  const fetchSections = async () => {
    try {
      setLoadingSections(true);
      const data = await sectionService.getSections();
      setSections(data);
    } catch (error) {
      console.error("Error fetching sections:", error);
      alert("Failed to load sections. Please try again.");
    } finally {
      setLoadingSections(false);
    }
  };

  // Fetch teachers from API
  const fetchTeachers = async () => {
    try {
      setLoadingTeachers(true);
      const teacherProfiles = await teacherProfileService.getTeacherProfiles();

      // Transform teacher data
      const transformedTeachers: Teacher[] = teacherProfiles.map(
        (profile: any) => ({
          id: profile.teacherInfo.employeeId,
          name: profile.teacherInfo.name,
          teacherId: profile.teacherInfo.employeeId,
          email: profile.teacherInfo.email,
          department: profile.teacherInfo.department || "General",
        })
      );

      setTeachers(transformedTeachers);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      // Fallback mock teachers if API fails
      const fallbackTeachers: Teacher[] = [
        {
          id: "123445",
          name: "Hanz Christian Angelo G. Magbal",
          teacherId: "123445",
          email: "hanz@gmail.com",
          department: "Teacher",
        },
        {
          id: "T002",
          name: "Prof. Jane Doe",
          teacherId: "T002",
          email: "jane@example.com",
          department: "Mathematics",
        },
        {
          id: "T003",
          name: "Dr. Robert Johnson",
          teacherId: "T003",
          email: "robert@example.com",
          department: "Physics",
        },
      ];
      setTeachers(fallbackTeachers);
    } finally {
      setLoadingTeachers(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchSections();
    fetchTeachers();
  }, []);

  // Filter sections
  const filteredSections = sections.filter((section) => {
    const matchesSearch =
      section.sectionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.sectionCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.instructorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || section.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Add new section
  const handleAddSection = async (sectionData: Omit<Section, "_id">) => {
    try {
      setSubmitting(true);
      const newSection = await sectionService.createSection(sectionData);
      setSections([...sections, newSection]);
      setIsModalOpen(false);
      toast.success("Section added successfully");
    } catch (error) {
      console.error("Error creating section:", error);
      alert("Failed to create section. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Edit section
  const handleEditSection = async (sectionData: Omit<Section, "_id">) => {
    if (!editingSection?._id) return;

    try {
      setSubmitting(true);
      const updatedSection = await sectionService.updateSection(
        editingSection._id,
        sectionData
      );
      const updatedSections = sections.map((section) =>
        section._id === editingSection._id ? updatedSection : section
      );
      setSections(updatedSections);
      setEditingSection(null);
      setIsModalOpen(false);
      toast.success("Section updated successfully");
    } catch (error) {
      console.error("Error updating section:", error);
      alert("Failed to update section. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete section
  const handleDeleteSection = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this section?")) {
      return;
    }

    try {
      await sectionService.deleteSection(id);
      setSections(sections.filter((section) => section._id !== id));
      toast.success("Section deleted successfully");
    } catch (error) {
      console.error("Error deleting section:", error);
      alert("Failed to delete section. Please try again.");
    }
  };

  // Open edit modal
  const openEditModal = (section: Section) => {
    setEditingSection(section);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSection(null);
  };

  // Handle form submission
  const handleSubmit = async (sectionData: Omit<Section, "_id">) => {
    if (editingSection) {
      await handleEditSection(sectionData);
    } else {
      await handleAddSection(sectionData);
    }
  };

  return (
    <div className="space-y-6">
      <Banner
        title="Section Management"
        subtitle="Create and manage class sections with faculty assignment"
      />

      {/* Controls Section */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              All Sections
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {filteredSections.length} sections • {teachers.length} available
              teachers
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            disabled={loadingTeachers}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={16} />
            Add Section
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-4 mb-6 sm:flex-row">
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search sections, instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="sm:w-48">
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="full">Full</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading Indicators */}
        {(loadingTeachers || loadingSections) && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm text-blue-700">
                {loadingTeachers
                  ? "Loading teacher profiles..."
                  : "Loading sections..."}
              </span>
            </div>
          </div>
        )}

        {/* Sections Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          {loadingSections ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-500">Loading sections...</p>
            </div>
          ) : (
            <>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Hash size={14} />
                        Code
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Section Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <User size={14} />
                        Instructor
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Building size={14} />
                        Room
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        Schedule
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Users size={14} />
                        Students
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSections.map((section) => (
                    <tr key={section._id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="font-medium text-gray-900">
                          {section.sectionCode}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">
                          {section.sectionName}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">
                          {section.instructorName}
                          <div className="text-xs text-gray-500">
                            ID: {section.instructorId}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">
                          {section.room}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="space-y-1 max-w-xs">
                          {section.schedule.slice(0, 2).map((sched, index) => (
                            <div
                              key={index}
                              className="text-sm text-gray-700 truncate"
                            >
                              {sched}
                            </div>
                          ))}
                          {section.schedule.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{section.schedule.length - 2} more
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <StudentsDisplay
                          students={section.enrolledStudents}
                          totalEnrolled={section.enrolledStudents.length}
                          maxStudents={section.maxStudents}
                        />
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={section.status} />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(section)}
                            className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() =>
                              section._id && handleDeleteSection(section._id)
                            }
                            className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Empty State */}
              {filteredSections.length === 0 && !loadingSections && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-2">No sections found</div>
                  <p className="text-sm text-gray-500">
                    {searchTerm || statusFilter !== "all"
                      ? "Try adjusting search/filter"
                      : "Add your first section"}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Section Modal */}
      <SectionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={editingSection}
        teachers={teachers}
        loading={submitting}
      />
    </div>
  );
};

export default Sections;
