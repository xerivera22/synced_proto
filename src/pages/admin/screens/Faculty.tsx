import Banner from "@/components/shared/Banner";
import { teacherProfileService } from "@/services/teacherProfileService";
import { Edit2, Eye, EyeOff, Plus, Search, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAdminPortalDate } from "../utils/date";

interface TeacherInfo {
  name: string;
  employeeId: string;
  email: string;
  phone: string;
  department: string;
  office: string;
  password?: string;
}

interface TeacherProfile {
  _id?: string;
  teacherInfo: TeacherInfo;
}

const emptyTeacher: TeacherInfo = {
  name: "",
  employeeId: "",
  email: "",
  phone: "",
  department: "",
  office: "",
  password: "",
};

const Faculty = () => {
  const dateLabel = getAdminPortalDate();
  const [teacherProfiles, setTeacherProfiles] = useState<TeacherProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<TeacherInfo>(emptyTeacher);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewingTeacher, setViewingTeacher] = useState<TeacherProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const data = await teacherProfileService.getTeacherProfiles();
      if (Array.isArray(data)) {
        setTeacherProfiles(data);
      } else {
        setTeacherProfiles([]);
        console.error("Expected array of teachers but got:", data);
      }
    } catch (error) {
      toast.error("Failed to fetch faculty members");
    }
  };

  const filteredTeachers = teacherProfiles.filter((profile) => {
    const searchLower = searchTerm.toLowerCase();
    const info = profile.teacherInfo || {};
    return (
      (info.name || "").toLowerCase().includes(searchLower) ||
      (info.employeeId || "").toLowerCase().includes(searchLower) ||
      (info.email || "").toLowerCase().includes(searchLower) ||
      (info.department || "").toLowerCase().includes(searchLower)
    );
  });

  const handleOpenCreate = () => {
    setCurrentTeacher(emptyTeacher);
    setEditingId(null);
    setShowPassword(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (profile: TeacherProfile) => {
    setCurrentTeacher({ ...profile.teacherInfo, password: "" });
    setEditingId(profile._id || null);
    setShowPassword(false);
    setIsModalOpen(true);
  };

  const handleOpenView = (profile: TeacherProfile) => {
    setViewingTeacher(profile);
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
        teacherInfo: {
          name: currentTeacher.name,
          employeeId: currentTeacher.employeeId,
          email: currentTeacher.email,
          phone: currentTeacher.phone,
          department: currentTeacher.department,
          office: currentTeacher.office,
          ...(currentTeacher.password && { password: currentTeacher.password }),
        },
      };

      if (editingId) {
        await teacherProfileService.updateTeacherProfile(editingId, payload);
        toast.success("Faculty member updated successfully");
      } else {
        if (!currentTeacher.password) {
          toast.error("Password is required for new faculty accounts");
          setIsLoading(false);
          return;
        }
        await teacherProfileService.createTeacherProfile(payload);
        toast.success("Faculty member created successfully");
      }

      setIsModalOpen(false);
      fetchTeachers();
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
      await teacherProfileService.deleteTeacherProfile(deletingId);
      toast.success("Faculty member deleted successfully");
      setIsDeleteModalOpen(false);
      fetchTeachers();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete faculty member";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Banner
        title="Faculty Directory"
        subtitle="Browse and manage faculty profiles."
        right={
          <p className="text-white/80 text-xs md:text-sm whitespace-nowrap">
            {dateLabel}
          </p>
        }
      />

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Faculty Members</h2>
            <p className="text-sm text-gray-500">Manage faculty accounts and information</p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-lg bg-[#647FBC] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#5a73b3] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Faculty
          </button>
        </div>

        {/* Search */}
        <div className="mt-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ID, email, or department..."
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
                <th className="px-4 py-3">Employee ID</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Office</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTeachers.map((profile) => (
                <tr key={profile._id} className="bg-white hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{profile.teacherInfo?.name}</td>
                  <td className="px-4 py-3">{profile.teacherInfo?.employeeId}</td>
                  <td className="px-4 py-3">{profile.teacherInfo?.email}</td>
                  <td className="px-4 py-3">{profile.teacherInfo?.phone}</td>
                  <td className="px-4 py-3">{profile.teacherInfo?.department}</td>
                  <td className="px-4 py-3">{profile.teacherInfo?.office}</td>
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
          {filteredTeachers.length === 0 && (
            <div className="py-8 text-center text-sm text-gray-500">
              {searchTerm ? "No faculty members match your search." : "No faculty records found."}
            </div>
          )}
        </div>
      </section>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingId ? "Edit Faculty Member" : "Add New Faculty Member"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded p-1 hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={currentTeacher.name}
                    onChange={(e) => setCurrentTeacher({ ...currentTeacher, name: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={currentTeacher.employeeId}
                    onChange={(e) => setCurrentTeacher({ ...currentTeacher, employeeId: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={currentTeacher.email}
                    onChange={(e) => setCurrentTeacher({ ...currentTeacher, email: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={currentTeacher.phone}
                    onChange={(e) => setCurrentTeacher({ ...currentTeacher, phone: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={currentTeacher.department}
                    onChange={(e) => setCurrentTeacher({ ...currentTeacher, department: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Office
                  </label>
                  <input
                    type="text"
                    value={currentTeacher.office}
                    onChange={(e) => setCurrentTeacher({ ...currentTeacher, office: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#647FBC] focus:outline-none focus:ring-1 focus:ring-[#647FBC]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {editingId ? "New Password (leave blank to keep current)" : "Password *"}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required={!editingId}
                    value={currentTeacher.password}
                    onChange={(e) => setCurrentTeacher({ ...currentTeacher, password: e.target.value })}
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

              <div className="flex justify-end gap-3 pt-4">
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
      {isViewModalOpen && viewingTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Faculty Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="rounded p-1 hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">{viewingTeacher.teacherInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Employee ID</p>
                  <p className="font-medium text-gray-900">{viewingTeacher.teacherInfo.employeeId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{viewingTeacher.teacherInfo.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{viewingTeacher.teacherInfo.phone || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium text-gray-900">{viewingTeacher.teacherInfo.department || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Office</p>
                  <p className="font-medium text-gray-900">{viewingTeacher.teacherInfo.office || "N/A"}</p>
                </div>
              </div>

              <div className="flex justify-end pt-4">
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Faculty Member</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this faculty member? This action cannot be undone.
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

export default Faculty;
