import Banner from "@/components/shared/Banner";
import { studentProfileService } from "@/services/studentProfileService";
import { Edit2, Eye, EyeOff, Plus, Search, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAdminPortalDate } from "../utils/date";

interface StudentInfo {
  name: string;
  studentId: string;
  email: string;
  phone: string;
  role: string;
  address: string;
  dateOfBirth: string;
  enrollmentDate: string;
  expectedGraduation: string;
  course: string;
  minor: string;
  advisor: string;
  gpa: string;
  creditHours: string;
  password?: string;
}

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

interface StudentProfile {
  _id?: string;
  studentInfo: StudentInfo;
  emergencyContact?: EmergencyContact;
}

const emptyStudent: StudentInfo = {
  name: "",
  studentId: "",
  email: "",
  phone: "",
  role: "Student",
  address: "",
  dateOfBirth: "",
  enrollmentDate: "",
  expectedGraduation: "",
  course: "",
  minor: "",
  advisor: "",
  gpa: "",
  creditHours: "",
  password: "",
};

const emptyEmergencyContact: EmergencyContact = {
  name: "",
  relationship: "",
  phone: "",
  email: "",
};

const Students = () => {
  const dateLabel = getAdminPortalDate();
  const [studentProfiles, setStudentProfiles] = useState<StudentProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<StudentInfo>(emptyStudent);
  const [currentEmergencyContact, setCurrentEmergencyContact] = useState<EmergencyContact>(emptyEmergencyContact);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewingStudent, setViewingStudent] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "academic" | "emergency">("basic");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await studentProfileService.getStudentProfiles();
      if (Array.isArray(data)) {
        setStudentProfiles(data);
      } else {
        setStudentProfiles([]);
        console.error("Expected array of students but got:", data);
      }
    } catch (error) {
      toast.error("Failed to fetch students");
    }
  };

  const filteredStudents = studentProfiles.filter((profile) => {
    const searchLower = searchTerm.toLowerCase();
    const info = profile.studentInfo || {};
    return (
      (info.name || "").toLowerCase().includes(searchLower) ||
      (info.studentId || "").toLowerCase().includes(searchLower) ||
      (info.email || "").toLowerCase().includes(searchLower) ||
      (info.course || "").toLowerCase().includes(searchLower)
    );
  });

  const handleOpenCreate = () => {
    setCurrentStudent(emptyStudent);
    setCurrentEmergencyContact(emptyEmergencyContact);
    setEditingId(null);
    setShowPassword(false);
    setActiveTab("basic");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (profile: StudentProfile) => {
    setCurrentStudent({ ...profile.studentInfo, password: "" });
    setCurrentEmergencyContact(profile.emergencyContact || emptyEmergencyContact);
    setEditingId(profile._id || null);
    setShowPassword(false);
    setActiveTab("basic");
    setIsModalOpen(true);
  };

  const handleOpenView = (profile: StudentProfile) => {
    setViewingStudent(profile);
    setIsViewModalOpen(true);
  };

  const handleOpenDelete = (id: string) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        studentInfo: {
          name: currentStudent.name,
          studentId: currentStudent.studentId,
          email: currentStudent.email,
          phone: currentStudent.phone,
          role: currentStudent.role || "student",
          address: currentStudent.address,
          dateOfBirth: currentStudent.dateOfBirth,
          enrollmentDate: currentStudent.enrollmentDate,
          expectedGraduation: currentStudent.expectedGraduation,
          course: currentStudent.course,
          gpa: currentStudent.gpa,
          creditHours: currentStudent.creditHours,
          ...(currentStudent.password && { password: currentStudent.password }),
        },
        emergencyContact: currentEmergencyContact,
      };

      if (editingId) {
        await studentProfileService.updateStudentProfile(editingId, payload);
        toast.success("Student updated successfully");
      } else {
        if (!currentStudent.password) {
          toast.error("Password is required for new student accounts");
          setIsLoading(false);
          return;
        }
        await studentProfileService.createStudentProfile(payload);
        toast.success("Student created successfully");
      }

      setIsModalOpen(false);
      fetchStudents();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Operation failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    setIsLoading(true);

    try {
      await studentProfileService.deleteStudentProfile(deletingId);
      toast.success("Student deleted successfully");
      setIsDeleteModalOpen(false);
      fetchStudents();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete student";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Banner
        title="Student Records"
        right={
          <p className="text-white/80 text-xs md:text-sm whitespace-nowrap">
            {dateLabel}
          </p>
        }
        subtitle="Monitor enrollment health and individual progress across the school."
      />

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Student Directory</h2>
            <p className="text-sm text-gray-500">Manage student accounts and records</p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-lg bg-[#647FBC] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#5a73b3] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Student
          </button>
        </div>

        {/* Search */}
        <div className="mt-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ID, email, or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
            />
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Student ID</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">course</th>
                <th className="px-4 py-3">GPA</th>
                <th className="px-4 py-3">Enrollment</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((profile) => (
                <tr key={profile._id} className="bg-white hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{profile.studentInfo?.name}</td>
                  <td className="px-4 py-3">{profile.studentInfo?.studentId}</td>
                  <td className="px-4 py-3">{profile.studentInfo?.email}</td>
                  <td className="px-4 py-3">{profile.studentInfo?.course}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{profile.studentInfo?.gpa}</td>
                  <td className="px-4 py-3">{profile.studentInfo?.enrollmentDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenView(profile)}
                        className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(profile)}
                        className="rounded p-1 text-blue-500 hover:bg-blue-50 hover:text-blue-700"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(profile._id!)}
                        className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredStudents.length === 0 && (
            <div className="py-8 text-center text-sm text-gray-500">
              {searchTerm ? "No students match your search." : "No student records found."}
            </div>
          )}
        </div>
      </section>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto py-8">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingId ? "Edit Student" : "Add New Student"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded p-1 hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-200 mb-4">
              <button
                onClick={() => setActiveTab("basic")}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "basic"
                  ? "border-[#647FBC] text-[#647FBC]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
              >
                Basic Info
              </button>
              <button
                onClick={() => setActiveTab("academic")}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "academic"
                  ? "border-[#647FBC] text-[#647FBC]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
              >
                Academic Info
              </button>
              <button
                onClick={() => setActiveTab("emergency")}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "emergency"
                  ? "border-[#647FBC] text-[#647FBC]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
              >
                Emergency Contact
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Basic Info Tab */}
              {activeTab === "basic" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={currentStudent.name}
                      onChange={(e) => setCurrentStudent({ ...currentStudent, name: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student ID *</label>
                    <input
                      type="text"
                      required
                      value={currentStudent.studentId}
                      onChange={(e) => setCurrentStudent({ ...currentStudent, studentId: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={currentStudent.email}
                      onChange={(e) => setCurrentStudent({ ...currentStudent, email: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={currentStudent.phone}
                      onChange={(e) => setCurrentStudent({ ...currentStudent, phone: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={currentStudent.dateOfBirth}
                      onChange={(e) => setCurrentStudent({ ...currentStudent, dateOfBirth: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={currentStudent.address}
                      onChange={(e) => setCurrentStudent({ ...currentStudent, address: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {editingId ? "New Password (leave blank to keep current)" : "Password *"}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required={!editingId}
                        value={currentStudent.password}
                        onChange={(e) => setCurrentStudent({ ...currentStudent, password: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                        placeholder={editingId ? "Leave blank to keep current password" : "Enter password"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Academic Info Tab */}
              {activeTab === "academic" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">course</label>
                    <input
                      type="text"
                      value={currentStudent.course}
                      onChange={(e) => setCurrentStudent({ ...currentStudent, course: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minor</label>
                    <input
                      type="text"
                      value={currentStudent.minor}
                      onChange={(e) => setCurrentStudent({ ...currentStudent, minor: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Date</label>
                    <input
                      type="date"
                      value={currentStudent.enrollmentDate}
                      onChange={(e) => setCurrentStudent({ ...currentStudent, enrollmentDate: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Graduation</label>
                    <input
                      type="date"
                      value={currentStudent.expectedGraduation}
                      onChange={(e) => setCurrentStudent({ ...currentStudent, expectedGraduation: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Advisor</label>
                    <input
                      type="text"
                      value={currentStudent.advisor}
                      onChange={(e) => setCurrentStudent({ ...currentStudent, advisor: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
                    <input
                      type="text"
                      value={currentStudent.gpa}
                      onChange={(e) => setCurrentStudent({ ...currentStudent, gpa: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Credit Hours</label>
                    <input
                      type="text"
                      value={currentStudent.creditHours}
                      onChange={(e) => setCurrentStudent({ ...currentStudent, creditHours: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                    />
                  </div>
                </div>
              )}

              {/* Emergency Contact Tab */}
              {activeTab === "emergency" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                    <input
                      type="text"
                      value={currentEmergencyContact.name}
                      onChange={(e) => setCurrentEmergencyContact({ ...currentEmergencyContact, name: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                    <input
                      type="text"
                      value={currentEmergencyContact.relationship}
                      onChange={(e) => setCurrentEmergencyContact({ ...currentEmergencyContact, relationship: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={currentEmergencyContact.phone}
                      onChange={(e) => setCurrentEmergencyContact({ ...currentEmergencyContact, phone: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={currentEmergencyContact.email}
                      onChange={(e) => setCurrentEmergencyContact({ ...currentEmergencyContact, email: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-lg bg-[#647FBC] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a73b3] disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto py-8">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Student Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="rounded p-1 hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Basic Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-gray-900">{viewingStudent.studentInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Student ID</p>
                    <p className="font-medium text-gray-900">{viewingStudent.studentInfo.studentId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{viewingStudent.studentInfo.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{viewingStudent.studentInfo.phone || "N/A"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-900">{viewingStudent.studentInfo.address || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Academic Info */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Academic Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">course</p>
                    <p className="font-medium text-gray-900">{viewingStudent.studentInfo.course || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Minor</p>
                    <p className="font-medium text-gray-900">{viewingStudent.studentInfo.minor || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">GPA</p>
                    <p className="font-medium text-gray-900">{viewingStudent.studentInfo.gpa || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Credit Hours</p>
                    <p className="font-medium text-gray-900">{viewingStudent.studentInfo.creditHours || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Advisor</p>
                    <p className="font-medium text-gray-900">{viewingStudent.studentInfo.advisor || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Enrollment Date</p>
                    <p className="font-medium text-gray-900">{viewingStudent.studentInfo.enrollmentDate || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              {viewingStudent.emergencyContact && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Emergency Contact</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium text-gray-900">{viewingStudent.emergencyContact.name || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Relationship</p>
                      <p className="font-medium text-gray-900">{viewingStudent.emergencyContact.relationship || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{viewingStudent.emergencyContact.phone || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{viewingStudent.emergencyContact.email || "N/A"}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Student</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this student? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
