import Banner from "@/components/shared/Banner";
import { sectionService } from "@/services/sectionService";
import { subjectService } from "@/services/subjectService";
import {
  BookOpen,
  Building,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Filter,
  Hash,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAdminPortalDate } from "../utils/date";

// Define the Subject interface with schedule as string array
interface Subject {
  _id: string;
  id?: string; // Optional for backwards compatibility
  subjectName: string;
  schedules: string[];
  department: string;
  subjectCode: string;
  sectionId?: string; // Add section field
}

// Utility function to format schedule for display
const formatScheduleDisplay = (schedule: string) => {
  const [date, time] = schedule.split(" ");
  const dateObj = new Date(`${date}T${time}:00`);
  return (
    dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }) +
    " " +
    time
  );
};

// Component to display schedules with dropdown when multiple exist
const ScheduleDisplay = ({ schedules }: { schedules: string[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // If no schedules, show empty state
  if (schedules.length === 0) {
    return <div className="text-sm text-gray-500 italic">No schedule set</div>;
  }

  // If only one schedule, display it directly
  if (schedules.length === 1) {
    return (
      <div className="flex items-center gap-2">
        <Clock size={14} className="text-gray-500 flex-shrink-0" />
        <div className="text-sm text-gray-900">{formatScheduleDisplay(schedules[0])}</div>
      </div>
    );
  }

  // For multiple schedules, show first one with dropdown toggle
  return (
    <div className="space-y-2">
      {/* First schedule always visible */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-gray-500 flex-shrink-0" />
          <div className="text-sm text-gray-900">{formatScheduleDisplay(schedules[0])}</div>
        </div>
        {/* Dropdown toggle button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2 p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
          title={isExpanded ? "Show less" : `Show all ${schedules.length} schedules`}
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Schedule count badge */}
      <div className="text-xs text-gray-500">
        +{schedules.length - 1} more schedule
        {schedules.length - 1 !== 1 ? "s" : ""}
      </div>

      {/* Dropdown content - shown when expanded */}
      {isExpanded && (
        <div className="mt-2 pt-2 border-t border-gray-200 space-y-2">
          {schedules.slice(1).map((schedule, index) => (
            <div
              key={index + 1} // Start from index 1 since first is already shown
              className="flex items-center gap-2 text-sm pl-6"
            >
              <Clock size={12} className="text-gray-400 flex-shrink-0" />
              <span className="text-gray-700">{formatScheduleDisplay(schedule)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Modal component for adding/editing subjects
const SubjectModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Subject, "_id">) => void;
  initialData?: Subject | null;
}) => {
  const [formData, setFormData] = useState<Omit<Subject, "_id">>({
    subjectName: "",
    schedules: [],
    department: "",
    subjectCode: "",
    sectionId: "", // Add section field
  });

  const [newScheduleDate, setNewScheduleDate] = useState("");
  const [newScheduleTime, setNewScheduleTime] = useState("09:00");
  const [sections, setSections] = useState<
    Array<{
      id: string;
      sectionCode: string;
      sectionName: string;
      instructorName: string;
    }>
  >([]);
  const [loadingSections, setLoadingSections] = useState(false);

  // Initialize form when modal opens or initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        subjectName: initialData.subjectName,
        schedules: initialData.schedules,
        department: initialData.department,
        subjectCode: initialData.subjectCode,
        sectionId: initialData.sectionId || "",
      });
    } else {
      setFormData({
        subjectName: "",
        schedules: [],
        department: "",
        subjectCode: "",
        sectionId: "",
      });
    }
    // Reset schedule inputs
    setNewScheduleDate("");
    setNewScheduleTime("09:00");
  }, [initialData, isOpen]);

  // Fetch sections when modal opens
  useEffect(() => {
    const fetchSections = async () => {
      if (isOpen) {
        try {
          setLoadingSections(true);
          const sectionsData = await sectionService.getSections();
          // Transform the data to match our interface
          const transformedSections = sectionsData.map((section: any) => ({
            id: section._id || section.id,
            sectionCode: section.sectionCode,
            sectionName: section.sectionName,
            instructorName: section.instructorName,
          }));
          setSections(transformedSections);
        } catch (error) {
          console.error("Error fetching sections:", error);
        } finally {
          setLoadingSections(false);
        }
      }
    };

    fetchSections();
  }, [isOpen]);

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to add a new schedule to the array
  const handleAddSchedule = () => {
    if (!newScheduleDate) {
      alert("Please select a date");
      return;
    }

    const scheduleString = `${newScheduleDate} ${newScheduleTime}`;

    // Check for duplicate schedule
    if (formData.schedules.includes(scheduleString)) {
      alert("This schedule already exists");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      schedules: [...prev.schedules, scheduleString],
    }));

    // Reset date and time inputs
    setNewScheduleDate("");
    setNewScheduleTime("09:00");
  };

  // Function to remove a schedule from the array
  const handleRemoveSchedule = (index: number) => {
    const updatedSchedules = formData.schedules.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, schedules: updatedSchedules }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that at least one schedule is added
    if (formData.schedules.length === 0) {
      alert("Please add at least one schedule");
      return;
    }

    try {
      await onSubmit(formData);
      toast.success("Subject added successfully");
      onClose();
    } catch (error) {
      console.error("Error saving subject:", error);
      alert("Failed to save subject. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {initialData ? "Edit Subject" : "Add New Subject"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name *</label>
              <input
                type="text"
                name="subjectName"
                value={formData.subjectName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject Code *</label>
              <input
                type="text"
                name="subjectCode"
                value={formData.subjectCode}
                onChange={handleChange}
                placeholder="e.g., CS101"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Section Dropdown - Similar to teacher selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section (Optional)
              </label>
              {loadingSections ? (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  Loading sections...
                </div>
              ) : (
                <>
                  <select
                    name="sectionId"
                    value={formData.sectionId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a section</option>
                    {sections.map((section) => (
                      <option key={section.id} value={section.id}>
                        {section.sectionCode} - {section.sectionName}
                      </option>
                    ))}
                  </select>
                  {formData.sectionId && (
                    <div className="mt-1 text-xs text-gray-500">
                      Selected section:{" "}
                      {sections.find((s) => s.id === formData.sectionId)?.sectionName}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Schedule Section */}
          <div className="border-t pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Schedule *</label>
            <p className="text-sm text-gray-500 mb-3">Add multiple schedules for this subject</p>

            {/* Schedule Input */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  value={newScheduleDate}
                  onChange={(e) => setNewScheduleDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={new Date().toISOString().split("T")[0]} // Prevent past dates
                />
              </div>

              <div className="sm:w-48">
                <label className="block text-xs font-medium text-gray-600 mb-1">Time</label>
                <input
                  type="time"
                  value={newScheduleTime}
                  onChange={(e) => setNewScheduleTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleAddSchedule}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg h-fit"
                >
                  Add Schedule
                </button>
              </div>
            </div>

            {/* Schedule List */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Added Schedules ({formData.schedules.length})
              </p>

              {formData.schedules.length === 0 ? (
                <div className="text-center py-4 text-gray-500 text-sm border border-dashed border-gray-300 rounded-lg">
                  <Calendar className="mx-auto mb-2 text-gray-400" size={24} />
                  No schedules added yet
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {formData.schedules.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-500" />
                        <span className="text-sm font-medium text-gray-900">
                          {formatScheduleDisplay(schedule)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSchedule(index)}
                        className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              {initialData ? "Update" : "Add"} Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Subjects = () => {
  const dateLabel = getAdminPortalDate();
  // State for subjects data
  const [subjects, setSubjects] = useState<Subject[]>([]);
  // State for search term
  const [searchTerm, setSearchTerm] = useState("");
  // State for department filter
  const [departmentFilter, setDepartmentFilter] = useState("all");
  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for editing subject
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  // State for loading
  const [isLoading, setIsLoading] = useState(true);
  // State for error
  const [error, setError] = useState<string | null>(null);

  // Fetch subjects from API on component mount
  useEffect(() => {
    fetchSubjects();
  }, []);

  // Function to fetch subjects from API
  const fetchSubjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await subjectService.getSubjects();
      setSubjects(data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
      setError("Failed to load subjects. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique departments for filter dropdown
  const departments = ["all", ...new Set(subjects.map((subject) => subject.department))];

  // Filter subjects based on search term and department
  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch =
      subject.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.subjectCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || subject.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  // Function to handle adding a new subject
  const handleAddSubject = async (subjectData: Omit<Subject, "_id">) => {
    try {
      const newSubject = await subjectService.createSubject(subjectData);
      setSubjects([...subjects, newSubject]);
    } catch (error) {
      console.error("Error adding subject:", error);
      throw error;
    }
  };


  // Function to handle deleting a subject (TODO: Add API call)
  const handleDeleteSubject = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      try {
        await subjectService.deleteSubject(id);
        setSubjects(subjects.filter((subject) => subject._id !== id));
      } catch (error) {
        console.error("Failed to delete subject:", error);
        alert("Failed to delete subject. Please try again.");
      }
    }
  };

  // Function to open edit modal
  const openEditModal = (subject: Subject) => {
    setEditingSubject(subject);
    setIsModalOpen(true);
  };

  // Function to close modal and reset editing state
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSubject(null);
  };

  // Function to handle form submission (both add and edit)
  const handleSubmit = async (subjectData: Omit<Subject, "_id">) => {
    if (editingSubject) {
      try {
        const updatedSubject = await subjectService.updateSubject(editingSubject._id, subjectData);
        const updatedSubjects = subjects.map((s) =>
          s._id === editingSubject._id ? { ...s, ...updatedSubject } : s
        );
        setSubjects(updatedSubjects);
        setEditingSubject(null);
        closeModal();
      } catch (error) {
        console.error("Failed to update subject:", error);
        alert("Failed to update subject. Please try again.");
      }
    } else {
      await handleAddSubject(subjectData);
    }
  };

  return (
    <div className="space-y-6">
      <Banner
        title="Subject Management"
        subtitle="View and manage all available subjects across departments."
        right={<p className="text-white/80 text-xs md:text-sm whitespace-nowrap">{dateLabel}</p>}
      />

      {/* Controls Section */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">All Subjects</h2>
            <p className="text-sm text-gray-600 mt-1">
              Showing {filteredSubjects.length} of {subjects.length} subjects
            </p>
          </div>

          {/* Add Subject Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#647FBC] hover:bg-[#5a73b3] rounded-lg transition-colors"
          >
            <Plus size={16} />
            Add Subject
          </button>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col gap-4 mb-6 sm:flex-row">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by subject name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Department Filter */}
          <div className="sm:w-64">
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                disabled={isLoading}
              >
                <option value="all">All Departments</option>
                {departments
                  .filter((dept) => dept !== "all")
                  .map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-gray-600">Loading subjects...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12">
            <div className="text-red-600 mb-2">{error}</div>
            <button
              onClick={fetchSubjects}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Subjects Table */}
        {!isLoading && !error && (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <BookOpen size={14} />
                      Subject Name
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
                      <Building size={14} />
                      Department
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Hash size={14} />
                      Subject Code
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubjects.map((subject) => (
                  <tr key={subject._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{subject.subjectName}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <ScheduleDisplay schedules={subject.schedules} />
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {subject.department}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-mono text-sm font-semibold text-gray-900">
                        {subject.subjectCode}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {/* Edit Button */}
                        <button
                          onClick={() => openEditModal(subject)}
                          className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Edit subject"
                        >
                          <Pencil size={16} />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteSubject(subject._id)}
                          className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete subject"
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
            {filteredSubjects.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">No subjects found</div>
                <p className="text-sm text-gray-500">
                  {searchTerm || departmentFilter !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "Add your first subject using the 'Add Subject' button"}
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Add/Edit Subject Modal */}
      <SubjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={editingSubject}
      />
    </div>
  );
};

export default Subjects;
